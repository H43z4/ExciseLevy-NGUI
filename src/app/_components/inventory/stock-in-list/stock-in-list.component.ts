import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryServiceService } from 'src/app/_services/inventory/inventory-service.service';

@Component({
  selector: 'app-stock-in-list',
  templateUrl: './stock-in-list.component.html',
  styleUrls: ['./stock-in-list.component.css']
})
export class StockInListComponent implements OnInit {
  Stocklist: any[] = [];  
  constructor(
    private stockIn: InventoryServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.GetStockInApplicationList();
  }




  SendStockinApplicationDetail(Id : any)
  {
    debugger
    localStorage.setItem('StockInByID', Id.toString());

    this.router.navigateByUrl('/master/StockInDetail');

  }

  GetStockInApplicationList()
  {
    this.stockIn.StockInList().subscribe(
      res => {
        this.Stocklist= [];
        var Records = res.data.table;
        debugger
        for (let index = 0; index < Records.length; index++) {
          this.Stocklist.push({
            
            stockInApplicationId: Records[index].stockInApplicationId,
            excisePassNo: Records[index].excisePassNo,
            permitNo: Records[index].permitNo,
            transportExportNo: Records[index].transportExportNo,
            requestDate: Records[index].requestDate,
            organization: Records[index].organization,
            manufacturerName: Records[index].manufacturerName,
          })
        }
    

    
     
      });
    }

}
