import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private accountService: AccountService,
      private router: Router, private userSubject: BehaviorSubject<User>
      ) { }

  ngOnInit(): void {
  }


  logout()
  {
    localStorage.removeItem('user');
        
    this.userSubject.next(undefined!);
    this.router.navigate(['/']);
  }

 
}
