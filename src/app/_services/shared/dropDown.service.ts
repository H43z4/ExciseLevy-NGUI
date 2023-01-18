import { Injectable } from '@angular/core';
import { DataService } from '../Data.service';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  
    constructor( private router: Router, private http: HttpClient,private DataService: DataService,) {
    }

    // getDropDownOwner() {
    //     return this.http.get<ownerDropDownLists>(`${environment.apiUrl}/api/Registration/GetOwnersDropDowns`);
    //     }


    // getDropDownVehicle() {
    //         return this.http.get<vehicleDropDownLists>(`${environment.apiUrl}/api/Registration/GetVehiclesDropDowns`);
    //         }
    
    // getDropDownPurchaseType() {
    //          return this.http.get<purchaseTypeDropDownList>(`${environment.apiUrl}/api/Registration/GetPurchaseDropDowns`);
    //             }


        


}