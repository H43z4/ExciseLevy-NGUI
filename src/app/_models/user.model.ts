export class User {
    // id?: string;
    // username!: string;
    // password!: string;
    // firstName!: string;
    // lastName!: string;
    // token!: string;

    status?: string;
    message?: string;
    data?:userdata;
    Routes?:userRoutes[]= [];

    
    
}
export class userdata{
    token?: string; 
    userName?: string;
    fullName?: string;
    roles?:string;
}
export class userRoutes{
    icon?: string;
    routename?: string;
    routesadd?: string;
    subMenuList?: userSubRoutes[]

}
export class userSubRoutes{
    
    routename?: string;
    routesadd?: string;
    

}