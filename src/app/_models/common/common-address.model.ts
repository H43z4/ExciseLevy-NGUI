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

export class CommonAddressInput{
dropdownData:any;
addressesData:CommonAddress[]=[];
accessLevel:number=0;
}

export class CommonAddressOutput{
    addressesData:CommonAddress[]=[];
    isValid:number=0;
    }