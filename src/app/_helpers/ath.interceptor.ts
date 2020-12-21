import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { LoginService } from '../login/services/login.service';

import {  ActivatedRouteSnapshot, Router } from '@angular/router'

@Injectable()
export class AthInterceptor implements HttpInterceptor {
  constructor(/*private routerr: ActivatedRouteSnapshot, */private route: Router,private authenticationService: LoginService, private router: Router) {}



  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const token = this.authenticationService.getToken();
    const isLoggedIn = this.authenticationService.isLogged();
    const isApiUrl = request.url.startsWith(environment.baseUrl);
    if (isLoggedIn && isApiUrl) {

        const headers = new HttpHeaders({
            Authorization: `${token}`,
           'Content-Type': 'application/json',
        })
      request = request.clone({
       
           // Authorization: `Baerer ${token}`
        headers
        //   ,
        //   'Accept': 'application/json',
          
        
      });
    }
    return next.handle(request).catch(err => {
      // onError
 
      console.log(err);
      if (err instanceof HttpErrorResponse) {
          console.log(err.status);
          console.log(err.statusText);
          //let coso = this.routerr['_routerState']['url'];
          if (err.status === 401) {
            this.authenticationService.logout()            
            // this.route.navigateByUrl( 
            //   this.router.createUrlTree(
            //   ['/'], {
            //     // queryParams: {
            //     //   coso
            //     // }
            //   }
             
            // ))
            // this.route.navigateByUrl('')
            //this.router.serializeUrl
            window.location.assign("/")
          }
          
      }
      return Observable.throw(err);
  }) as any;
  }

}
