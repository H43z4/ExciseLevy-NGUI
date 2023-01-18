import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user.model';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   user!: User;

  constructor(private accountService: AccountService) {
    // console.log("This is before function check");
   this.accountService.user.subscribe(x => this.user = x);
      // console.log(this.user);
  }

 
 

}
