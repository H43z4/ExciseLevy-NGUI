import { Component, OnInit } from '@angular/core';
import { FormGroup,FormsModule ,FormBuilder, FormControl, Validators, ControlContainer, MinLengthValidator} from '@angular/forms';
import { generalResponse,CheckedIdList,DeliveryInfo } from '../../../_models';
import { DataService,SharedService,DropDownService} from '../../../_services';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { first } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-nrt-delivery',
  templateUrl: './nrt-delivery.component.html',
  styleUrls: ['./nrt-delivery.component.css']
})

export class NrtDeliveryComponent {
public data : any;
  constructor(
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private SharedService: SharedService) {
    //this.getallDropdowns();
     
     //this.setowner();
     }
    GeneralObj?:generalResponse;
    deliveryFile: any[] = [];
    deliveryFileChecked: any[] = [];
    selectedItemsList :CheckedIdList[]=[];
    checkedIDs:any= [];
    checkboxesDataList:CheckedIdList[]=[];
    checkboxesData:CheckedIdList= new CheckedIdList();
    isShown: boolean = false ; 
    checker:number=0;
    deliveryInfotmp:DeliveryInfo = new DeliveryInfo();
    form = new FormGroup({
    
       // Person Components
       cnic: new FormControl('', [Validators.required]),
       name: new FormControl('', [Validators.required]),
       fatherName: new FormControl('', [Validators.required]),
       mobile: new FormControl('', [Validators.required]),
       address: new FormControl('', [Validators.required]),
       remarks: new FormControl('', [Validators.required]),
       MethodId: new FormControl('', [Validators.required])

     });
     get f(){
      return this.form.controls;
    }

    public displayVal='';
    public regNo='';
    public vMake='';
    public vMaker='';
    public vPersonName='';
    public vCnic = '';  
    public vFatherName='';
    public vArticleDeliveryName='';
    public vArticleDeliveryCnic='';
    public vArticleDeliveryAddr='';
    public vArticleDeliveryContact=''

