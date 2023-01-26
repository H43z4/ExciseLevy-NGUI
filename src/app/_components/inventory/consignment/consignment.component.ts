import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConsignmentModel } from 'src/app/_models/inventory/consignment.model';
import { InventoryServiceService } from 'src/app/_services/inventory/inventory-service.service';
import { ItemLiq } from 'src/app/_models/inventory/item.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { DropDownService } from 'src/app/_services';

@Component({
  selector: 'app-consignment',
  templateUrl: './consignment.component.html',
  styleUrls: ['./consignment.component.css']
})
export class ConsignmentComponent implements OnInit {
  liqList: any[] = [];
  count = 0;
  items: { key: string, value: string }[] = [
    { key: '1', value: 'Beer Mixed' },
    { key: '2', value: 'Silver Whisky' },
    { key: '3', value: 'Gold Whisky' },
    { key: '4', value: 'Platinum Whisky' },
    { key: '5', value: 'MD 1 Whisky' }

  ];
  Uints = [
    { value: '1', label: 'Quarts', measure: 750, leviAmount: 600 },
    { value: '2', label: 'Pints', measure: 375, leviAmount: 500 },
    { value: '3', label: 'Nips', measure: 187.5, leviAmount: 400 },
    { value: '4', label: 'Beer', measure: 500, leviAmount: 300 },

  ];
  manufacturers: any;
  results: { key: string, value: string }[] = [];
  displayValue: string = '';
  selectedValue: string = '';
  uom: string = "";
  quantity: string = "";
  bulkValue: string = '';
  proofValue: string = '';
  LeviedValue: string = '';
  maxiValue: boolean = false;
  leviedAmt: bigint = BigInt(0);
  leviAmount: number | 0 | undefined;
  itemLevied: string | undefined;
  loggedinUser: any = [];
  constructor(private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private InventoryService: InventoryServiceService,
    private router: Router,
    private dropdownService: DropDownService,
  ) { }

