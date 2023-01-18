import { Injectable } from '@angular/core';
import { generalResponse,dropDownList,dropDownListSiteOffice } from '../../_models';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { CreateUser, UserPersmissions, UserRole } from 'src/app/_models/userManagement/UserPersmissions.model';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  // vehicle dropdowns
  private Districts:dropDownList[]=[];
  private SiteOffices:dropDownListSiteOffice[]=[];
  private Roles:dropDownList[]=[];

  constructor(private http: HttpClient) {
  }


  // // Create User DropDown
  // getDistricts(){
  //   return this.Districts;
  // }

  // getSiteOffices(){
  //   return this.SiteOffices;
  // }

  // getRoles(){
  //   return this.Roles;
  // }

  // // Set User DropDown 
  // setDistricts(Districts:dropDownList[]) {
  //   this.Districts=Districts;
  // }
  // setSiteOffice(SiteOffices:dropDownListSiteOffice[]) {
  //   this.SiteOffices=SiteOffices;
  // }
  // setRoles(Roles:dropDownList[]) {
  //   this.Roles=Roles;
  // }


  getUsersList() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/api/UserManagement/GetUsersList`);
    }

  getDropDownCreateUser() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/api/UserManagement/GetDropDownsCreateUser`);
    }

  getUserPermissions(UserId:number,RoleId:number ) {
    return  this.http.get<generalResponse>(`${environment.apiUrl}/api/UserManagement/GetUserPermission?UserId=${UserId}&RoleId=${RoleId}`);
   }

  getUserByUserId(userId:number) {
      return  this.http.get<generalResponse>(`${environment.apiUrl}/api/UserManagement/GetUserByUserId?userId=`+userId);
     }

  FetchPersonWithCnic(cnic:string) {
      return  this.http.get<generalResponse>(`${environment.apiUrl}/api/UserManagement/GetPersonByCNIC?cnic=`+cnic);
     }

  getLineManager(DistrictId:number,OfficeId:number,userRoleId :number) {
      return  this.http.get<generalResponse>(`${environment.apiUrl}/api/UserManagement/GetLineManager?DistrictId=${DistrictId}&OfficeId=${OfficeId}&userRoleId=${userRoleId}`);
     }
  
  GetAssignedSeriesCategories(UserId:number,RoleId :number) {
      return  this.http.get<generalResponse>(`${environment.apiUrl}/api/UserManagement/GetAssignedSeriesCategories?userId=${UserId}&RoleId=${RoleId}`);
     }

  UpdateUserRole(userObj:UserRole){
      return this.http.post<generalResponse>(`${environment.apiUrl}/api/UserManagement/UpdateUserRole`, userObj )
      .pipe(map(res => {
        return res; })); 
      }

  SaveUserPermissions(Persmissions:UserPersmissions){
        return this.http.post<generalResponse>(`${environment.apiUrl}/api/UserManagement/SaveUserPermission`, Persmissions )
        .pipe(map(res => {
          return res; })); 
        }
        
  CancellUserPermissions(UserId:number, PermissionId:number){
    
          return this.http.post<generalResponse>(`${environment.apiUrl}/api/UserManagement/CancellUserPermission`, { "UserId":UserId, "PermissionId":PermissionId } )
          .pipe(map(res => {
            return res; })); 
          }
  // SaveAssignedCategories(SaveAssignedCategories:SaveAssignedCategories){
  //       return this.http.post<generalResponse>(`${environment.apiUrl}/api/UserManagement/SaveAssignedSeriesCategories`, SaveAssignedCategories )
  //       .pipe(map(res => {
  //         return res; })); 
  //       }

  saveCreateUser(userObj:CreateUser){
      return this.http.post<generalResponse>(`${environment.apiUrl}/api/UserManagement/CreateUser`, userObj )
      .pipe(map(res => {
        return res; })); 
      }
}
