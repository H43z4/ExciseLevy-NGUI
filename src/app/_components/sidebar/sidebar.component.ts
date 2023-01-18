import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
    this.getRole();
  }


  getRole()
  {
     this.role = localStorage.getItem("role");

  }
}
