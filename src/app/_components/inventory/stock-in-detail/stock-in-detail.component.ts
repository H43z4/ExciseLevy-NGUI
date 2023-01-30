import { Component, OnInit } from '@angular/core';
import { InventoryServiceService } from 'src/app/_services/inventory/inventory-service.service';

@Component({
  selector: 'app-stock-in-detail',
  templateUrl: './stock-in-detail.component.html',
  styleUrls: ['./stock-in-detail.component.css']
})
export class StockInDetailComponent implements OnInit {
  Record1: any;
  Record2: any;
  StockInDetaillist: any[] = [];  

  constructor(
    private stockIn: InventoryServiceService,
  ) { }

  ngOnInit(): void {
    this.getStockInById();
  }


  getStockInById()
  {
    debugger
    let Id = localStorage.getItem("StockInByID");
    this.stockIn.StockInDetailById(Id).subscribe(
      res => {
        debugger

         this.Record1 = res.data;
         this.Record2 = res.data.items;

         for (let index = 0; index < this.Record2.length; index++) {
          this.StockInDetaillist.push({
            
            productName: this.Record2[index].productName,
            bottleSize: this.Record2[index].bottleSize,
            bulkGallons: this.Record2[index].bulkGallons,
            quantity: this.Record2[index].quantity,
            requestDate: this.Record2[index].requestDate,
            strenghtPercentage: this.Record2[index].strenghtPercentage,
            createdAt: this.Record2[index].createdAt,
          })
        }

        debugger
        var aa = this.StockInDetaillist;





      });
    }


}
