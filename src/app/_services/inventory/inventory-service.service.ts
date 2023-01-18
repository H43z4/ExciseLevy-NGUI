import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { generalResponse } from 'src/app/_models';
import { ConsignmentModel } from 'src/app/_models/inventory/consignment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  constructor(private http: HttpClient) { }

  setConsignmentId(ConsignmentId:number){
    sessionStorage.setItem('ConsignmentIdId', ConsignmentId.toString());
  }

  getConsignmentId(){
    let ConsignmentId:number=0;
    let Consignment= sessionStorage.getItem('ConsignmentId');
    if(Consignment) {
      ConsignmentId=Number(Consignment);
    }
    return ConsignmentId;
  }

  saveCreateConsignment(consignment: ConsignmentModel) {
    return this.http.post<generalResponse>(`${environment.apiUrlsample}/api/Inventory/SaveConsignment`, consignment)
      .pipe(map(res => {
        return res;
      }));
  }

  savePOS(PosData:any) {
    return this.http.post<any>(`${environment.apiUrlsample}/api/PointOfSale/SaveVendOrder`, PosData)
      .pipe(map(res => {
        return res;
      }));
  }
  StockInList() {
    return this.http.get<any>(`${environment.apiUrlsample}/api/Inventory/GetStockInApplicationList`)
  }


  StockInDetailById(id: any) {
    return this.http.get<any>(`${environment.apiUrlsample}/api/Inventory/GetStockInApplicationListById?id=`+id)
  }
  
}
