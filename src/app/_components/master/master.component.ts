import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { AccountService,DataService } from '../../_services';
import { User } from '../../_models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mater',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})
export class MaterComponent implements OnInit {

  user!: User;
  cussrentpage?:string;

  expanded: boolean = true;
  expandedOut: boolean = true;
 public isCollapsed = false;
  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

  // public isMenuCollapsed = true;
// public isCollapsed = false;
  constructor(private accountService: AccountService,
    private router: Router,
    private DataService:DataService) {
    //console.log("This is before function check");
   this.accountService.user.subscribe(x => this.user = x);
      //console.log(this.user);
      this.cussrentpage=this.accountService.getPageTitle(this.router.url);
     
  }

  logout() {
    this.accountService.logout();
}

  ngOnInit(): void {
    //console.log(this.router.url);
    this.cussrentpage=this.accountService.getPageTitle(this.router.url);
    
  }

}
