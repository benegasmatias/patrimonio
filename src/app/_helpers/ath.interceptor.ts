import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { LoginService } from '../login/services/login.service';

@Injectable()
export class AthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: LoginService) {}

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



    return next.handle(request);
  }
}
