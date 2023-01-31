import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.data?.token;
        
        const isApiUrl = request.url.startsWith(environment.apiUrlsample);
        if (isLoggedIn && isApiUrl) {
        

            request = request.clone({
                setHeaders: {
                    AuthToken: `${user.data?.token}`
                //    Authorization:  `Bearer ${user.data?.token}`

                }

                // headers: request.headers.set('Authorization', `Bearer ${user.data?.token}`)
            });
        }
        // else if(isApiUrl && !isLoggedIn &&  !request.url.endsWith("/Auth/Login")){
        //     this.accountService.logout();
        // }
        return next.handle(request);
    }
}