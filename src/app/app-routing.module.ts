import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, MaterComponent, HomeComponent, DashboardComponent, NrtDeliveryComponent, NrtScannedComponent, CreateUserComponent, UserListComponent, UserRightsComponent, DynamicSetupsComponent, BusinessRegistrationRequestComponent } from './_components';
import { ConsignmentComponent } from './_components/inventory/consignment/consignment.component';
import { StockInDetailComponent } from './_components/inventory/stock-in-detail/stock-in-detail.component';
import { StockInListComponent } from './_components/inventory/stock-in-list/stock-in-list.component';
import { PermitDetailComponent } from './_components/Issuances/permit-detail/permit-detail.component';
import { PermitListComponent } from './_components/Issuances/permit-list/permit-list.component';
import { PR1Component } from './_components/Issuances/pr1/pr1.component';
import { PosTillComponent } from './_components/pos/pos-till/pos-till.component';

import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'master', component: MaterComponent, 
  children: [
    // { path: '', component:  AComponent },
    { path: 'home', component:  HomeComponent, canActivate: [AuthGuard]  },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'StockInApplication', component: ConsignmentComponent, canActivate: [AuthGuard]  },
    { path: 'pos', component: PosTillComponent, canActivate: [AuthGuard]  },
    { path: 'StockInList', component: StockInListComponent,canActivate: [AuthGuard]   },
    { path: 'StockInDetail', component: StockInDetailComponent,canActivate: [AuthGuard]   },

    { path: 'PermitApplication', component: PR1Component,canActivate: [AuthGuard]   },
    { path: 'PermitList', component: PermitListComponent,canActivate: [AuthGuard]   },
    { path: 'PermitDetail', component: PermitDetailComponent,canActivate: [AuthGuard]   },

     
    
    { path: 'documentsdelivery', component: NrtDeliveryComponent ,canActivate: [AuthGuard]   },
    { path: 'scandocuments', component: NrtScannedComponent ,canActivate: [AuthGuard]   },



    // User Management
    { path: 'addUser', component: CreateUserComponent ,canActivate: [AuthGuard]   },
    { path: 'userlist', component: UserListComponent ,canActivate: [AuthGuard]   },
    { path: 'userrights', component: UserRightsComponent ,canActivate: [AuthGuard]   },

    

    { path: 'setup/OwnerType', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/OwnerTaxGroup', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleBodyConvention', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/OrganizationCategory', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleBodyType', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleCategory', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleClass', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleClassification', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleColor', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleEngineType', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleFuelType', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleMake', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleMaker', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehiclePurchaseType', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleRCStatus', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleScheme', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleStatus', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'setup/VehicleUsage', component: DynamicSetupsComponent ,canActivate: [AuthGuard]   },
    { path: 'administrator/businessreq', component: BusinessRegistrationRequestComponent ,canActivate: [AuthGuard]   },
  


  ]
 },
  //{ path: 'master/home', component: HomeComponent, canActivate: [AuthGuard]  },
  
    // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    // { path: 'account', loadChildren: accountModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
