import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserManagementService } from '../../../_services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/_models/userManagement/UserPersmissions.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};

  userList:UserInfo[]= [];


  dtTrigger: Subject<any> = new Subject<any>(); 
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastrService: ToastrService,
    private UserManagementService:UserManagementService) {
     }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true
    };
    this.getUserList();
  }

  getUserList(){
      this.spinner.show();
      this.UserManagementService.getUsersList().pipe().subscribe(
        result => {
          console.log(result);
          if(result?.status=='0'){
            if(result?.data?.users){
              this.userList = result.data.users;
              // this.dtOptions= result.data.users;
            }
            // this.dtTrigger.next();
            this.spinner.hide();
          }else{
          this.spinner.hide();
          this.toastrService.error(result?.message || "Bad request", 'Error!');
          }},
        error => {
          this.spinner.hide();
          this.toastrService.error(error, 'Error!');
        },
        () => { 
          this.spinner.hide();  
        });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  viewProfileDetail(userId:number){
   console.log(userId);
              //  let returnUrl = ;
    sessionStorage.setItem('UserDetailId', userId.toString());
    this.router.navigateByUrl('/master/userrights');
   }

}