  ngOnInit(): void {
    var user = localStorage?.getItem('user');
    if (user != null && user != "") {
      this.loggedinUser = JSON.parse(user);
      debugger;
      var fullName = this.loggedinUser?.data.fullName;
      var orgName = this.loggedinUser?.data.organizationName;
      this.Consignmentform.get('collector')?.setValue(fullName);
      const titleOffice = document.getElementById('titleOffice');
      if (titleOffice)
        titleOffice.innerText = orgName;

    }
    this.ddlManufacturers();
    this.ddlProducUnits();
    this.ddlProducts();
  }
  ddlProducts() {
    this.dropdownService.GetProducts().subscribe(
      res => {
        if (res.status == '0') {
          this.spinner.hide();
          this.items = res.data;
        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }
  ddlProducUnits() {
    this.dropdownService.GetProductUnits().subscribe(
      res => {
        if (res.status == '0') {
          this.spinner.hide();
          this.Uints = res.data;
        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }
  ddlManufacturers() {
    this.dropdownService.GetManufacturers().subscribe(
      res => {
        if (res.status == '0') {
          this.spinner.hide();
          this.manufacturers = res.data;
        }
        else {
          this.spinner.hide();
          this.toastrService.error(res.message, 'Error!');
        }
      });
  }
  maxValue(control: FormControl) {
    const max = 100;
    const value = control.value;
    if (value > max) {
      return { maxValue: true };
    }
    return null;
  }
  Consignmentform = new FormGroup({

    excisePass: new FormControl('', [Validators.required]),
    dated: new FormControl('', [Validators.required]),
    exportNo: new FormControl('', [Validators.required]),
    consignmentFrom: new FormControl('', [Validators.required]),
    permitNo: new FormControl('', [Validators.required]),
    collector: new FormControl('', [Validators.required]),
    passvalidity: new FormControl('', [Validators.required]),
    vehicleNo: new FormControl('', [Validators.required]),
    driver: new FormControl(''),

    duty: new FormControl(''),
    dutyLevied: new FormControl(''),
    cHNoDate: new FormControl('', [Validators.required]),
    remarks: new FormControl('', [Validators.required]),
  });
  Liquorform = new FormGroup({

    itemDescription: new FormControl('', [Validators.required]),
    uom: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    bulkGallons: new FormControl(''),
    strength: new FormControl('', [Validators.required, this.maxValue]),
    proofGallons: new FormControl(''),
    breakage: new FormControl('', [Validators.required])
  });

  get f() {
    return this.Consignmentform.controls;
  }
  get l() {
    return this.Liquorform.controls;
  }
  search() {
    if (this.displayValue.trim().length === 0) {
      this.results = [];
    } else {
      this.results = this.items.filter(item => item.value.toLowerCase().includes(this.displayValue.toLowerCase()));
    }
  }
  ValidateProduct() {
    let itemDescription = this.Liquorform.get('itemDescription')?.value;
    debugger
    if (this.items.filter(item => item.value.toLowerCase() == itemDescription.toLowerCase())) {
      this.displayValue = "";
    }
  }
  select(result: { key: string, value: string }) {
    this.displayValue = result.value;
    this.selectedValue = result.key;
    this.results = [];
  }
  populateValue() {
    debugger
    if (this.Liquorform.invalid) {
      this.Liquorform.markAllAsTouched();

      //this.liqList = [];
      return;
    }
    this.spinner.show()
    let product = this.selectedValue;
    let itemDescription = this.Liquorform.get('itemDescription')?.value;
    this.uom = this.Liquorform.get('uom')?.value;
    this.quantity = this.Liquorform.get('quantity')?.value;
    let bulkGallons = this.Liquorform.get('bulkGallons')?.value;
    let strength = this.Liquorform.get('strength')?.value;
    let proofGallons = this.Liquorform.get('proofGallons')?.value;
    let breakage = this.Liquorform.get('breakage')?.value;
    let dutyRate = this.Consignmentform.get('duty')?.value;
    this.count++;

    this.liqList.push({
      srNo: this.count,
      productId: product,
      itemDescription: itemDescription,
      quarts: this.uom == "1" ? this.quantity : '0',
      pints: this.uom == "2" ? this.quantity : '0',
      nips: this.uom == "3" ? this.quantity : '0',
      beer: this.uom == "4" ? this.quantity : '0',
      bottleSizeId: this.uom,
      quantity: this.quantity,
      bulkGallons: bulkGallons != "" ? bulkGallons : '0',
      strenghtPercentage: strength != "" ? strength : '0',
      proofGallons: proofGallons != "" ? proofGallons : '0',
      breakage: breakage,
    })
    debugger;
    if (dutyRate.includes('.')) { let strDutyRate = dutyRate.toString(); dutyRate = strDutyRate.split('.', 2)[0] }
    debugger

    let Type = this.Liquorform.get('uom')?.value;
    debugger

    this.leviAmount = this.Uints.find(a => a.value == Type)?.leviAmount;

    if (this.leviAmount == undefined) {

    }
    else {
      debugger
      // let prG = BigInt(proofGallons);
      this.itemLevied = (this.leviAmount * proofGallons)?.toString();
      this.leviedAmt = BigInt(this.leviedAmt) + BigInt(this.itemLevied);

    }
    debugger


    this.Consignmentform.patchValue({ dutyLevied: this.leviedAmt });
    this.Consignmentform.patchValue({ duty: '' });

    this.Liquorform.reset();
    this.spinner.hide()
  }
  Save() {
    this.spinner.show();
    if (!this.Consignmentform.valid) {
      this.spinner.hide();
      this.Consignmentform.markAllAsTouched();
      return;
    }
    let consignmentObj = new ConsignmentModel();
    consignmentObj.stockInApplicationId = '0';
    consignmentObj.excisePassNo = this.Consignmentform.getRawValue().excisePass;
    consignmentObj.requestDate = this.Consignmentform.getRawValue().dated;
    consignmentObj.transportExportNo = this.Consignmentform.getRawValue().exportNo;
    consignmentObj.consignmentFromId = this.Consignmentform.getRawValue().consignmentFrom;
    consignmentObj.permitNo = this.Consignmentform.getRawValue().permitNo;
    consignmentObj.signedByCollector = this.Consignmentform.getRawValue().collector;
    consignmentObj.passValidity = this.Consignmentform.getRawValue().passvalidity;
    consignmentObj.vehicleRegistrationNo = this.Consignmentform.getRawValue().vehicleNo;
    consignmentObj.driverName = this.Consignmentform.getRawValue().driver;
    consignmentObj.rateOfDauty = '0';//this.Consignmentform.getRawValue().duty;
    consignmentObj.amountOfDautyLevied = (this.Consignmentform.getRawValue().dutyLevied).toString();
    consignmentObj.chNoDate = this.Consignmentform.getRawValue().cHNoDate;
    consignmentObj.remarks = this.Consignmentform.getRawValue().remarks;
    consignmentObj.items = this.liqList;
    this.InventoryService.saveCreateConsignment(consignmentObj).subscribe(
      result => {

        if (result?.status == '0') {
          this.spinner.hide();
          this.toastrService.success('Consignment created successfully!', 'Success!');
          // this.router.navigateByUrl('master/applist');
          this.Liquorform.reset();
          this.Consignmentform.reset();
          this.liqList = [];


        } else {
          this.spinner.hide();
          this.toastrService.error(result.message, 'Error!');
        }
      },
      error => {
        this.spinner.hide();
        this.toastrService.error(error, 'Error!');
      }, () => {
        this.spinner.hide();
      });
  }
  CalculateValues() {
    this.uom = this.Liquorform.get('uom')?.value;
    this.quantity = this.Liquorform.get('quantity')?.value;

    if ((this.uom != null && this.uom.trim() != "") && (this.quantity != null && parseInt(this.quantity) > 0)) {
      let BG = this.uom == "1" ? (((parseFloat(this.quantity) * 12) * 750) / 4500).toString() : this.uom == "2" ? (((parseFloat(this.quantity) * 12) * 375) / 4500).toString() : this.uom == "3" ? (((parseFloat(this.quantity) * 12) * 187.5) / 4500).toString() : this.uom == "4" ? (((parseFloat(this.quantity) * 12) * 500) / 4500).toString() : '0';
      let rBG = (Math.round(parseFloat(BG))).toString();
      this.bulkValue = rBG;
      this.Liquorform.patchValue({ strength: '' });
    }
    else {
      this.bulkValue = '0';
    }
  }
  CalculateProofGallons() {
    let bulkGallons = this.Liquorform.get('bulkGallons')?.value;
    let strength = this.Liquorform.get('strength')?.value;
    debugger;
    if ((strength != null && parseFloat(strength) > 0) && (bulkGallons != null && parseInt(bulkGallons) > 0)) {
      let PG = ((bulkGallons * strength) / 100).toString();
      let rPG = Math.round(parseFloat(PG)).toString();
      this.Liquorform.get('proofGallons')?.setValue(rPG);
      // this.proofValue = PG;     
      debugger;
      let Type = this.Liquorform.get('uom')?.value;

      let leviAmount = this.Uints.find(a => a.value == Type)?.leviAmount;
      if (leviAmount !== undefined) {
        // let itemLevied =  (measure*parseFloat(PG))?.toString() ;  
        let itemLevied = leviAmount?.toString();
        this.Consignmentform.get('duty')?.setValue(itemLevied);
        // this.Consignmentform.setValue({duty});   
      }
    }
    else {
      this.Liquorform.get('proofGallons')?.setValue('0');

      // this.proofValue = '0';

    }
  }
  CalculateDutyLevied() {

    let proofGallons = this.Liquorform.get('proofGallons')?.value;
    let duty = this.Consignmentform.get('duty')?.value;
    debugger;
    if ((duty != null && parseFloat(duty) > 0) && (proofGallons != null && parseInt(proofGallons) > 0)) {
      let DL = (proofGallons * duty).toString();
      this.LeviedValue = DL;
    }
    else {
      this.LeviedValue = '0';
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
  keyPressAlfhabetsOnly(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z ]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
