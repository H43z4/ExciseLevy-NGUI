import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { InventoryServiceService } from 'src/app/_services/inventory/inventory-service.service';

@Component({
  selector: 'app-stock-in-list',
  templateUrl: './stock-in-list.component.html',
  styleUrls: ['./stock-in-list.component.css']
})
export class StockInListComponent implements OnInit {
  Stocklist: any[] = [];  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private stockIn: InventoryServiceService,
    private router:Router
  ) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
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
        var Records = res.data;
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
    

        this.dtTrigger.next(Records);
     
      });
    }

}
