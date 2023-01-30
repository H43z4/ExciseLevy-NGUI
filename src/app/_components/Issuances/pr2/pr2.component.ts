import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { WebcamComponent } from '../webcam/webcam.component';

@Component({
  selector: 'app-pr2',
  templateUrl: './pr2.component.html',
  styleUrls: ['./pr2.component.css']
})
export class Pr2Component implements OnInit {

  constructor(
    private fb: FormBuilder,
    public webcam : WebcamComponent,

  ) { }
  PRBasicFromForeign!: FormGroup;
  uploadFile = (files: string | any,appId: string | any) => {
    if (files.length === 0 || appId === "") {
      return;
    }
    let fileToUpload = <File>files;
    const formData = new FormData();
    var fileName = fileToUpload.name +"_"+ appId;
    formData.append('file', fileToUpload, fileName);
    this.pr1Services.UploadPhoto(formData).subscribe(
      res => {
        const imgElement: HTMLImageElement = document.getElementById('myImg') as HTMLImageElement;
        imgElement.src = '';
        if (res.status == '0') {
          this.spinner.hide();
          this.toastrService.success("Your Application ID: " + res.data.applicationId + "", res.message);
          this.PRBasicFromForeign.reset();
        }
      })
  }
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
