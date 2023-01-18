import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PR1Service } from 'src/app/_services/PR1/pr1-service';

@Component({
  selector: 'app-permit-detail',
  templateUrl: './permit-detail.component.html',
  styleUrls: ['./permit-detail.component.css']
})
export class PermitDetailComponent implements OnInit {
  Record: any;
  // @Input() ApplicationObj:number | undefined;

  constructor(
    private pr1Services: PR1Service,
  ) {
  }
  ngOnInit(): void {
    this.getById();
  }

  getById()
  {
    let Id = localStorage.getItem("PermitByID");
    this.pr1Services.PRDetailById(Id).subscribe(
      res => {
         this.Record = res.data[0];
      });
    }


}
