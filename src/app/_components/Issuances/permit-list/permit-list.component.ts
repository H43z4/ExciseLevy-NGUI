import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PR1Service } from 'src/app/_services/PR1/pr1-service';

@Component({
  selector: 'app-permit-list',
  templateUrl: './permit-list.component.html',
  styleUrls: ['./permit-list.component.css']
})
export class PermitListComponent implements OnInit {
  PRlist: any[] = [];  
  constructor(
    private pr1Services: PR1Service,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.GetPermitApplicationList();
  }



  SendPRID(Id : any)
  {
    localStorage.setItem('PermitByID', Id.toString());
    this.router.navigateByUrl('/master/PermitDetail');
  }

 

 






  
  GetPermitApplicationList()
  {
    this.pr1Services.PRList().subscribe(
      res => {
        this.PRlist= [];
        var Records = res.data;
        debugger
        for (let index = 0; index < Records.length; index++) {
          this.PRlist.push({
            
            applicationId: Records[index].applicationId,
            personName: Records[index].personName,
            cnic: Records[index].cnic,
            cellNo: Records[index].cellNo,
            address: Records[index].address,
            city: Records[index].city,
            dateofBirth: Records[index].dateofBirth,
            oldPermitNo: Records[index].oldPermitNo,
          })
        }
    

    
        // if (res.status == '0') {
        //   this.spinner.hide();
        // }
        // else {
        //   this.spinner.hide();
        // }
      });
    }

}
