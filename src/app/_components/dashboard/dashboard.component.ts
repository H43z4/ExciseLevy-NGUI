import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { Weather } from '../../_models/weather.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Weather_LIST?: Weather[];
  returnUrl:string= ""; 
  role: string | null| undefined;
  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router) { 
      // console.log("before get all service ");
      // this.accountService.getweathers().subscribe(
      //   (result) =>{
    
      //     // if templateResponse.productData return type is templateData 
      //     console.log(result);
      //     this.Weather_LIST=result;
      //     //Weather_LIST = result;
  
      //   },
      //    (error) => {
      //     console.error(error);
      //     console.log(error);
      //     // this.accountService.logout();
      //   }
        
      // );
    }

  ngOnInit(): void {
    this.getRole();
  }
  //weathers=this.accountService.getweathers();
  
 
  
  getRole()
  {
     this.role = localStorage.getItem("role");

  }
  StockIn()
  {
  this.returnUrl= "";
    this.returnUrl= '/master/StockInApplication';
    this.router.navigateByUrl(this.returnUrl);
  }
  POS()
  {
  this.returnUrl= "";
    this.returnUrl= '/master/pos';
    this.router.navigateByUrl(this.returnUrl);
  }

  PR()
  {
  this.returnUrl= "";
    this.returnUrl= '/master/PermitApplicationL';
    this.router.navigateByUrl(this.returnUrl);
  }
 
}
