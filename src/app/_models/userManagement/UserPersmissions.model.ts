

export class UserPersmissions {
    userWorkingPermissionId: number = 0;
    userId: number=0;
    roleId: number=0;
    workingPermissionId: number=0;
    workingPermission?: string;
    minDateTime?: Date;
    maxDateTime?: Date;
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

export class Owner {
    applicationId:number= 0;
    businessProcessId:number= 0;
    ownerId: number= 0;
    ownerTypeId: number= 0;
    ownerTaxGroupId:number= 0;

    ownerType?:string;
    ownerTaxGroup?: string;

    isHPA:boolean=false;

    persons?:Person[];
    business?:bussiness;
    vehicleId?:number;
    sellerId?:number;
    accessLevel:number=0;
}

export class bussiness {
    businessId:number=0;
    businessTypeId:number=0;
    businessType:string="";
    businessSectorId:number=0;
    businessSector:string="";
    businessStatusId:number=0;
    businessStatus: string="";
    businessRegNo:string="";
    businessName:string="";
    email:string="";
    ntn:string="";
    ftn:string="";
    stn:string="";
    addresses: CommonAddress[]=[];
    phoneNumbers: phoneNumbersClass[]=[];
    
}
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

export class Person {
    personId:number= 0;
    countryId: number= 0;
    personName:string= "";
    fatherHusbandName:string= "";
    cnic:string= "";
    email:string= "";
    oldCNIC:string= "";
    ntn:string= "";
    addresses:CommonAddress[]= [];
    phoneNumbers:phoneNumbersClass[]= [];
}

export class CommonAddress {
    addressId: number= 0;
    addressDescription: string= "";
    propertyNo: string= "";
    street: string= "";
    areaName: string= "";
    city: string= "";
    postOfficeId?: number;
    postOffice?: string;
    districtId: number= 0;
    district?: string;
    tehsilId?: number;
    tehsil?: string;
    addressTypeId: number= 0;
    addressType?: string;
    addressAreaId: number= 0;
    addressArea?: string;
    personId?: number;
    businessId?: number;
    postalCode:string="";
}

export class phoneNumbersClass {
    phoneNumberId: number= 0;
    phoneNumberValue: string= "";
    countryId: number= 0;
    phoneNumberTypeId: number= 0;
}

