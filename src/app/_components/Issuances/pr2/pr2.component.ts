import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pr2',
  templateUrl: './pr2.component.html',
  styleUrls: ['./pr2.component.css']
})
export class Pr2Component implements OnInit {

  constructor(
    private fb: FormBuilder,

  ) { }
  PRBasicFromForeign!: FormGroup;

  ngOnInit(): void {
    this.PRBasicFromForeign = this.fb.group({
      Id: [''],
      OldPermit: new FormControl(''),
      profession: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      residence: new FormControl('', [Validators.required]),
      tResidence: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      fName: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      passportNo: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      VisaExpiaryDate: new FormControl('', [Validators.required]),
      sPName: new FormControl('', [Validators.required]),
      sCName: new FormControl('', [Validators.required]),
      Scnic: new FormControl('', [Validators.required]),
      ntn: new FormControl('', [Validators.required]),

    });
  }
  active = 1;
  activeLocal = 1;
  get TypeControl() {
    return this.PRBasicFromForeign.controls;
  }
}
