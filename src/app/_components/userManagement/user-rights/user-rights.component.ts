import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, ControlContainer, MinLengthValidator,FormArray} from '@angular/forms';
import { dropDownList,dropDownListSiteOffice } from '../../../_models';
import { UserManagementService } from '../../../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { UserInfo,UserRole, UserPersmissions } from 'src/app/_models/userManagement/UserPersmissions.model';


@Component({
  selector: 'app-user-rights',
  templateUrl: './user-rights.component.html',
  styleUrls: ['./user-rights.component.css']
})
export class UserRightsComponent implements OnInit {

  UserId:number=0;
  RoleId:number=0;

  UserInfo:UserInfo= new UserInfo();
  SeriesCategoriesIdList:number[]=[];


  UserPersmissionsList:UserPersmissions[]=[];

  dddistricts:dropDownList[]= [];
  ddSiteOffices:dropDownListSiteOffice[]=[];
  ddSiteOfficeFiltered:dropDownListSiteOffice[]=[];
  ddRoles:dropDownList[]= [];
  ddLineManager:dropDownList[]= [];
  showLineManager:boolean=false;


  PermissionIdTODelete:number=0;




  constructor(
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router,
    private UserManagementService:UserManagementService,
    config: NgbModalConfig, private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = true;
     }

  active = 1;
  open(content:any,Id:number) {
    console.log();
    this.modalService.open(content);
    this.PermissionIdTODelete = Id;

  }
  ngOnInit(): void {
    this.UserId=0;
    let Id= sessionStorage.getItem('UserDetailId');
    if(Id) {
      this.UserId=Number(Id);
    }
    if(this.UserId>0){
      this.getallDropdowns();
      this.GetUserDetail(this.UserId);
    }else{
      this.toastrService.warning("Please select a user first", 'Not Found!');
      this.router.navigateByUrl('/master/userlist');
    }



    this.getallDropdowns();
    this.GetUserDetail(this.UserId);
    // this.GetSeriesData(this.UserId,this.RoleId);
    // this.getUserPermissions(this.UserId,this.RoleId);
  }


  Roleform = new FormGroup({
    RoleId: new FormControl('',Validators.required),
    DistrictId: new FormControl('',Validators.required),
    SiteOfficeId: new FormControl('',Validators.required),
    LineManagerId: new FormControl('')
  });


  CatListform = new FormGroup({
    detailId: new FormArray([]),
  });

  PermissionForm = new FormGroup({
    workingPermissionId: new FormControl('',Validators.required),
    minDateTime: new FormControl('',Validators.required),
    maxDateTime: new FormControl('',Validators.required)
  });




  get f(){
    return this.Roleform.controls;
  }


  //#region User Role function

  addValidatorLineManager(){ 
    this.Roleform.controls['LineManagerId'].addValidators(Validators.required);  
  }
  
  
  removeValidatorsLineManager(){
    this.Roleform.controls['LineManagerId'].clearValidators(); 
  }


  changeDistrict(){
    if(this.Roleform.value?.DistrictId){
     this.ddSiteOfficeFiltered = this.ddSiteOffices.filter(o => o.districtId == this.Roleform.value.DistrictId);
      if(this.ddSiteOfficeFiltered.length>0){
        this.Roleform.patchValue({SiteOfficeId:this.ddSiteOfficeFiltered[0].value});
      }
    }else{
      this.ddSiteOfficeFiltered=this.ddSiteOffices;
    }
  }


  ChangeRole(){
    this.spinner.show();
    this.showLineManager = false;
    this.removeValidatorsLineManager();
    this.ddLineManager = [];

    if (this.Roleform.value.DistrictId && this.Roleform.value.SiteOfficeId && this.Roleform.value.RoleId){
      if (this.Roleform.value.RoleId==2 || this.Roleform.value.RoleId==3) {
        this.UserManagementService.getLineManager(this.Roleform.value.DistrictId,this.Roleform.value.SiteOfficeId,this.Roleform.value.RoleId).pipe(first()).subscribe(
          res => {
            if(res.data?.roles){   
                  this.ddLineManager = res.data?.roles;   
                }   
          this.showLineManager=true; 
          this.addValidatorLineManager();
          this.spinner.hide(); 
         });
      }else{
        this.spinner.hide();
      }
    }else{
      this.spinner.hide();
    }
    
  }




  GetUserDetail(userId:number){
    this.spinner.show();
  if(userId>0){
    this.UserManagementService.getUserByUserId(userId).pipe(first()).subscribe(
      res => {
        if(res?.status=='0'){
        if(res.data?.users){   
          this.UserInfo=res.data.users;
          this.RoleId=res.data.users.roleId;
          this.getUserPermissions(this.UserId,this.RoleId);
        }else{
          this.spinner.hide();
          this.toastrService.warning("No user found with this userId", 'Not Found!');
        }    
      }else{
        this.spinner.hide();
          this.toastrService.warning("No user found with this userId", 'Not Found!');
      }  
  });
  
  }
  this.spinner.hide();
  }

  getallDropdowns(){
      this.spinner.show();
      this.UserManagementService.getDropDownCreateUser().pipe(first()).subscribe(
        result => {
          //console.log(result);
          if(result?.status=='0'){
            if(result?.data){
              if(result.data?.districts){
                this.dddistricts=result.data.districts;
              }
  
              if(result.data?.siteOffices){
                this.ddSiteOffices = result.data.siteOffices;
              }
  
              if(result.data?.roles){
                this.ddRoles = result.data.roles;
              }
            }
            
            this.spinner.hide();
          }else{
          this.spinner.hide();
          this.toastrService.error(result?.message || "Bad request", 'Error!');
          }},
        error => {
          this.spinner.hide();
          this.toastrService.error(error, 'Error!');
        },
        () => { 
          this.spinner.hide();  
        });
    
  }

