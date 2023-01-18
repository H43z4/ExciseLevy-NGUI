import { Component, OnInit,Input } from '@angular/core';
import { Owner } from 'src/app/_models/userManagement/UserPersmissions.model';
@Component({
  selector: 'app-cmn-readonly-owner',
  templateUrl: './cmn-readonly-owner.component.html',
  styleUrls: ['./cmn-readonly-owner.component.css']
})
export class CmnReadonlyOwnerComponent implements OnInit {
  @Input() owner:Owner= new Owner();
  constructor() { }

  ngOnInit(): void {
  }

}
