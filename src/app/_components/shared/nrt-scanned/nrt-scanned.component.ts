import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlContainer, MinLengthValidator} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedService} from '../../../_services/shared/shared.service'
import { generalResponse,VehicleOwnerInfo } from 'src/app/_models';

@Component({
  selector: 'app-nrt-scanned',
  templateUrl: './nrt-scanned.component.html',
  styleUrls: ['./nrt-scanned.component.css']
})

export class NrtScannedComponent {

  constructor(
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    config: NgbModalConfig, private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = true;
     }

     applicationId:number=0;
     selectedFiles?: FileList;
     PersonData: any;

     btnFetchVisibile=true;
     btnDeleteVisibile=false;
  
     temp: FileList[] = [];
     vehicleOwnerInfo :VehicleOwnerInfo[]=[];
     GeneralObj?:generalResponse;
     vehicleOwnerInfotmp:VehicleOwnerInfo= new VehicleOwnerInfo();

     form = new FormGroup({
      RegNo: new FormControl('', [Validators.required])
     });

     get f(){
      return this.form.controls;
    }

rest(){
  this.form.reset();
  this.temp = [];
  this.vehicleOwnerInfo =[];
  this.applicationId=0;
  this.GeneralObj = undefined;
  this.vehicleOwnerInfotmp= new VehicleOwnerInfo();
  this.btnFetchVisibile=true;
  this.btnDeleteVisibile=false;
}
  
     open(content:any) {
      //console.log();
      this.modalService.open(content);  
    }

     onRegisterSubmit():void{
      if(this.form.value.RegNo){
        this.spinner.show();
        this.sharedService.getVehicleOwnerInfo(this.form.value.RegNo).subscribe(
          respo =>{
            this.GeneralObj=respo;  
            this.applicationId= respo.data?.applicationId ; 
              if(respo.status=='0'){
                this.spinner.hide();
                //this.toastrService.success(respo.message, 'Success!');  
                this.btnFetchVisibile=false;
                this.btnDeleteVisibile=true;
              }else
              {
                this.toastrService.error(respo.message, 'Error!');    
                this.spinner.hide();  
              } 
              this.spinner.hide();
          },
          error => {
            //console.log(error);
            this.spinner.hide();
            this.toastrService.error(error, 'Error!');
          },
          () => {
            this.spinner.hide();
          }
          );
      }
     }

     selectFiles(event: any,DocumentTypeId:any,totalPages:any): void {
      this.selectedFiles = event.target.files;

      //console.log(this.vehicleOwnerInfotmp);

      this.vehicleOwnerInfotmp = new VehicleOwnerInfo();

      //console.log(this.vehicleOwnerInfotmp);

      this.vehicleOwnerInfotmp.applicationId=this.GeneralObj?.data?.applicationId;
      this.vehicleOwnerInfotmp.DocumentTypeId=DocumentTypeId;
      this.vehicleOwnerInfotmp.totalPages=totalPages;
      this.vehicleOwnerInfotmp.file=event.target.files;
      this.vehicleOwnerInfo.push(this.vehicleOwnerInfotmp);

      //console.log(this.vehicleOwnerInfo);

      this.temp.push(event.target.files);

      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
           // console.log(e.target.result);
           // this.previews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
    }

    upload(vehicleOwnerInfo: VehicleOwnerInfo, file:File): void {
     // this.progressInfos[idx] = { value: 0, fileName: file.name };
      if (file) {
  
        this.sharedService.upload(vehicleOwnerInfo,file).subscribe(
          response => {
/*
            if(response.status=='0'){
              //this.spinner.hide();
              this.toastrService.success(response.message, 'Success!');  
            }else
            {
              //this.spinner.hide();
              this.toastrService.error(response.message, 'Error!');        
            } 
            */
            //this.data=response;
            //console.log(response);
            //this.toastrService.error(response.message, 'Success!');  
            //this.data=response;
          });

      }
    }

    PhaseChange(): void {
      console.log(this.applicationId);
      if(this.applicationId>0){
        this.spinner.show();
        this.sharedService.DocumentScaningPhaseChange(this.applicationId).subscribe(
                  result => {
                    if(result?.status=='0'){
                      this.spinner.hide();
                      this.toastrService.success('Application status changed successfully!', 'Success!'); 
                      this.rest();            
                    }else{
                    this.spinner.hide();
                    this.toastrService.error(result.message, 'Error!');
                    } },
                  error => {
                    this.spinner.hide();
                    this.toastrService.error(error, 'Error!');
                  },() => {
                    this.spinner.hide();
                  });
      }
    }

    uploadFiles(): void {
      //this.message = [];
      if (this.selectedFiles) {
        let uploadedCount:number=0;
        for (let i = 0; i < this.vehicleOwnerInfo.length; i++) {
         //fileee:any= this.vehicleOwnerInfo[1].file;
      //   this.selectedFiles[i] = this.vehicleOwnerInfo[1].file;
          this.upload(this.vehicleOwnerInfo[i], this.vehicleOwnerInfo[i].file[0]);
          if(i+1==this.vehicleOwnerInfo.length)
          {
            uploadedCount=uploadedCount+1;
          }
        }

        if(uploadedCount>0){
          this.toastrService.success('Documents uploaded successfully', 'Success!');
          this.onRegisterSubmit();
          
          // this.sharedService.getVehicleOwnerInfo(Number(this.RegNo)).subscribe(
          //   respo =>{
          //     this.GeneralObj=respo;
          //     //this.PersonData=this.GeneralObj?.data?.persons;
          //     console.log(respo);
          //   });
        }
        
      }
      
      this.vehicleOwnerInfo = [];
    }

}