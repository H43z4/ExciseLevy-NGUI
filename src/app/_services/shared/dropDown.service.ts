import { Injectable } from '@angular/core';
import { DataService } from '../Data.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { DropdownApi } from 'src/app/_models/setup/Dropdown';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  
    constructor( private router: Router, private http: HttpClient,private DataService: DataService,) {
    }

    GetDistrict() {
      return this.http.get<DropdownApi>(`${environment.apiUrlsample}/DropDown/GetDistrictsLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
    
    GetCities() {
      return this.http.get<DropdownApi>(`${environment.apiUrlsample}/DropDown/GetCitiesLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
            
      
    GetProfession() {
      return this.http.get<DropdownApi>(`${environment.apiUrlsample}/DropDown/GetProfessionsLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }

    GetManufacturers() {
      return this.http.get<DropdownApi>(`${environment.apiUrlsample}/DropDown/GetManufacturersLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
    GetProducts() {
      return this.http.get<DropdownApi>(`${environment.apiUrlsample}/DropDown/GetProductsLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
    GetProductUnits() {
      return this.http.get<DropdownApi>(`${environment.apiUrlsample}/DropDown/GetProductUnitsLOV`)
      .pipe(map(res =>{
        return res;
      }));
    }
        


}