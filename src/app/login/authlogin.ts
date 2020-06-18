import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

import {LoginService} from './services/login.service'

import {ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';



@Injectable({providedIn: "root"})
export class authlogin implements CanActivate {

  constructor(private customerService:LoginService , private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];
    if (this.customerService.isLogged()===false) {

      return  true;
    }else{ 

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['navbar'], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
    
      }
  }
}