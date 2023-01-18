import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PR1 } from 'src/app/_models/Issuances/PR1Model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PR1Service {

  constructor(private http: HttpClient) {
  }
  



  PR1BasicInfo(pr1: PR1) {
    return this.http.post<any>(`${environment.apiUrlsample}/Permit/SavePermit`, pr1)
  }

  PRList() {
    return this.http.get<any>(`${environment.apiUrlsample}/Permit/GetPermitList`)
  }

  PRDetailById(id: any) {
    return this.http.get<any>(`${environment.apiUrlsample}/Permit/GetPermitApplicationListById?id=`+id)
  }
  

  // addArea(data: any): Observable<any[]> {
  //   const token = localStorage.getItem('token');
  //   const header = new HttpHeaders().set('Authorization',  `Bearer ${token}`);
  //   return this.http.post<any[]>(this.baseUrl + 'area', data , {headers: header});
  // }
}
