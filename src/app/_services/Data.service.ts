import { Injectable } from '@angular/core';
import { dropDownList,dropDownListMake} from '../_models';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private NRapplicationId:number=0;
  private NRTapplicationId:number=0;
  private TOapplicationId:number=0;

  private currentPage?:string;
    
  //Owners drop downs
    private ownerTypes:dropDownList[]=[];
    private countries:dropDownList[]=[];
    private districts:dropDownList[]= [];
    private businessSector:dropDownList[]=[];
    private businessStatus:dropDownList[]=[];
    private businessType:dropDownList[]=[];


  // vehicle dropdowns
  private vehicleBodyConvention:dropDownList[]=[];
  private vehicleBodyType:dropDownList[]=[];
  private vehicleCategory:dropDownList[]=[];
  private vehicleClassification:dropDownList[]=[];
  private vehicleColor:dropDownList[]=[];
  private vehicleEngineType:dropDownList[]=[];
  private vehicleFuelType:dropDownList[]=[];
  private vehicleMake:dropDownListMake[]=[];
  private vehicleMaker:dropDownList[]=[];
  private vehiclePurchaseType:dropDownList[]=[];
  private vehicleRCStatus:dropDownList[]=[];
  private vehicleScheme:dropDownList[]=[];
  private vehicleStatus:dropDownList[]=[];
  private vehicleUsage:dropDownList[]=[];
  private vehicleType:dropDownList[]=[];

  
//purchase info
private banks:dropDownList[]=[];
private clearingAgents:dropDownList[]=[];
private customCollectorates:dropDownList[]=[];
private vehicleSchemes:dropDownList[]=[];
private dealers:dropDownList[]=[];
private ports:dropDownList[]=[];


getcurrentPage(){
  return this.currentPage;
}

setcurrentPage(page:string=""){
  return this.currentPage;
}

getNRApplicationId() {
  return this.NRapplicationId;
}

getNRTApplicationId() {
  return this.NRTapplicationId;
}

getTOApplicationId() {
  return this.TOapplicationId;
}

  // shared geters
getDistricts() {
    return this.districts;
  }
getCountries() {
    return this.countries;
  }