  ResetUserRole(){
    this.Roleform.reset();
     
    this.Roleform.patchValue({RoleId:''});
   
    this.Roleform.patchValue({DistrictId:''});
    this.Roleform.patchValue({SiteOfficeId:''});
    this.Roleform.patchValue({LineManagerId:''});
  }

  SaveUserRole(){
    this.spinner.show();
    if (!this.Roleform.valid) {
        this.spinner.hide();
        this.Roleform.markAllAsTouched();
        return;
      }
          let RoleObj = new UserRole();
          RoleObj.UserId = this.UserId;
          RoleObj.DistrictId = this.Roleform.value.DistrictId;
          RoleObj.RoleId = this.Roleform.value.RoleId;
          RoleObj.SiteOfficeId = this.Roleform.value.SiteOfficeId;
          // RoleObj.LineManagerId = this.Roleform.value?.LineManagerId;
          if(this.Roleform.value?.LineManagerId){
            RoleObj.LineManagerId = this.Roleform.value?.LineManagerId;
          }else{
            RoleObj.LineManagerId = undefined;
          }

          this.UserManagementService.UpdateUserRole(RoleObj).subscribe(
              result => {
                if(result?.status=='0'){
                  this.spinner.hide();
                  this.toastrService.success('User role update successfully!', 'Success!');
                  this.Roleform.reset();
                  this.GetUserDetail(this.UserId);
                   
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

  //#endregion


  onCheckChange(event:any) {
    // const formArray: FormArray = this.CatListform.get('detailId') as FormArray;
    if(event.target.checked){
      this.SeriesCategoriesIdList.push(Number(event.target.value));
    }else{
      //delete this.SeriesCategoriesIdList[Number(event.target.value)];
      this.SeriesCategoriesIdList.forEach((element,index)=>{
        if(element==event.target.value){
          //delete this.SeriesCategoriesIdList.[index];
          this.SeriesCategoriesIdList.splice(index,1);
        } 
     });
    }
    //console.log(this.SeriesCategoriesIdList);
  } 
  // SaveSeriesCategory(){
  //   this.spinner.show();
  // if (this.SeriesCategoriesIdList.length<1) {
  //   this.spinner.hide();
  //   this.toastrService.error("Please select some categories first.","Error");
  //   return;  
  // }
  //         let CateforyObj = new SaveAssignedCategories();
  //         CateforyObj.UserId = this.UserId;
  //         CateforyObj.RoleId = this.RoleId ;
  //         CateforyObj.SeriesCategoryId = this.SeriesCategoriesIdList;
        
  //         this.UserManagementService.SaveAssignedCategories(CateforyObj).subscribe(
  //             result => {
  //               if(result?.status=='0'){
  //                 this.spinner.hide();
  //                 this.toastrService.success('Series assigned successfully!', 'Success!');                   
  //               }else{
  //               this.spinner.hide();
  //               this.toastrService.error(result.message, 'Error!');
  //               } },
  //             error => {
  //               this.spinner.hide();
  //               this.toastrService.error(error, 'Error!');
  //             },() => {
  //               this.spinner.hide();
  //             });
  // }


  //#endregion


  //#region  User Permissions


  SavePermissions(){
    this.spinner.show();

    if (!this.PermissionForm.valid) {
      this.spinner.hide();
      this.PermissionForm.markAllAsTouched();
      return;
    }

  if (this.PermissionForm.value.minDateTime>this.PermissionForm.value.maxDateTime) {
    this.spinner.hide();
    this.toastrService.error("From date should be leaser then to date.","Error");
    return;  
  }
          let PermissionObj = new UserPersmissions();
          PermissionObj.userId= this.UserId;
          PermissionObj.roleId = this.RoleId;
          PermissionObj.workingPermissionId = this.PermissionForm.value.workingPermissionId;
          PermissionObj.minDateTime = this.PermissionForm.value.minDateTime;
          PermissionObj.maxDateTime = this.PermissionForm.value.maxDateTime;

          this.UserManagementService.SaveUserPermissions(PermissionObj).subscribe(
              result => {
                if(result?.status=='0'){
                  this.spinner.hide();
                  this.toastrService.success('Permissions added successfully!', 'Success!'); 
                  this.PermissionForm.reset();
                  this.getUserPermissions(this.UserId, this.RoleId);                  
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

  DeletePermissions(permissionId:number){
    permissionId=this.PermissionIdTODelete; 
    this.UserManagementService.CancellUserPermissions(this.UserId,permissionId).subscribe(
              result => {
                if(result?.status=='0'){
                  this.spinner.hide();
                  this.toastrService.success('Permissions deleted successfully!', 'Success!'); 
                  this.getUserPermissions(this.UserId, this.RoleId);                  
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

  getUserPermissions(UserId:number, RoleId:number){
    this.spinner.show();
    this.UserManagementService.getUserPermissions(UserId,RoleId).pipe(first()).subscribe(
      res => {
        if(res.data?.userPersmissions){   
          this.UserPersmissionsList=res.data?.userPersmissions;
        }  
      this.spinner.hide();
    });
  }

  //#endregion
}
