import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetismenuAngularModule } from "@metismenu/angular";
import { DataTablesModule } from 'angular-datatables';
import { CmnOwnerComponent } from './_components/common/cmn-owner/cmn-owner.component';
import { CmnReadonlyOwnerComponent } from './_components/common/cmn-readonly-owner/cmn-readonly-owner.component';
import { BusinessRegistrationRequestComponent, CreateUserComponent, DashboardComponent, DynamicSetupsComponent, HomeComponent, LoginComponent, MaterComponent, NrtDeliveryComponent, NrtScannedComponent, UserListComponent, UserRightsComponent } from './_components';
import { ConsignmentComponent } from './_components/inventory/consignment/consignment.component';
import { PR1Component } from './_components/Issuances/pr1/pr1.component';
import { PosTillComponent } from './_components/pos/pos-till/pos-till.component';
import { PermitListComponent } from './_components/Issuances/permit-list/permit-list.component';
import { PermitDetailComponent } from './_components/Issuances/permit-detail/permit-detail.component';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { HeaderComponent } from './_components/header/header.component';
import { StockInListComponent } from './_components/inventory/stock-in-list/stock-in-list.component';
import { StockInDetailComponent } from './_components/inventory/stock-in-detail/stock-in-detail.component';
import { Pr2Component } from './_components/Issuances/pr2/pr2.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamComponent } from './_components/Issuances/webcam/webcam.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    MaterComponent,
    DynamicSetupsComponent,
    NrtDeliveryComponent,
    NrtScannedComponent,
    CreateUserComponent,
    UserListComponent,
    UserRightsComponent,
    CmnOwnerComponent,
    CmnReadonlyOwnerComponent,
    BusinessRegistrationRequestComponent,
    ConsignmentComponent,
    PR1Component,
    PosTillComponent,
    PermitListComponent,
    PermitDetailComponent,
    SidebarComponent,
    HeaderComponent,
    StockInListComponent,
    StockInDetailComponent,
    Pr2Component,
    WebcamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgSelectModule ,
    NgbModule,
    MetismenuAngularModule,
    NgxTrimDirectiveModule,
    WebcamModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
    // timeOut: 5000, // 5 seconds
    // closeButton: true,
    // progressBar: true,
  }),
    HttpClientModule
  ],
  providers: [
      WebcamComponent,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