  getValue(val:any){
    this.displayVal = val;
    //console.log("first", this.displayVal)
    this.spinner.show()
        this.SharedService.FetchPersonWithCnicDelivery(this.displayVal).pipe(first()).subscribe(
          res => {
            if(res.status=='0')
            {
              this.deliveryInfotmp = new DeliveryInfo()
              this.checkboxesDataList = [];
              this.GeneralObj=res;
              this.deliveryFile=this.GeneralObj.data.vehicleArticle;
              this.deliveryFileChecked= this.GeneralObj.data.vehicleArticleDelivery;
              this.deliveryFile .forEach(element => {
                this.checkboxesData=new CheckedIdList();
                this.checkboxesData!.label = element.name;
                this.checkboxesData!.id = element.id;
                for (let elementInside of this.deliveryFileChecked) {
                  if(element.id==elementInside.vehicleArticleId)
                  {
                    this.checkboxesData!.isChecked = true;
                    this.checkboxesData!.isShow = true;
                    break;
                  }
                  else{
                    this.checkboxesData!.isChecked = false;
                    this.checkboxesData!.isShow = false;
                  }
                }
                /*
                this.deliveryFileChecked.forEach(elementInside =>{
                 
                });
                */
                this.checkboxesDataList.push(this.checkboxesData);
                this.checker++;
              });
              // console.log("This is fetch response");
              // console.log(res); 
              this.regNo = res.data.vehicle.registrationNo;
              this.vMake = res.data.vehicle.vehicleMake;
              this.vMaker = res.data.vehicle.vehicleMaker;
              //console.log(res.data?.vehicleArticleDelivery);
              if(res.data?.vehicleArticleDelivery.length>0){
                this.vArticleDeliveryName = res.data.vehicleArticleDelivery[0].name;
                this.vArticleDeliveryCnic = res.data.vehicleArticleDelivery[0].cnic;
                this.vArticleDeliveryAddr = res.data.vehicleArticleDelivery[0].address;
                this.vArticleDeliveryContact = res.data.vehicleArticleDelivery[0].mobile;
              }
            
              this.fetchSelectedItems()
              this.fetchCheckedIDs()
              this.toastrService.success(res.message,'Success!');
            }
            else{
              this.toastrService.error(res.message, 'Error!');     
              this.GeneralObj=new generalResponse();
              this.deliveryFile = [];
              this.deliveryFileChecked=[];
              this.selectedItemsList =[];
              this.checkedIDs= [];
              this.checkboxesDataList=[];
              this.checkboxesData= new CheckedIdList();
              this.isShown = false ; 
              this.checker=0;
              this.deliveryInfotmp= new DeliveryInfo();

              this.regNo ='';
              this.vMake = '';
              this.vMaker = '';
              
              this.vArticleDeliveryName = '';
              this.vArticleDeliveryCnic = '';
              this.vArticleDeliveryAddr = '';
              this.vArticleDeliveryContact ='';
              //window.location.reload();   
            }
        });
      this.spinner.hide();
  }
  changeSelection() {
    this.fetchSelectedItems()
    for (let element of this.selectedItemsList) {
      if(element.isChecked && !element.isShow)
      {
        this.isShown = true;
        break;
      }
      else
      {
        this.isShown = false;
      }
    }
    
    // console.log(this.checkedIDs);
    // console.log(this.selectedItemsList);

  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });

    //console.log(this.selectedItemsList);
  }
  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
    //console.log(this.checkedIDs);

  }



  keyPressAlfhabetsOnly(event: KeyboardEvent) {
    //console.log(this.deliveryInfotmp.name);
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {    
        // invalid character, prevent input
        event.preventDefault();
    }}

  keyPressNumberOnly(event: KeyboardEvent) {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {    
          // invalid character, prevent input
          event.preventDefault();
      }
    }
  /*
  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }
  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.id);
      }
    });
  }

  */

  SaveDeliveryInfo():void{

    this.spinner.show();
    if (!this.form.valid) {
      this.spinner.hide();
      this.form.markAllAsTouched();
      const controls = this.form.controls;
      for (const name in controls) {
          if (controls[name].invalid) {
              console.log(name);
          }
      }
      return;
    }

    for (let element of this.selectedItemsList) {
      if(element.isChecked && !element.isShow){
         //let phoneObj=new phoneNumbersClass();
        this.deliveryInfotmp.fatherName=this.form.getRawValue().fatherName;
        this.deliveryInfotmp.name=this.form.getRawValue().name;
        this.deliveryInfotmp.cnic=this.form.getRawValue().cnic;
        this.deliveryInfotmp.mobile=this.form.getRawValue().mobile;
        this.deliveryInfotmp.address=this.form.getRawValue().address;
        this.deliveryInfotmp.remarks=this.form.getRawValue().remarks;
        this.deliveryInfotmp.VehicleArticleDeliveryMethodId=this.form.getRawValue().MethodId;
        this.deliveryInfotmp.applicationId = this.displayVal;
        this.deliveryInfotmp.vehicleArticleId = element.id;

        console.log(this.deliveryInfotmp);
        this.SharedService.saveDeliveryInfo(this.deliveryInfotmp).subscribe(
          respo => {
            this.spinner.hide();
            console.log(respo);
            if(respo.status='0')
            {
              this.toastrService.success('Document saved successfully','Success!')
            }else{
              this.toastrService.error('Document not saved successfully','Error!')
            }
          }
        );

      }
    }
   
/*
    this.SharedService.saveDeliveryInfo(this.deliveryInfotmp).subscribe(
      respo => {

      }
    );
   */
  this.getValue(this.displayVal);
  this.isShown=false;
      //window.location.reload();
  }
  addValidatorsPerson(){
    this.form.controls['cnic'].addValidators([Validators.required,Validators.minLength(13)]);  
    this.form.controls['name'].addValidators(Validators.required);  
    this.form.controls['fatherName'].addValidators(Validators.required);  
    this.form.controls['mobile'].addValidators([Validators.required,Validators.minLength(11),Validators.maxLength(11)]);  
    this.form.controls['address'].addValidators([Validators.required]);  
    this.form.controls['remarks'].addValidators([Validators.required]);  
  }
  selectedCheck(item:any,event:Event):void
  {
    //selectedItemsList
  }
  ngOnInit(): void {
    this.fetchSelectedItems()
    this.fetchCheckedIDs()
  }
  keyPressCNIC(event: KeyboardEvent) {
    const pattern = /[0-9-]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {    
        // invalid character, prevent input
        event.preventDefault();
    }
    }

   
}
