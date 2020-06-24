import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {LoginService} from '../login/services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-base',
  templateUrl: './panel-base.component.html',
  styleUrls: ['./panel-base.component.scss']
})
export class PanelBaseComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  fillerNav = [
    {
      name: 'inicio',
      route : 'inicio',
      icon:'home'
     },
    {
      name: 'Home',
      route :'home',
      icon:'home'
     },
    {
    name: 'Listar Cliente',
    route :'lista',
    icon:'home'
  },
 
];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private loginService:LoginService,protected route:Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(){
    this.loginService.logout();
    this.route.navigateByUrl('')
  }
}
