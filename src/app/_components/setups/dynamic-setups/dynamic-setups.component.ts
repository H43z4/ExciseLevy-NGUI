import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlContainer} from '@angular/forms';
import { Router, ActivatedRoute,NavigationEnd   } from '@angular/router';
import { first } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import {DynamicSetupsService} from '../../../_services'
import { setup,generalResponse,frmClass} from '../../../_models';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



class DataTablesResponse {
  data?: any[];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}



@Component({
  selector: 'app-dynamic-setups',
  templateUrl: './dynamic-setups.component.html',
  styleUrls: ['./dynamic-setups.component.css']
})
export class DynamicSetupsComponent implements OnInit {
  frmClass?:frmClass;
  errorMsg?:string="";
successMsg?:string="";
  setupObj?: setup;
  responseobj?:generalResponse;
 
  setups?: setup[];
  setupsNew?: setup[];

  page = 1;
  pageSize = 4;
  collectionSize? :number=0;

currentForm?:string;
  constructor(
    private route: ActivatedRoute,
    private DynamicSetupsService: DynamicSetupsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastrService: ToastrService
  ) { 
    
    
  }

  ngOnInit(): void {
    this.currentForm=this.router.url.split("/").pop();
    //console.log(this.router.url.split("/").pop());
    
  
   this.frmClass= this.DynamicSetupsService.GetFormData(this.currentForm);
    
    this.loadDataTable();
  }
  
  loadDataTable(){
    
console.log("This is page num "+this.page );
console.log("This is page size "+this.pageSize );
if(this.page==undefined){
  this.page=1;
}
if(this.pageSize==undefined){
  this.pageSize=10;
}
    this.spinner.show();
    this.DynamicSetupsService.getAllSetups(this.frmClass?.APIgetall,this.page,this.pageSize).pipe(first()).subscribe(
      
      result => {
        // Handle result
        if(result.status=='0'){
      
         this.setups = result.data;
      //   this.collectionSize= this.setups?.length;
      this.collectionSize=100;
        }else{
         // console.log(result)
        this.spinner.hide();
        this.toastrService.error(result.message, 'Error!');
        //this.form.reset();
        }
        
      },
      error => {
       
        this.spinner.hide();
        this.toastrService.error(error, 'Error!');
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.spinner.hide();
      //  this.toastrService.error(error, 'Error!');
      }

      
      // Result => {
      // if(Result){
      //   this.setups = Result.data;
      //   this.collectionSize= this.setups?.length;
      //  // console.log(" this is test of data");
      // //  console.log(this.setups);
      //   this.spinner.hide();
      // }
      // console.log(" this is test without data");
      // this.spinner.hide();      
      //     }
          
          );
      
   
    this.spinner.hide();
  }
  form = new FormGroup({
    id: new FormControl('0'),
    name: new FormControl(null, [Validators.required]), 
    abbreviation: new FormControl(null, [Validators.required]), 
    description: new FormControl(null, [Validators.required]), 
  });

  get f(){
    return this.form.controls;
  }

  keyPressAlfhabetsOnly(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {    
        // invalid character, prevent input
        event.preventDefault();
    }
  }
  onEdit(ID?:string): void {  
    console.log(ID); 
    this.spinner.show();
      this.DynamicSetupsService.GetSetupById(this.frmClass?.APIgetbyID,ID).pipe(first()).subscribe(
       
        res => {
          if(res.data){
            //console.log("Real data");
         // console.log(res);
          this.setupObj=res.data;
          this.form.patchValue({id:this.setupObj?.id});
          this.form.patchValue({name:this.setupObj?.name});
          this.form.patchValue({abbreviation:this.setupObj?.abbreviation});
          this.form.patchValue({description:this.setupObj?.description});
          } 
    });
    this.spinner.hide();
 } 



  submit(){
    this.spinner.show();
    if (!this.form.valid) {
      this.spinner.hide();
      this.form.markAllAsTouched();
      return;
      
    }

    if(this.form.controls['id'].value==null)
    {
      this.form.patchValue({id:'0'});
    }
    
    this.errorMsg="";
    this.successMsg="";
   //this.setupObj=this.form.value;
  //  if(this.setupObj){
  //   this.setupObj.createdBy="1";
  //  }
  console.log(this.form.value);
  if(this.form.controls['id'].value=='0')
  {
    //Insert code here
       this.DynamicSetupsService.saveSetup(this.frmClass?.APIPost,this.form.value)
          .subscribe(res => {
            if(res.status=="0"){

              this.spinner.hide();
              this.toastrService.success('Data save successfully!', 'Success!');
              this.errorMsg="";
              this.successMsg=res.message;
              this.form.reset();
              this.loadDataTable();
            }else{
              this.spinner.hide();
              this.toastrService.error(res.details, res.message);
              this.errorMsg=res.message;
              this.successMsg="";
            }
                

          });
        }else{
        // Update code here.
        this.DynamicSetupsService.UpdateSetup(this.frmClass?.APIput,this.form.value)
        .subscribe(res => {
          if(res.status=="0"){

            this.spinner.hide();
            this.toastrService.success('Data update successfully!', 'Success!');
            this.errorMsg="";
            this.successMsg=res.message;
            this.form.reset();
            this.loadDataTable();
          }else{
            this.spinner.hide();
            this.toastrService.error(res.details, res.message);
            this.errorMsg=res.message;
            this.successMsg="";
          }
              

        });




        }
          
  }


  resetForm(){
    this.form.reset();
    
    // this.form.markAsPristine();
    //           this.form.markAsUntouched();
    //           this.form.updateValueAndValidity();
  }


}
