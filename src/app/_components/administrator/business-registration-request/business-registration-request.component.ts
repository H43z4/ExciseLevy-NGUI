import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { generalResponse,dropDownList,
CommonAddress } from '../../../_models';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { bussiness, Person, phoneNumbersClass } from 'src/app/_models/userManagement/UserPersmissions.model';


@Component({
  selector: 'app-business-registration-request',
  templateUrl: './business-registration-request.component.html',
  styleUrls: ['./business-registration-request.component.css']
})
export class BusinessRegistrationRequestComponent implements OnInit {

  ddcountries:dropDownList[]=[];
  dddistricts:dropDownList[]= [];
  ddbusinessSector:dropDownList[]=[];
  ddbusinessStatus:dropDownList[]=[];
  ddbusinessType:dropDownList[]=[];

  GeneralObj?:generalResponse;
  ObjBussiness?:bussiness;
  ObjPerson?:Person;
 
  // getDropDownData?:ownerDropDownLists;

  btnFetchVisibile=true;
  btnDeleteVisibile=false;
 
  constructor(
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    ) { }

  ngOnInit(): void {
    // this.getallDropdowns();
  }

  
  form = new FormGroup({

     // Person Components
     cnic: new FormControl('',[Validators.required,Validators.minLength(13)]),
     personName: new FormControl('',[Validators.required]),
     fatherHusbandName: new FormControl(''),
     email: new FormControl(''),
     // oldCNIC: new FormControl(''),
     ntn: new FormControl(''),
     presentAddress: new FormControl(''),
     presentCity: new FormControl(''),
     presentDistrictId: new FormControl(''),
     permanentAddress: new FormControl(''),
     permanentCity: new FormControl(''),
     permanentDistrictId: new FormControl(''),
     phoneNumber: new FormControl(''),
     phone2: new FormControl(''),
     postalCode: new FormControl(''),
 
 
     // Business Components
 
     businessTypeId: new FormControl('',[Validators.required]),
     businessSectorId: new FormControl('',[Validators.required]),
     businessStatusId: new FormControl('',[Validators.required]),
     businessRegNo: new FormControl('',[Validators.required]),
     businessName: new FormControl('',[Validators.required]),
     businessEmail: new FormControl(''),
     businessNTN: new FormControl('',[Validators.required]),
     businessFTN: new FormControl(''),
     businessSTN: new FormControl(''),
     businessPresentAddress: new FormControl(''),
     businessPresentCity: new FormControl(''),
     businessPresentDistrictId: new FormControl(''),
     businessPermanentAddress: new FormControl(''),
     businessPermanentCity: new FormControl(''),
     businessPermanentDistrictId: new FormControl(''),
     businessPhoneNumber: new FormControl(''),
     businessPhone2: new FormControl(''),
     businessPostalCode: new FormControl('')
    });
    get f(){
      return this.form.controls;
    }
resetForm(){
  this.form.reset();
}


Save(){

         this.spinner.show();

           if (!this.form.valid) {
            this.spinner.hide();
            this.form.markAllAsTouched();
            return;
          } 
          
          let personObj=new Person();
          personObj.personId=0;
          personObj.personName=this.form.value.personName;
          personObj.fatherHusbandName=this.form.value.fatherHusbandName;
          personObj.cnic=this.form.value.cnic;
          personObj.email=this.form.value.email;
          personObj.ntn=this.form.value.ntn;
          let phoneObj=new phoneNumbersClass();
          if(this.form.value.phoneNumber){
            phoneObj=new phoneNumbersClass();
            phoneObj.phoneNumberTypeId=1;
            phoneObj.phoneNumberValue=this.form.value.phoneNumber;
            personObj.phoneNumbers.push(phoneObj);
          }
         
          if(this.form.value.phone2){
            phoneObj=new phoneNumbersClass();
            phoneObj.phoneNumberTypeId=2;
            phoneObj.phoneNumberValue=this.form.value.phone2;
            personObj.phoneNumbers.push(phoneObj);
          }
          let addressObj=new CommonAddress();
          if(this.form.value.permanentCity && this.form.value.permanentDistrictId && this.form.value.permanentAddress){
            addressObj=new CommonAddress();
            addressObj.addressTypeId=1;
            addressObj.city=this.form.value.permanentCity;
            addressObj.districtId=this.form.value.permanentDistrictId;
            addressObj.addressDescription=this.form.value.permanentAddress;
            //addressObj.postalCode=this.form.value.postalCode;
            personObj.addresses.push(addressObj);
          }

         
          if(this.form.value.presentCity && this.form.value.presentDistrictId && this.form.value.presentAddress){
            addressObj=new CommonAddress();
          addressObj.addressTypeId=2;
          addressObj.city=this.form.value.presentCity;
          addressObj.districtId=this.form.value.presentDistrictId;
          addressObj.addressDescription=this.form.value.presentAddress;
         // addressObj.postalCode="";
          personObj.addresses.push(addressObj);
          }
          
         
          let objBusiness =new bussiness();
          objBusiness.businessId=0;

          objBusiness.businessTypeId=this.form.value.businessTypeId;
          objBusiness.businessSectorId=this.form.value.businessSectorId;
          objBusiness.businessStatusId=this.form.value.businessStatusId;

          objBusiness.businessRegNo=this.form.value.businessRegNo;
          objBusiness.businessName=this.form.value.businessName;
          objBusiness.email=this.form.value.businessEmail;
          objBusiness.ntn=this.form.value.businessNTN;
          objBusiness.ftn=this.form.value.businessFTN;
          objBusiness.stn=this.form.value.businessSTN;

          if(this.form.value.businessPhoneNumber){
            phoneObj=new phoneNumbersClass();
            phoneObj.phoneNumberTypeId=1;
            phoneObj.phoneNumberValue=this.form.value.businessPhoneNumber;
            objBusiness.phoneNumbers.push(phoneObj);
          }
          
          if(this.form.value.businessPhone2){
            phoneObj=new phoneNumbersClass();
            phoneObj.phoneNumberTypeId=2;
            phoneObj.phoneNumberValue=this.form.value.businessPhone2;
            objBusiness.phoneNumbers.push(phoneObj);
          }
          
          
         if(this.form.value.businessPermanentCity && this.form.value.businessPermanentDistrictId && this.form.value.businessPermanentAddress){
          addressObj=new CommonAddress();
          addressObj.addressTypeId=1;
          addressObj.city=this.form.value.businessPermanentCity;
          addressObj.districtId=this.form.value.businessPermanentDistrictId;
          addressObj.addressDescription=this.form.value.businessPermanentAddress;
          //addressObj.postalCode=this.form.value.businesspostalCode;
          objBusiness.addresses.push(addressObj);
         }

         if(this.form.value.businessPresentCity && this.form.value.businessPresentDistrictId && this.form.value.businessPresentAddress){
          addressObj=new CommonAddress();
          addressObj.addressTypeId=2;
          addressObj.city=this.form.value.businessPresentCity;
          addressObj.districtId=this.form.value.businessPresentDistrictId;
          addressObj.addressDescription=this.form.value.businessPresentAddress;
          //addressObj.postalCode="";
          objBusiness.addresses.push(addressObj);
         }
          

          // let bussinessReq=new businessRequests();

          // bussinessReq.business=objBusiness;
          // bussinessReq.person=personObj;
          // bussinessReq.IsOwner=true;
          // bussinessReq.Title="";
          // bussinessReq.Designation="";
          
          // console.log(bussinessReq);
          // this.businessRequestService.saveBusinessRequest(bussinessReq).subscribe(
          //   result => {
          //     if(result?.status=='0'){
          //         this.form.reset();
          //         this.toastrService.success(result.message, 'Success!');
          //         this.ObjPerson=undefined;
          //         this.ObjBussiness=undefined;
          //        this.spinner.hide();   
          //     }else{
          //     this.spinner.hide();
          //     this.toastrService.error(result.message, 'Error!');
          //     } },
          //   error => {
          //     this.spinner.hide();
          //     this.toastrService.error(error, 'Error!');
          //   },() => {
          //     this.spinner.hide();
          //   });
}


setBusiness(business:bussiness){
  this.form.patchValue({businessTypeId:business.businessTypeId});
  //console.log("Business Type Id ="+this.ObjBussiness?.businessTypeId);
  this.form.patchValue({businessSectorId:business.businessSectorId});
  this.form.patchValue({businessStatusId:business.businessStatusId});
  this.form.patchValue({businessRegNo:business.businessRegNo});
  this.form.patchValue({businessName:business.businessName});
  this.form.patchValue({businessEmail:business.email});
  this.form.patchValue({businessNTN:business.ntn});
  this.form.patchValue({businessFTN:business.ftn});
  this.form.patchValue({businessSTN:business.stn});

  if(business.addresses){
    if(business.addresses.length>0){
    this.form.patchValue({businessPermanentAddress:business.addresses[0]?.addressDescription});
    this.form.patchValue({businessPermanentCity:business.addresses[0]?.city});
    this.form.patchValue({businessPermanentDistrictId:business.addresses[0]?.districtId});
  
    if(business.addresses.length>1){
      this.form.patchValue({businessPresentAddress:business.addresses[1]?.addressDescription});
      this.form.patchValue({businessPresentCity:business.addresses[1]?.city});
      this.form.patchValue({businessPresentDistrictId:business.addresses[1]?.districtId});
      //this.form.patchValue({businessPostalCode:business.addresses[1]?.postalCode});
    }}
  }
  if(business.phoneNumbers){
    if(business.phoneNumbers.length>0){
      this.form.patchValue({businessPhoneNumber:business.phoneNumbers[0].phoneNumberValue});
      if(business.phoneNumbers.length>1){
        this.form.patchValue({businessPhone2:business.phoneNumbers[1].phoneNumberValue});
      }
    }
    
  }
  
  }

setCUstomer(person:Person){
  this.form.patchValue({cnic:person.cnic});
  this.form.patchValue({personName:person.personName});
  this.form.patchValue({fatherHusbandName:person.fatherHusbandName});
  this.form.patchValue({email:person.email});
  //this.form.patchValue({oldCNIC:person.oldCNIC});
  this.form.patchValue({ntn:person.ntn});
  
  if(person.addresses){
    if(person.addresses.length>0){
    this.form.patchValue({permanentAddress:person.addresses[0]?.addressDescription});
    this.form.patchValue({permanentCity:person.addresses[0]?.city});
    this.form.patchValue({permanentDistrictId:person.addresses[0]?.districtId});
    //this.form.patchValue({postalCode:person.addresses[0]?.postalCode});
  
    if(person.addresses.length>1){
      this.form.patchValue({presentAddress:person.addresses[1]?.addressDescription});
      this.form.patchValue({presentCity:person.addresses[1]?.city});
      this.form.patchValue({presentDistrictId:person.addresses[1]?.districtId});
    }
  }
  }
  if(person.phoneNumbers){
    if(person.phoneNumbers.length>0){
    this.form.patchValue({phoneNumber:person.phoneNumbers[0].phoneNumberValue});
    if(person.phoneNumbers.length>1){
      this.form.patchValue({phone2:person.phoneNumbers[1].phoneNumberValue});
    }}
  }
  }


    
// getallDropdowns(){
//     this.spinner.show();
//     // console.log("This data is loaded from server");
//     this.businessRequestService.getDropDownOwner().pipe(first()).subscribe(
//       result => {
//         if(result?.status=='0'){
//           if(result?.data){
//             if(result.data.districts){
//               this.dddistricts=result.data.districts;
//             }
            
//             if(result.data.countries){
//               this.ddcountries=result.data.countries;
//             }
            
//             if(result.data.businessSector){
//               this.ddbusinessSector=result.data.businessSector;
//             }

//             if(result.data.businessStatus){
//               this.ddbusinessStatus=result.data.businessStatus;
//             }

//             if(result.data.businessType){
//               this.ddbusinessType=result.data.businessType;
//             }
//           }
//           this.spinner.hide();
//         }else{
//         this.spinner.hide();
//         this.toastrService.error(result?.message || "Bad request", 'Error!');
//         }},
//       error => {
//         this.spinner.hide();
//         this.toastrService.error(error, 'Error!');
//       },
//       () => { 
//         this.spinner.hide(); 
//       });
  
// }


ClearBusiess(){
  this.form.patchValue({businessTypeId:''});
  this.form.patchValue({businessSectorId:''});
  this.form.patchValue({businessStatusId:''});
  this.form.patchValue({businessRegNo:''});
  this.form.patchValue({businessName:''});
  this.form.patchValue({businessEmail:''});
  this.form.patchValue({businessNTN:''});
  this.form.patchValue({businessFTN:''});
  this.form.patchValue({businessSTN:''});
  this.form.patchValue({businessPresentAddress:''});
  this.form.patchValue({businessPresentCity:''});
  this.form.patchValue({businessPresentDistrictId:''});
  this.form.patchValue({businessPermanentAddress:''});
  this.form.patchValue({businessPermanentCity:''});
  this.form.patchValue({businessPermanentDistrictId:''});
  this.form.patchValue({businessPhoneNumber:''});
  this.form.patchValue({businessPhone2:''});
  this.form.patchValue({businessPostalCode:''});

  this.btnFetchVisibile=true;
  this.btnDeleteVisibile=false;
  this.EnableBusiness();
  this.ObjBussiness=undefined;
  this.form.markAsUntouched();

}

EnableBusiness(){

  this.form.controls['businessTypeId'].enable();
  this.form.controls['businessSectorId'].enable();
  this.form.controls['businessStatusId'].enable();
  this.form.controls['businessRegNo'].enable();
  this.form.controls['businessName'].enable();
  this.form.controls['businessEmail'].enable();
  this.form.controls['businessNTN'].enable();
  this.form.controls['businessFTN'].enable();
  this.form.controls['businessSTN'].enable();
  this.form.controls['businessPresentAddress'].enable();
  this.form.controls['businessPresentCity'].enable();
  this.form.controls['businessPresentDistrictId'].enable();
  this.form.controls['businessPermanentAddress'].enable();
  this.form.controls['businessPermanentCity'].enable();
  this.form.controls['businessPermanentDistrictId'].enable();
  this.form.controls['businessPhoneNumber'].enable();
  this.form.controls['businessPhone2'].enable();
  this.form.controls['businessPostalCode'].enable();
}

DisableBusiness(){
  this.form.controls['businessTypeId'].disable();
  this.form.controls['businessSectorId'].disable();
  this.form.controls['businessStatusId'].disable();
  this.form.controls['businessRegNo'].disable();
  this.form.controls['businessName'].disable();
  // this.form.controls['businessEmail'].disable();
  this.form.controls['businessNTN'].disable();
  this.form.controls['businessFTN'].disable();
  this.form.controls['businessSTN'].disable();
  // this.form.controls['businessPresentAddress'].disable();
  // this.form.controls['businessPresentCity'].disable();
  // this.form.controls['businessPresentDistrictId'].disable();
  // this.form.controls['businessPermanentAddress'].disable();
  // this.form.controls['businessPermanentCity'].disable();
  // this.form.controls['businessPermanentDistrictId'].disable();
  // this.form.controls['businessPhoneNumber'].disable();
  // this.form.controls['businessPhone2'].disable();
  // this.form.controls['businessPostalCode'].disable();
}

ClearCustomer() {
  this.form.patchValue({cnic:''});
  this.form.patchValue({personName:''});
  this.form.patchValue({fatherHusbandName:''});
  this.form.patchValue({email:''});
 // this.form.patchValue({oldCNIC:''});
  this.form.patchValue({ntn:''});
  this.form.patchValue({presentCity:''});
  this.form.patchValue({presentAddress:''});
  this.form.patchValue({presentDistrictId:''});
  this.form.patchValue({permanentCity:''});
  this.form.patchValue({permanentAddress:''});
  this.form.patchValue({permanentDistrictId:''});
  this.form.patchValue({phoneNumber:''});
  this.form.patchValue({phone2:''});
  this.form.patchValue({postalCode:''});
  
  this.btnFetchVisibile=true;
  this.btnDeleteVisibile=false;
  this.form.markAsUntouched();
  this.EnableCustomer();
  this.ObjPerson=new Person();
}
EnableCustomer(){

  this.form.controls['cnic'].enable();
  this.form.controls['personName'].enable();
  this.form.controls['fatherHusbandName'].enable();
  this.form.controls['email'].enable();
  //this.form.controls['oldCNIC'].enable();
  this.form.controls['ntn'].enable();
  this.form.controls['presentCity'].enable();
  this.form.controls['presentAddress'].enable();
  this.form.controls['presentDistrictId'].enable();
  this.form.controls['permanentCity'].enable();
  this.form.controls['permanentAddress'].enable();
  this.form.controls['permanentDistrictId'].enable();
  this.form.controls['phoneNumber'].enable();
  this.form.controls['phone2'].enable();
  this.form.controls['postalCode'].enable();
}

DisableCustomer(){

  this.form.controls['cnic'].disable();
  this.form.controls['personName'].disable();
  this.form.controls['fatherHusbandName'].disable();
 // this.form.controls['email'].disable();
 // this.form.controls['oldCNIC'].disable();
  // this.form.controls['ntn'].disable();
  // this.form.controls['presentCity'].disable();
  // this.form.controls['presentAddress'].disable();
  // this.form.controls['presentDistrictId'].disable();
  // this.form.controls['permanentCity'].disable();
  // this.form.controls['permanentAddress'].disable();
  // this.form.controls['permanentDistrictId'].disable();
  // this.form.controls['phoneNumber'].disable();
  // this.form.controls['phone2'].disable();
  // this.form.controls['postalCode'].disable();
}

keyPressNumberOnly(event: KeyboardEvent) {
  const pattern = /[0-9]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {    
      // invalid character, prevent input
      event.preventDefault();
  }
}
keyPressCNIC(event: KeyboardEvent) {
const pattern = /[0-9]/;
const inputChar = String.fromCharCode(event.charCode);
if (!pattern.test(inputChar)) {    
    // invalid character, prevent input
    event.preventDefault();
}
}

keyPressNTN(event: KeyboardEvent) {
  const pattern = /[0-9-_]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {    
      // invalid character, prevent input
      event.preventDefault();
  }
  }
  
keyPressAlfhabetsOnly(event: KeyboardEvent) {
const pattern = /^[a-zA-Z ]*$/;
const inputChar = String.fromCharCode(event.charCode);
if (!pattern.test(inputChar)) {    
    // invalid character, prevent input
    event.preventDefault();
}}


}
