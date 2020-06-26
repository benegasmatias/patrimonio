import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LoginService } from '../login/services/login.service'
import { Router, ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-panel-base',
  templateUrl: './panel-base.component.html',
  styleUrls: ['./panel-base.component.scss']
})
export class PanelBaseComponent implements OnDestroy {

  fillerNav = [
    {
      name: 'inicio',
      route: 'inicio',
      icon: 'home',
      subMenu:
        [
          {
            name: 'Home',
            route: 'home',
          },
          {
            name: 'Nuevo Cliente',
            route: 'nuevo-cliente',
          }
        ]
    },
    {
      name: 'Home',
      route: 'home',
      icon: 'home'
    },
    {
      name: 'Nuevo Cliente',
      route: 'nuevo-cliente',
      icon: 'home'
    }
  ];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService: LoginService, protected route: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('')
  }
}
