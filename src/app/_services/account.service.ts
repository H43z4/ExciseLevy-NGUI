import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, userRoutes } from '../_models';
import { Weather } from '../_models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public isCollapsed = false;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')|| "null"));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

     //return this.http.post<User>(`${environment.apiUrl}/Auth/Login`, { username, password })
     //return this.http.post<User>(`http://10.50.126.65:5010/api/Auth/Login`, { username, password })
     
    login(username:string, password:string) {
        return this.http.post<User>(`${environment.apiUrlsample}/Auth/Login`, { username, password })
            .pipe(map(user => {
                debugger
                console.log(user);
                user.Routes=[
                    // {icon:"", routename: "Home", routesadd: "home",subMenuList: [] },
                    // {icon:"", routename: "Dashboard", routesadd: "dashboard" ,subMenuList: []},
                    {icon:"New_Registration.svg", routename: "New Registration", routesadd: "ownerdetail" ,subMenuList: [
                        // { routename: "Owner Detail", routesadd: "ownerdetail" },
                        // { routename: "Keeper", routesadd: "Keeper" },
                        // { routename: "HPA", routesadd: "HPA" },
                        // { routename: "Vehicle Detail", routesadd: "vehicledetail" },
                        // { routename: "Purchase Info", routesadd: "Purchaser" },
                        // { routename: "Remarks", routesadd: "Remarks" },
                        // { routename: "Documents Required", routesadd: "DocumentsRequired" },
                        // { routename: "Assessment", routesadd: "Assessment" }

                    ]},



                    {icon:"New_RegistrationTransfer.svg", routename: "New Registration Transfer", routesadd: "nrt/seller" ,subMenuList: [
                        // { routename: "Seller", routesadd: "nrt/seller" },
                        // { routename: "Seller hpa", routesadd: "nrt/seller/hpa" },
                        // { routename: "Seller keeper", routesadd: "nrt/seller/keeper" },
                        // { routename: "Vehicle", routesadd: "nrt/vehicle" },
                        // { routename: "Purchase Detail", routesadd: "nrt/purchasedetail" },
                        // { routename: "Owner", routesadd: "nrt/owner" },
                        // { routename: "Owner hpa", routesadd: "nrt/owner/hpa" },
                        // { routename: "Owner Keeper", routesadd: "nrt/owner/keeper" }, 
                        // { routename: "Remarks", routesadd: "nrt/remarks" },
                        // { routename: "Documents", routesadd: "nrt/documents" },
                        // { routename: "Assessment", routesadd: "nrt/assessment" }

                    ]},

                    {icon:"TransferofOwnership.svg", routename: "Transfer of Ownership", routesadd: "to/vehicle" ,subMenuList: [
                        // { routename: "Vehicle", routesadd: "to/vehicle" },
                        // { routename: "Owner", routesadd: "to/owner" },
                        // { routename: "HPA", routesadd: "to/hpa" },
                        // { routename: "Keeper", routesadd: "to/keeper" },
                        // { routename: "Remarks", routesadd: "to/remarks" },
                        // { routename: "Assessment", routesadd: "to/assessment" }

                    ]},

                    // {icon:"7.svg", routename: "TO Review", routesadd: "review/to/vehicle" ,subMenuList: [
                    //     // { routename: "Vehicle", routesadd: "review/to/vehicle" },
                    //     // { routename: "Owner", routesadd: "review/to/owner" },
                    //     // { routename: "HPA", routesadd: "review/to/hpa" },
                    //     // { routename: "Keeper", routesadd: "review/to/keeper" },
                    //     // { routename: "Remarks", routesadd: "review/to/remarks" },
                    //      { routename: "Assessment", routesadd: "review/to/assessment" }

                    // ]},

                    {icon:"Series_Assignment.svg", routename: "Tax Update", routesadd: "taxUpdate",subMenuList: [
                    ] },


                    {icon:"NRTC.svg", routename: "NRTC", routesadd: "nrtc/batchcreation" ,subMenuList: [
                         { routename: "Create Batch", routesadd: "nrtc/batchcreation" },
                        { routename: "Batch List", routesadd: "nrtc/batchlist" },
                        //{ routename: "Batch Detail", routesadd: "nrtc/batchdetail" },
                        { routename: "Vehicle Status", routesadd: "nrtc/vehicledetail" }
                    ]},

                    {icon:"User_Management.svg", routename: "User Management", routesadd: "addUser" ,subMenuList: [
                        { routename: "Create User", routesadd: "addUser" },
                       { routename: "User List", routesadd: "userlist" },
                       { routename: "User Rights", routesadd: "userrights" }
                   ]},

                // {icon:"4.svg", routename: "Tax Exemption", routesadd: "taxExemption" ,subMenuList: [

                //     ]},

                    // {icon:"2.svg", routename: "Tax Exemption Review", routesadd: "taxExemptionReview" ,subMenuList: [

                    // ]},

                    // {icon:"5.svg", routename: "Token Tax", routesadd: "tokentax" ,subMenuList: [

                    // ]},
                    

                    // {icon:"4.svg", routename: "NRT Review", routesadd: "review/nrt/seller" ,subMenuList: [
                    //     //  { routename: "Seller", routesadd: "review/nrt/seller" },
                    //     //  { routename: "Vehicle", routesadd: "review/nrt/vehicle" },
                    //     //  { routename: "Purchase Detail", routesadd: "review/nrt/purchasedetail" },
                    //     //  { routename: "Owner", routesadd: "review/nrt/owner" },
                    //     //  { routename: "HPA", routesadd: "review/nrt/owner/hpa" },
                    //     //  { routename: "Keeper", routesadd: "review/nrt/owner/keeper" }, 
                    //     //  { routename: "Remarks", routesadd: "review/nrt/remarks" },
                    //     //  { routename: "Documents", routesadd: "review/nrt/documents" },
                    //     //  { routename: "Assessment", routesadd: "review/nrt/assessment" }

                    // ]},

                    // {icon:"", routename: "Review", routesadd: "review/owner" ,subMenuList: [
                    //     { routename: "Owner", routesadd: "review/owner" },
                    //     { routename: "Keeper", routesadd: "review/keeper" },
                    //     { routename: "HPA", routesadd: "review/hpa" },
                    //     { routename: "Vehicle", routesadd: "review/vehicle" },
                    //     { routename: "Purchase Info", routesadd: "review/purchase" },
                    //     { routename: "Remarks", routesadd: "review/remarks" },
                    //     { routename: "Documents", routesadd: "review/documents" },
                    //     { routename: "Assessment", routesadd: "review/assessment" },
                    // ]},
                    // {icon:"", routename: "Read Only Owner", routesadd: "ReadOnlyOwner" ,subMenuList: []},
                    // {icon:"", routename: "Read Only Vehicle", routesadd: "ReadOnlyVehicle" ,subMenuList: []},
                    // {icon:"", routename: "Read Only Purchase Info", routesadd: "ReadOnlyPurchaseInfo" ,subMenuList: []},
                    // {icon:"", routename: "Read Only HPA", routesadd: "ReadOnlyHPA" ,subMenuList: []},

              
                    // {icon:"", routename: "Keeper", routesadd: "Keeper" ,subMenuList: []},   
                    // {icon:"", routename: "HPA", routesadd: "HPA" ,subMenuList: []},
                    // {icon:"", routename: "Vehicle Detail", routesadd: "vehicledetail",subMenuList: [] },
                    // {icon:"", routename: "Dealer", routesadd: "Purchaser",subMenuList: [] },
                    // {icon:"", routename: "Remarks", routesadd: "Remarks",subMenuList: [] },
                    // {icon:"", routename: "Documents Required", routesadd: "DocumentsRequired",subMenuList: [] },
                    // {icon:"", routename: "Assessment", routesadd: "Assessment",subMenuList: [] },
                    //{icon:"", routename: "setup", routesadd: "setup",subMenuList: [] },
                    {icon:"Scan_Document.svg", routename: "Scan Document", routesadd: "scandocuments",subMenuList: [
                        // { routename: "Remarks", routesadd: "review/remarks" }
                    ] },

                    {icon:"Series_Assignment.svg", routename: "Series Assignment", routesadd: "scheduleseries",subMenuList: [
                        //{ routename: "Series Assignment", routesadd: "seriesassignment" },
                        { routename: "Schedule Series", routesadd: "scheduleseries" },
                        { routename: "Series Activation", routesadd: "seriesactivation" }
                    ] },


                    {icon:"Documents_Delivery.svg", routename: "Documents Delivery", routesadd: "documentsdelivery",subMenuList: [
                        // { routename: "Remarks", routesadd: "review/remarks" }
                    ] },

                    {icon:"My_Applications2.svg", routename: "My Applications", routesadd: "applist",subMenuList: [
                        // { routename: "Remarks", routesadd: "review/remarks" }
                    ] },


                    {icon:"Registration_Requests.svg", routename: "Registration Requests", routesadd: "administrator/businessreq",subMenuList: []}
                    
                     ,

                    {icon:"4.svg", routename: "Administration", routesadd: "",subMenuList: [
                        
                        { routename: "Token Tax", routesadd: "tokentax" },
                        { routename: "Tax Exemption", routesadd: "taxExemption" },
                        { routename: "TCNT", routesadd: "tcnt" }

                        // { routename: "Owner Type", routesadd: "setup/OwnerType" },
                        // { routename: "Owner Tax Group", routesadd: "setup/OwnerTaxGroup" },
                        // { routename: "Vehicle Body Convention", routesadd: "setup/VehicleBodyConvention" },
                        // { routename: "Organization Category", routesadd: "setup/OrganizationCategory" },
                        // { routename: "Vehicle Body Type", routesadd: "setup/VehicleBodyType" },
                        // { routename: "Vehicle Category", routesadd: "setup/VehicleCategory" },
                        // { routename: "Vehicle Class", routesadd: "setup/VehicleClass" },
                        // { routename: "Vehicle Classification", routesadd: "setup/VehicleClassification" },
                        // { routename: "Vehicle Color", routesadd: "setup/VehicleColor" },
                        // { routename: "Vehicle Engine Type", routesadd: "setup/VehicleEngineType" },
                        // { routename: "Vehicle Fuel Type", routesadd: "setup/VehicleFuelType" },
                        // { routename: "Vehicle Make", routesadd: "setup/VehicleMake" },
                        // { routename: "Vehicle Maker", routesadd: "setup/VehicleMaker" },
                        // { routename: "Vehicle Purchase Type", routesadd: "setup/VehiclePurchaseType" },
                        // { routename: "Vehicle RC Status", routesadd: "setup/VehicleRCStatus" },
                        // { routename: "Vehicle Scheme", routesadd: "setup/VehicleScheme" },
                        // { routename: "Vehicle Status", routesadd: "setup/VehicleStatus" },
                        // { routename: "Vehicle Usage", routesadd: "setup/VehicleUsage" }
                    ] }
                   
                
                
                ];
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }
            )
            
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        
        this.userSubject.next(undefined!);
        this.router.navigate(['/']);
    }

   

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getweathers() {
        return this.http.get<Weather[]>(`${environment.apiUrl}/weatherforecast`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getPageTitle(url: string) {
        let pageTitle=[
            {Title: "NR / Owner Information", url: "/master/ownerdetail" },
            {Title: "NR / Keeper", url: "/master/Keeper" },
           
        
        
        ];

        let desiredObject = pageTitle.find(element => element.url === url);
        return desiredObject?.Title;
    }

    // update(id:string, params:any) {
    //     return this.http.put(`${environment.apiUrl}/users/${id}`, params)
    //         .pipe(map(x => {
    //             // update stored user if the logged in user updated their own record
    //             if (id == this.userValue.id) {
    //                 // update local storage
    //                 const user = { ...this.userValue, ...params };
    //                 localStorage.setItem('user', JSON.stringify(user));

    //                 // publish updated user to subscribers
    //                 this.userSubject.next(user);
    //             }
    //             return x;
    //         }));
    // }

    // delete(id: string) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id == this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}
