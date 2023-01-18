import {Person} from '..';

export class CreateUser {
  
    
    UserName: string="";
    Password: string="";
    RoleId: number=0;
    DistrictId: number=0;
    SiteOfficeId: number=0;
    UserTypeId: number=0;
    LineManagerId?: number;
    Person?: Person;
}


export class UserRole {
    UserId: number=0;
    RoleId: number=0;
    DistrictId: number=0;
    SiteOfficeId: number=0;
    LineManagerId?: number;
}


export class UserInfo {
    userId:number=0;
    district: string="";
    districtId:number=0;
    siteOffice: string="";
    siteOfficeId:number=0;
    userName: string="";
    cnic: string="";
    personName: string="";
    email: string="";
    managerName?: string;
    managerUserName?: string;
    roleId:number=0;
    roleName: string="";
}