//Owners geter
getOwnerTypes() {
      return this.ownerTypes;
    }
 
    getBusinessSector() {
      return this.businessSector;
    }
    getBusinessStatus() {
      return this.businessStatus;
    }
    getBusinessType() {
      return this.businessType;
    }

    // Vehicle Geters

    getvehicleBodyConvention(){
      return this.vehicleBodyConvention;
    }
  
    getvehicleBodyType(){
      return this.vehicleBodyType;
    }
  
    getvehicleCategory(){
      return this.vehicleCategory;
    }
  
  
    getvehicleClassification(){
      return this.vehicleClassification;
    }
  
    getvehicleColor(){
      return this.vehicleColor;
    }
  
    getvehicleEngineType(){
      return this.vehicleEngineType;
    }
  
    getvehicleFuelType(){
      return this.vehicleFuelType;
    }
  
    getvehicleMake(){
      return this.vehicleMake;
    }
  
    getvehicleMaker(){
      return this.vehicleMaker;
    }
  
    getvehiclePurchaseType(){
      return this.vehiclePurchaseType;
    }
    getvehicleRCStatus(){
      return this.vehicleRCStatus;
    }
    getvehicleScheme(){
      return this.vehicleScheme;
    }
    getvehicleStatus(){
      return this.vehicleStatus;
    }
  
    getvehicleUsage(){
      return this.vehicleUsage;
    }
    getvehicleType(){
      return this.vehicleType;
    }

    
    //purchase info geter
    getbanks(){
      return this.banks;
    }
    getclearingAgents(){
      return this.clearingAgents;
    }
    getcustomCollectorates(){
      return this.customCollectorates;
    }
    getvehicleSchemes(){
      return this.vehicleSchemes;
    }
    getdealers(){
      return this.dealers;
    }
    getports(){
      return this.ports;
    }

  setNRApplicationId(appid:number) {
     this.NRapplicationId=appid;
    }

  setNRTApplicationId(appid:number) {
      this.NRTapplicationId=appid;
     }

  setTOApplicationId(appid:number) {
      this.TOapplicationId = appid;
     }

 

    //Shared seters
    setDistricts(districts:dropDownList[]) {
      this.districts=districts;
    }

    setCountries(countries:dropDownList[]) {
      this.countries=countries;
    }

    //Owner seters
    setOwnerTypes(ownerType:dropDownList[]) {
      this.ownerTypes=ownerType;
    }

    setBusinessSector(businessSector:dropDownList[]) {
      this.businessSector=businessSector;
    }
    setBusinessStatus(businessStatus:dropDownList[]) {
      this.businessStatus=businessStatus;
    }
    setBusinessType(businessType:dropDownList[]) {
      this.businessType=businessType;
    }


    // Vehicle setups

    setvehicleBodyConvention(vehicleBodyConvention:dropDownList[]) {
      this.vehicleBodyConvention=vehicleBodyConvention;
    }

    setvehicleBodyType(vehicleBodyType:dropDownList[]) {
      this.vehicleBodyType=vehicleBodyType;
    }
    setvehicleCategory(vehicleCategory:dropDownList[]) {
      this.vehicleCategory=vehicleCategory;
    }
    setvehicleClassification(vehicleClassification:dropDownList[]) {
      this.vehicleClassification=vehicleClassification;
    }
    setvehicleColor(vehicleColor:dropDownList[]) {
      this.vehicleColor=vehicleColor;
    }
    setvehicleEngineType(vehicleEngineType:dropDownList[]) {
      this.vehicleEngineType=vehicleEngineType;
    }
    setvehicleFuelType(vehicleFuelType:dropDownList[]) {
      this.vehicleFuelType=vehicleFuelType;
    }
    setvehicleMake(vehicleMake:dropDownListMake[]) {
      this.vehicleMake=vehicleMake;
    }
    setvehicleMaker(vehicleMaker:dropDownList[]) {
      this.vehicleMaker=vehicleMaker;
    }
    setvehiclePurchaseType(vehiclePurchaseType:dropDownList[]) {
      this.vehiclePurchaseType=vehiclePurchaseType;
    }
    setvehicleRCStatus(vehicleRCStatus:dropDownList[]) {
      this.vehicleRCStatus=vehicleRCStatus;
    }
    setvehicleScheme(vehicleScheme:dropDownList[]) {
      this.vehicleScheme=vehicleScheme;
    }
    setvehicleStatus(vehicleStatus:dropDownList[]) {
      this.vehicleStatus=vehicleStatus;
    }
    setvehicleUsage(vehicleUsage:dropDownList[]) {
      this.vehicleUsage=vehicleUsage;
    }
    setvehicleType(vehicleType:dropDownList[]) {
      this.vehicleType=vehicleType;
    }

    
    // purchase info 
    setbanks(banks:dropDownList[]) {
      this.banks=banks;
    }
    setclearingAgents(clearingAgents:dropDownList[]) {
      this.clearingAgents=clearingAgents;
    }
    setcustomCollectorates(customCollectorates:dropDownList[]) {
      this.customCollectorates=customCollectorates;
    }
    setvehicleSchemes(vehicleSchemes:dropDownList[]) {
      this.vehicleSchemes=vehicleSchemes;
    }
    setdealers(dealers:dropDownList[]) {
      this.dealers=dealers;
    }
    setports(ports:dropDownList[]) {
      this.ports=ports;
    }

   ArrayOfYears() {
      var max = new Date().getFullYear()
      var min = max - 30;
      var years = [];
    
      for (var i = max; i >= min; i--) {
        years.push(i)
      }
      return years
    }
}
