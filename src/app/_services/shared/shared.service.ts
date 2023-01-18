import { Injectable } from '@angular/core';
import {generalResponse,DeliveryInfo,VehicleOwnerInfo } from '../../_models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // private userSubject: BehaviorSubject<User>;
  // public user: Observable<User>;
  
 
  private generalRes?: generalResponse;

  constructor( private router: Router, private http: HttpClient) {
      // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')|| "null"));
      // this.user = this.userSubject.asObservable();
  }
    
    FetchPersonWithCnic(cnic:string) {
        return  this.http.get<generalResponse>(`${environment.apiUrlsample}/api/Inventory/GetPersonInfoByCNIC?cnic=`+cnic);
       }
   
   
    FetchBusinessNTN(ntn:string) {
         return  this.http.get<generalResponse>(`${environment.apiUrl}/api/Registration/GetBusinessByTaxNumber?ntn=`+ntn);
        }

    
    // getRemarksData(applicationId:number) {
    //   return this.http.get<remarksData>(`${environment.apiUrl}/api/Registration/GetRemarks?applicationId=`+applicationId);
    //     }


    getAppllicationDetail(appId:number) {
      return this.http.get<generalResponse>(`${environment.apiUrl}/api/Registration/GetApplicationDetails?applicationId=`+appId);
        }

    getAssessmentDetail(appId:number) {
          return this.http.get<generalResponse>(`${environment.apiUrl}/api/Registration/GetChallanDetail?applicationId=`+appId);
        }
    
    getRegNosByChasis(Chasis:string) {
          return this.http.get<generalResponse>(`${environment.apiUrl}/api/Registration/GetRegistrationNoByChasis?ChasisNo=`+Chasis);
        }
        

    getAppList() {
      return this.http.get<generalResponse>(`${environment.apiUrl}/api/Registration/GetApplications?businessProcessId=1&applicationStatusId=1`);
       }


    getApplicationDB(appId:number) {
        return this.http.get<generalResponse>(`${environment.apiUrl}/api/Registration/GetApplicationDetails?applicationId=`+appId);
       }
   

    // getApplication(appId:number) {
    //        let application=new applicationState();
    //         this.getApplicationDB(appId).pipe().subscribe(
    //          res => {
    //            if(res?.status=='0'){     
    //              if(res.data){
    //                application=res.data;
    //                application.owner=res.data.owner;
    //                application.vehicle=res.data.vehicle;
    //              }} 
    //        });
    //    return application;
    //  }


  FetchPersonWithCnicDelivery(SearchCriteria:string){
      return  this.http.get<generalResponse>(`${environment.apiUrl}/api/Registration/GetVehicleOwnerInfoForDelivery?SearchCriteria=`+SearchCriteria);
    }

  DocumentScaningPhaseChange(appId:number){
      return this.http.post<generalResponse>(`${environment.apiUrl}/api/Registration/AppPhaseChangeFromScaning?appId=`+appId, {}  )
      .pipe(map(res => {
        return res; })); 
  }

  saveDeliveryInfo(DeliveryInfoObj:DeliveryInfo){
      return this.http.post<generalResponse>(`${environment.apiUrl}/api/Registration/SaveVehicleArticleDelivery`, DeliveryInfoObj )
      .pipe(map(res => {
        return res; })); 
      }

  getVehicleOwnerInfo(appId:any) {
        return this.http.get<generalResponse>(`${environment.apiUrl}/api/Registration/GetVehicleOwnerInfoForScanning?SearchCriteria=`+appId);
      }

  
  upload(vehicleOwnerInfo: VehicleOwnerInfo, file:File): Observable<generalResponse> {
        const formData: FormData = new FormData();
        formData.append("ApplicationId",String(vehicleOwnerInfo.applicationId));
        formData.append("TotalPages", String(vehicleOwnerInfo.totalPages));
        formData.append("DocumentTypeId", String(vehicleOwnerInfo.DocumentTypeId));
        formData.append('file',file);
        return this.http.post<generalResponse>(`${environment.apiUrl}/api/Registration/Upload`,formData);
      }
  

}