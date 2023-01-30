import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PR1Service } from 'src/app/_services/PR1/pr1-service';

@Component({
  selector: 'app-permit-list',
  templateUrl: './permit-list.component.html',
  styleUrls: ['./permit-list.component.css']
})
export class PermitListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  PRlist: any[] = [];
  constructor(
    private pr1Services: PR1Service,
    private router: Router

  ) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.GetPermitApplicationList();
  }



  SendPRID(Id: any) {
    localStorage.setItem('PermitByID', Id.toString());
    this.router.navigateByUrl('/master/PermitDetail');
  }











  GetPermitApplicationList() {
    this.pr1Services.PRList().subscribe(
      res => {
        debugger;
        this.PRlist = [];
        var Records = res.data;
        for (let index = 0; index < Records.length; index++) {
          this.PRlist.push({
            count: index + 1,
            applicationId: Records[index].applicationId,
            personName: Records[index].personName,
            cnic: Records[index].cnic,
            cellNo: Records[index].cellNo,
            address: Records[index].address,
            city: Records[index].city,
            dateofBirth: Records[index].dateofBirth,
            oldPermitNo: Records[index].oldPermitNo,
            applicationDate: Records[index].createdAt,
            requestTimeLine : Records[index].rowTimeline,
          })
        }

        this.dtTrigger.next(Records);
        // this.RequestTimeLine(this.PRlist);

      });
  }

  RequestTimeLine(PRList: any) {
    debugger



    PRList.forEach((e: { applicationDate: string | number | Date; count: number; }) => {
      const date1 = new Date(e.applicationDate);
         
    const date2 = new Date();

    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const inputField = document.getElementById(`permitListCol_`+(e.count-1)) as HTMLElement;
    debugger
    // inputField.classList.remove("less24","hours24", "hours48", "hours72");
if (diffHours<24) {
  // inputField.classList.add("less24");
}else if (diffHours>24 && diffHours<48) {
  // inputField.classList.add("hours24");
}
else if (diffHours>24 && diffHours>48 && diffHours<72) {
  // inputField.classList.add("hours48");
}else{
  // inputField.classList.add("hours72");
}
    });

 
  }

}

