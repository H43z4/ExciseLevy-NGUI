import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PR1 } from 'src/app/_models/Issuances/PR1Model';
import { Dropdown, DropdownApi } from 'src/app/_models/setup/Dropdown';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PR2Service {

  constructor(private http: HttpClient) {
  }

  PR2Save(PR2: any) {
    return this.http.post<any>(`${environment.apiUrlsample}/Permit/SavePermit`,PR2)
    .pipe(map(res =>{
      return res;
    }));
  }

  SerachCnic(CNIC :string )
  {
    return this.http.get<any>(`${environment.apiUrlsample}/Person/GetPersonInfoByCNIC?cnic=`+CNIC)
    .pipe(map(res =>{
      return res;
    }));
  }


  
}
