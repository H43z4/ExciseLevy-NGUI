import { Injectable } from '@angular/core';
import { User,generalResponse,setup,frmClass } from '../_models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DynamicSetupsService {

  private generalRes?: generalResponse;
  frmArray:frmClass[]=[
  { code: "OrganizationCategory", title: "Organization Category", APIgetall:"OrganizationCategory/GetAll", APIgetbyID:"OrganizationCategory/Get",APIPost:"OrganizationCategory/Post",APIput:"OrganizationCategory/Put"},
  { code: "OwnerType", title: "Owner Type", APIgetall:"OwnerType/GetAll", APIgetbyID:"OwnerType/Get",APIPost:"OwnerType/Post",APIput:"OwnerType/Put"},
  { code: "OwnerTaxGroup", title: "Owner Tax Group", APIgetall:"OwnerStatus/GetAll", APIgetbyID:"OwnerStatus/Get",APIPost:"OwnerStatus/Post",APIput:"OwnerStatus/Put"},
  { code: "VehicleBodyConvention", title: "Vehicle Body Convention", APIgetall:"VehicleBodyConvention/GetAll", APIgetbyID:"VehicleBodyConvention/Get",APIPost:"VehicleBodyConvention/Post",APIput:"VehicleBodyConvention/Put"},
  { code: "VehicleClass", title: "Vehicle Class", APIgetall:"VehicleClass/GetAll", APIgetbyID:"VehicleClass/Get",APIPost:"VehicleClass/Post",APIput:"VehicleClass/Put"},
  { code: "VehicleColor", title: "Vehicle Color", APIgetall:"VehicleColor/GetAll", APIgetbyID:"VehicleColor/Get",APIPost:"VehicleColor/Post",APIput:"VehicleColor/Put"},
  { code: "VehicleMake", title: "Vehicle Make", APIgetall:"VehicleMake/GetAll", APIgetbyID:"VehicleMake/Get",APIPost:"VehicleMake/Post",APIput:"VehicleMake/Put"},
  { code: "VehicleMaker", title: "Vehicle Maker", APIgetall:"VehicleMaker/GetAll", APIgetbyID:"VehicleMaker/Get",APIPost:"VehicleMaker/Post",APIput:"VehicleMaker/Put"},
  { code: "VehicleStatus", title: "Vehicle Status", APIgetall:"VehicleStatus/GetAll", APIgetbyID:"VehicleStatus/Get",APIPost:"VehicleStatus/Post",APIput:"VehicleStatus/Put"},
  { code: "VehicleUsage", title: "Vehicle Usage", APIgetall:"VehicleUsage/GetAll", APIgetbyID:"VehicleUsage/Get",APIPost:"VehicleUsage/Post",APIput:"VehicleUsage/Put"},
  { code: "VehicleScheme", title: "Vehicle Scheme", APIgetall:"VehicleScheme/GetAll", APIgetbyID:"VehicleScheme/Get",APIPost:"VehicleScheme/Post",APIput:"VehicleScheme/Put"},
  { code: "VehicleRCStatus", title: "Vehicle RC Status", APIgetall:"VehicleRCStatus/GetAll", APIgetbyID:"VehicleRCStatus/Get",APIPost:"VehicleRCStatus/Post",APIput:"VehicleRCStatus/Put"},
  { code: "VehicleFuelType", title: "Vehicle Fuel Type", APIgetall:"VehicleFuelType/GetAll", APIgetbyID:"VehicleFuelType/Get",APIPost:"VehicleFuelType/Post",APIput:"VehicleFuelType/Put"},
  { code: "VehicleEngineType", title: "Vehicle Engine Type", APIgetall:"VehicleEngineType/GetAll", APIgetbyID:"VehicleEngineType/Get",APIPost:"VehicleEngineType/Post",APIput:"VehicleEngineType/Put"},
  { code: "VehicleCategory", title: "Vehicle Category", APIgetall:"VehicleCategory/GetAll", APIgetbyID:"VehicleCategory/Get",APIPost:"VehicleCategory/Post",APIput:"VehicleCategory/Put"},
  { code: "VehicleBodyType", title: "Vehicle Body Type", APIgetall:"VehicleBodyType/GetAll", APIgetbyID:"VehicleBodyType/Get",APIPost:"VehicleBodyType/Post",APIput:"VehicleBodyType/Put"},
  { code: "VehiclePurchaseType", title: "Vehicle Purchase Type", APIgetall:"VehiclePurchaseType/GetAll", APIgetbyID:"VehiclePurchaseType/Get",APIPost:"VehiclePurchaseType/Post",APIput:"VehiclePurchaseType/Put"},
  { code: "VehicleClassification", title: "Vehicle Classification", APIgetall:"VehicleClassification/GetAll", APIgetbyID:"VehicleClassification/Get",APIPost:"VehicleClassification/Post",APIput:"VehicleClassification/Put"}


];
  
  constructor( private router: Router, private http: HttpClient) { 
    
  }

  GetFormData(frmCode?:string) {
    //   console.log("this is test point 1");
    //   console.log(this.frmArray.find.arguments(frmCode));
   return this.frmArray.find(o => o.code === frmCode);
   
   //return { code: "OwnerType", title: "Owner Type", APIgetall:"OwnerType/GetAll", APIgetbyID:"OwnerType/Get",APIPost:"OwnerType/Post",APIput:"OwnerType/Put"};
   // return  this.http.get<frmClass>(`${environment.apiUrl}/api/=`+id);

   }

  getAllSetups(url?:string,page?:number,pagesize?:number) {
    return this.http.get<generalResponse>(`${environment.apiUrl}/api/${url}?recs_per_page=`+pagesize+`&page_no=`+page);
   // return this.http.get<generalResponse>(`${environment.apiUrl}/api/${url}?recs_per_page=1000&page_no=1`);
    }

  saveSetup(url?:string,setupObj?:setup){
    
      return this.http.post<generalResponse>(`${environment.apiUrl}/api/${url}`, setupObj )
      .pipe(map(res => {
      //  console.log(res);
        return res;})
         );
         }

  GetSetupById(url?:string,id?:string) {
    return  this.http.get<generalResponse>(`${environment.apiUrl}/api/${url}?id=`+id);

   }
   UpdateSetup(url?:string,setupObj?:setup){
    
    return this.http.put<generalResponse>(`${environment.apiUrl}/api/${url}`, setupObj )
    .pipe(map(res => {
     // console.log(res);
      return res;})
       );
       }

}
