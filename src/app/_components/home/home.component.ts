import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user.model';
import MetisMenu from 'metismenujs';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {

  }
   

}
