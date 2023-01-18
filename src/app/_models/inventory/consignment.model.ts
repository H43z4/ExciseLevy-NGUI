import { ItemLiq } from "./item.model";

export class ConsignmentModel{
    stockInApplicationId:string="";
    consigneeId?:bigint;
    consigneeName:string="";
    organisationId?:bigint;
    consinerName:string="";
    excisePassNo:string="";
    requestDate?:Date;
    transportExportNo:string="";
    consignmentFromId:string="";
    permitNo:string="";
    signedByCollector:string="";
    passValidity?:Date;
    vehicleRegistrationNo:string="";
    driverName:string="";
    rateOfDauty:string="0";
    amountOfDautyLevied:string="";
    chNoDate?:Date;
    remarks:string="";
    items: ItemLiq[]=[];
}
