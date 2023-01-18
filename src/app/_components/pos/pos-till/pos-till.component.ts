import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { SharedService } from 'src/app/_services';
import { InventoryServiceService } from 'src/app/_services/inventory/inventory-service.service';
@Component({
  selector: 'app-pos-till',
  templateUrl: './pos-till.component.html',
  styleUrls: ['./pos-till.component.css']
})
export class PosTillComponent implements OnInit {
  items: { key: string, value: string }[] = [
    { key: '1', value: 'Silver Whisky' },
    { key: '2', value: 'Gold Whisky' },
    { key: '3', value: 'Lava Kinoo' },
    { key: '4', value: 'Lava Lemon' },
    { key: '5', value: 'MD 1 Whisky' }
  ];

  Size: { key: string, value: string }[] = [
    { key: '1', value: 'Quarts' },
    { key: '2', value: 'Pints' },
    { key: '3', value: 'Nips' },
    { key: '4', value: 'Beer' },
  ];


  results: { key: string, value: string }[] = [];
  displayValue: string = '';
  selectedValue: string = '';
  personData: any[] = [];
  liqList: any[] = [];
  QtyTotal: number = 0;
  TotalPriceTotal: number = 0;
  personId: any;
  GrandTotal: number | undefined;
  constructor(private spinner: NgxSpinnerService,
    private SharedService: SharedService,
    private Inventry: InventoryServiceService,
    private toastrService: ToastrService,


  ) { }

  ngOnInit(): void {
  }
  POSInvoiceform = new FormGroup({

    Tax: new FormControl(''),
    Discout: new FormControl(0),

  });


  PersonForm = new FormGroup({

    passportCNIC: new FormControl('', [Validators.required]),
    // itemDescription: new FormControl('', [Validators.required]),
    // quantity: new FormControl('', [Validators.required]),
    // bulkGallons: new FormControl('', [Validators.required]),
    // strength: new FormControl('', [Validators.required]),
    // proofGallons: new FormControl('', [Validators.required]),
    // breakage: new FormControl('', [Validators.required])
  });

  get f() {
    return this.PersonForm.controls;
  }
  POSform = new FormGroup({

    ProductName: new FormControl('', [Validators.required]),
    qtyBox: new FormControl('', [Validators.required]),
    ProdSize: new FormControl('', [Validators.required]),
    ProdPrice: new FormControl('', [Validators.required]),
    // strength: new FormControl('', [Validators.required]),
    // proofGallons: new FormControl('', [Validators.required]),
    // breakage: new FormControl('', [Validators.required])
  });

  get l() {
    return this.POSform.controls;
  }
  search() {
    if (this.displayValue.trim().length === 0) {
      this.results = [];
    } else {
      this.results = this.items.filter(item => item.value.toLowerCase().includes(this.displayValue.toLowerCase()));
    }
  }
  ValidateProduct() {
    debugger
    if (this.selectedValue == null || this.selectedValue.trim() == "") {
      this.displayValue = '';
    }
  }
  select(result: { key: string, value: string }) {
    this.displayValue = result.value;
    this.selectedValue = result.key;
    this.results = [];
  }
  fetchPerson() {


    if (!this.PersonForm.valid) {
      this.spinner.hide();
      this.PersonForm.markAllAsTouched();
      return;
    }
    this.spinner.show();
    let cnic = this.PersonForm.get('passportCNIC')?.value;
    this.SharedService.FetchPersonWithCnic(cnic).pipe(first()).subscribe(
      res => {
        debugger;
        if (res.data) {
          this.personData = [];
          var Records = res.data;
          debugger
          for (let index = 0; index < Records.length; index++) {
            this.personData.push({

              personId: index + 1,
              personName: Records[index].personName,
              cNIC_PASSPORT: Records[index].cniC_PASSPORT,
              cellNo: Records[index].cellNo,
              address: Records[index].address,
              city: Records[index].city,
              dateofBirth: Records[index].dateofBirth,
              visaExpiryDate: Records[index].visaExpiryDate,
              age: Records[index].age,
            })
            this.personId = Records[index].personId;
          }
        }
        this.spinner.hide();
      });
  }
  decrementQty() {

  }
  incrementQty() {
    debugger;
    var val = this.POSform.get('qtyBox')?.value;
    let newVal = val++;
    this.POSform.get('qtyBox')?.setValue(newVal);
  }
  AddData() {


    if (!this.POSform.valid) {
      this.spinner.hide();
      this.POSform.markAllAsTouched();
      return;
    }



    this.QtyTotal = 0;
    this.TotalPriceTotal = 0;
    var qtyBox = this.POSform.get('qtyBox')?.value;
    var ProdSize = this.POSform.get('ProdSize')?.value;
    var ProdPrice = this.POSform.get('ProdPrice')?.value;
    var ProductName = this.POSform.get('ProductName')?.value;



    this.liqList.push({
      Quantity: qtyBox,
      ProdSize: this.Size.find(a => a.key == ProdSize)?.value, //ProdSize,
      ProductSize: this.Size.find(a => a.key == ProdSize)?.key, //ProdSize,
      ProductPrice: ProdPrice,
      ProductName: ProductName,
      TotalPrice: ProdPrice * qtyBox,
    })
    var aaa = this.liqList
    aaa.forEach(e => {
      this.QtyTotal = this.QtyTotal + e.Quantity;
      this.TotalPriceTotal = this.TotalPriceTotal + e.TotalPrice;
    });

    this.POSform.reset();

  }

  keyPressNumberOnly(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  resetdata() {
    this.POSform.reset();
  }

  TaxDiscout() {
    var Tax = this.POSInvoiceform.get('Tax')?.value;
    var Discout = this.POSInvoiceform.get('Discout')?.value;
    debugger
    var TP = this.TotalPriceTotal;
    var wt = 0;
    var dd = 0;
    if (Tax !== null || Tax !== "") {
      wt = (Tax * TP) / 100;
    }
    // if (Discout !== 0) {
    //    dd = (TP - Discout);
    // }
    // var aa = TP-dd;
    this.GrandTotal = (TP + wt);


  }
  SubmitData() {

    // if (!this.POSform.valid) {
    //   this.spinner.hide();
    //   this.POSform.markAllAsTouched();
    //   return;
    // }
    var productId = this.POSform.get('ProductName')?.value;
    var qtyBox = this.POSform.get('qtyBox')?.value;
    var ProdSize = this.POSform.get('ProdSize')?.value;
    var ProdPrice = this.POSform.get('ProdPrice')?.value;
    if (this.liqList.length>0) {
      const Key = {
        personID: this.personId,
        productId: productId,
        TotalAmount: this.TotalPriceTotal,
        TotalQuantity: this.QtyTotal,
        OrderDetail: this.liqList
      }
      this.Inventry.savePOS(Key).subscribe(
        res => {
          // debugger
          if (res.status == '0') {
            this.spinner.hide();
            this.toastrService.success('Your Application Save successfully!', 'Success!');
            this.POSform.reset();
            this.PersonForm.reset();
            this.liqList=[];
            this.personData=[];
            this.QtyTotal=0;
            this.TotalPriceTotal=0;
          } 
          else {
            // this.spinner.hide();
            this.toastrService.error(res.message, 'Error!');
            // this.PRBasicFromForeign.reset();
            // this.toastrService.error(res.message, 'Error!');
          }
        });

    }
  }
}
