import { Injectable } from '@angular/core';
import { User,generalResponse,setup } from '../_models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupsService {
  // private userSubject: BehaviorSubject<User>;
  // public user: Observable<User>;
  private generalRes?: generalResponse;

  constructor( private router: Router, private http: HttpClient) { 
    // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')|| "null"));
    //     this.user = this.userSubject.asObservable();
  }

  getAllSetups() {
    return this.http.get<generalResponse>(`${environment.apiUrl}/api/OrganizationCategory/GetAll`);
    }

  saveSetup(setupObj?:setup){
    
      return this.http.post<generalResponse>(`${environment.apiUrl}/api/OrganizationCategory/Post`, setupObj )
      .pipe(map(res => {
      //  console.log(res);
        return res;})
         );
         }

  GetSetupById(id?:string) {
    return  this.http.get<generalResponse>(`${environment.apiUrl}/api/OrganizationCategory/Get?id=`+id);

   }


   UpdateSetup(setupObj?:setup){
    
    return this.http.put<generalResponse>(`${environment.apiUrl}/api/OrganizationCategory/Put`, setupObj )
    .pipe(map(res => {
     // console.log(res);
      return res;})
       );
       }

}
