import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { PR2 } from 'src/app/_models/Issuances/PR2Model';
import { DropDownService } from 'src/app/_services';
import { PR2Service } from 'src/app/_services/PR1/Pr2-Service';
import { WebcamComponent } from '../webcam/webcam.component';

@Component({
  selector: 'app-pr2',
  templateUrl: './pr2.component.html',
  styleUrls: ['./pr2.component.css']
})
export class Pr2Component implements OnInit {
  Countries: any;
  nationality: any;

Districts: any;
cities: any;
Profession: any;
PRBasicFromForeign!: FormGroup;
PRForeignLocalSponser!: FormGroup;
PRForeignCompanySponser!: FormGroup;
date: any;

ShowOtherProfession: string="";
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private pr2Services: PR2Service,
    
    private toastrService: ToastrService,
    private dropdownService: DropDownService,   
    public webcam : WebcamComponent,

  ) { }
  uploadFile = (files: string | any,appId: string | any) => {
    if (files== null || files.length === 0 || appId === "") {
      this.toastrService.error("Photo is missing!");
      return;
    }
    
    let fileToUpload = <File>files;
    const formData = new FormData();
    var fileName = fileToUpload.name +"_"+ appId;
    formData.append('file', fileToUpload, fileName);
    this.pr2Services.UploadPhoto(formData).subscribe(
      res => {
        let ImD= new ImageData(0,0); 
        this.webcam.webcamImage = new WebcamImage("","",ImD);
        // const imgElement: HTMLImageElement = document.getElementById('myImg') as HTMLImageElement;
        // imgElement.src = '';
        if (res.status == '0') {
          this.spinner.hide();
          this.toastrService.success("Your Application ID: " + res.data.applicationId + "", res.message);
          this.PRBasicFromForeign.reset();
        }
      })
  }
  ngOnInit(): void {
    this.PRForeignLocalSponser = this.fb.group({
      Id: [''],
      Name: new FormControl('', [Validators.required]),
      CNIC: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),

    });
    this.PRForeignCompanySponser = this.fb.group({
      Id: [''],
      CompanyName: new FormControl('', [Validators.required]),
      NTN: new FormControl('', [Validators.required]),
    });
    this.PRBasicFromForeign = this.fb.group({
      Id: [''],
      Name: new FormControl('', [Validators.required]),
      FatherName: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required]),
      PassportNo: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      Nationality: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      DOB: new FormControl('', [Validators.required]),
      Profession: new FormControl('', [Validators.required]),
      OldPermit: new FormControl(''),
      OtherProfession: new FormControl('', [Validators.required]),
      VisaExpiaryDate: new FormControl('', [Validators.required]),
    });

    this.AllProfessions();
    this.AllCountries();
    this.AllNationality();
  }
  active = 1;
  activeLocal = 1;
  get TypeControl() {
    return this.PRBasicFromForeign.controls
  }

  get LSTypeControl()
  {
    return this.PRForeignLocalSponser.controls

  }

  get CSTypeControl()
  {
    return this.PRForeignCompanySponser.controls

  }
  
  dateChanged(newDate: any) {
    const today = new Date();
    this.date = this.PRBasicFromForeign.get('DOB')?.value;
   
    const birthdateAsDate = new Date(this.date);
    const age = today.getFullYear() - birthdateAsDate.getFullYear();
    if (age < 21) {
      this.toastrService.error("Below the age of 21 years is not accepted");
      this.PRBasicFromForeign.get('DOB')?.setValue("");
    } else {
      // this.toastrService.success("Age is not greater than 21");
    }
  }
  ShowHideOtherProfession(event:any) {
    this.ShowOtherProfession = event.target.value;
    if (this.ShowOtherProfession != '0' ) {
      this.PRBasicFromForeign.get('OtherProfession')?.setValue(event.target.options[event.target.selectedIndex].text);
    }else{
      this.PRBasicFromForeign.get('OtherProfession')?.setValue('');
    }
  }

  keyPressAlfhabetsOnly(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  searchPassport() {


    let passport = this.PRBasicFromForeign.get('PassportNo')?.value;

    
    this.pr2Services.SerachCnic(passport).subscribe(
      res => {
        
        if (res.status == '0') {
          this.spinner.hide();
          this.PRBasicFromForeign.reset();
          this.PRForeignLocalSponser.reset();
          this.PRForeignCompanySponser.reset();
          this.toastrService.error("Passport Number already exist!");

        }
        else {
          this.spinner.hide();
          // this.toastrService.error(res.message, 'Error!');
        }
      });
  }
  searchCnic() {


    let CNIC = this.PRForeignLocalSponser.get('CNIC')?.value;

    
    this.pr2Services.SerachCnic(CNIC).subscribe(
      res => {
        
        if (res.status == '0') {
          this.spinner.hide();
          this.PRForeignLocalSponser.reset();
          this.toastrService.error("CNIC already exist!");

        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }
  keyPressAlfhabetnumericOnly(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9 ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  keyPressNumberOnly(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  AllCountries()
  {
    this.dropdownService.GetCountries().subscribe(
      res => {
        if (res.status == '0') {
          this.spinner.hide();
            this.Countries = res.data;
          this.PRBasicFromForeign.reset();
        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }
  AllNationality()
  {
    this.dropdownService.GetNatonality().subscribe(
      res => {
        if (res.status == '0') {
          this.spinner.hide();
            this.nationality = res.data;
          this.PRBasicFromForeign.reset();
        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }

  AllProfessions()
  {
    this.dropdownService.GetProfession().subscribe(
      res => {
        if (res.status == '0') {
          this.spinner.hide();
            this.Profession = res.data;
        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }


  Save() {
    
    let Sponser = 0;
    if (this.webcam.file== null || this.webcam.file.length === 0) {
      this.toastrService.error("Photo is missing!");
      return;
    }
    if (this.activeLocal == 1) {
      if (!this.PRForeignLocalSponser.valid ) {
        this.spinner.hide();
        Sponser = 1;
        this.PRForeignLocalSponser.markAllAsTouched();
        return;
      }
    }
    else{
      if (!this.PRForeignCompanySponser.valid) {
        this.spinner.hide();
        Sponser = 2;
        this.PRForeignCompanySponser.markAllAsTouched();
        return;
      }
    }
    if (!this.PRBasicFromForeign.valid) {
      this.spinner.hide();
      this.PRBasicFromForeign.markAllAsTouched();
      return;
    }
    let Name = this.PRBasicFromForeign.get('Name')?.value;
    let FatherName = this.PRBasicFromForeign.get('FatherName')?.value;
    let Phone = this.PRBasicFromForeign.get('Phone')?.value;
    let PassportNo = this.PRBasicFromForeign.get('PassportNo')?.value;
    let Country = this.PRBasicFromForeign.get('Country')?.value;
    let Nationality = this.PRBasicFromForeign.get('Nationality')?.value;
    let Address = this.PRBasicFromForeign.get('Address')?.value;
    let DOB = this.PRBasicFromForeign.get('DOB')?.value;
    let VisaExpiaryDate = this.PRBasicFromForeign.get('VisaExpiaryDate')?.value;
    let Profession = this.PRBasicFromForeign.get('Profession')?.value;
    let OtherProfession = this.PRBasicFromForeign.get('OtherProfession')?.value;
    let OldPermit = this.PRBasicFromForeign.get('OldPermit')?.value;

    let LSName = this.PRForeignLocalSponser.get('Name')?.value;
    let CNIC = this.PRForeignLocalSponser.get('CNIC')?.value;

    let CompanyName = this.PRForeignCompanySponser.get('CompanyName')?.value;
    let NTN = this.PRForeignCompanySponser.get('NTN')?.value;
        let sp = Sponser;
    let Pr2 = new PR2();
    Pr2.personName= Name
    Pr2.fatherHusbandName= FatherName
    Pr2.cellNo= Phone
    Pr2.passportNo= PassportNo
    Pr2.countryId= Country
    Pr2.nationality= Nationality
    Pr2.address= Address
    Pr2.dateofBirth= DOB
    Pr2.visaExpiryDate= VisaExpiaryDate
    Pr2.professionId= Profession
    Pr2.professionName= OtherProfession
    Pr2.oldPermitNo= OldPermit
    Pr2.sponsorPersonName= LSName
    Pr2.sponsorPersonCNIC= CNIC
    Pr2.sponsorCompanyName= CompanyName
    Pr2.sponsorCompanyNTN= NTN
    Pr2.permitTypeId = 4;
    Pr2.sponsorTypeID=this.activeLocal;
    

    this.pr2Services.PR2Save(Pr2).subscribe(
      res => {
        if (res.status == '0') {
           

          this.spinner.hide();
          this.uploadFile(this.webcam.file,res.data.applicationId);
            this.toastrService.success("Your Application ID: " + res.data.applicationId + "", res.message);
          this.PRForeignCompanySponser.reset();
          this.PRForeignLocalSponser.reset();
          this.PRBasicFromForeign.reset();
        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.message, 'Error!');
        }
      });




    }
}
