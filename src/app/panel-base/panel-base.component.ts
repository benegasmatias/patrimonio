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

  datoUser : {name,imagen};
  fillerNav = [
  
  ];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService: LoginService, protected route: Router) {
    // this.cargarUser()
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  deportes(){
  // console.log(this.ruta) 
  this.fillerNav=[];
  this.fillerNav.push(  
   {
    name: 'Deportes',
    icon: 'home',
    subMenu:
      [
        {
          name: 'List',
          route: 'deporte',
        },
        {
          name: 'Edit',
          route: 'deporte/edit',
        }
        ]
    })

    this.route.navigateByUrl('panel/deporte')
  }
  coso(){
    this.fillerNav=[];
    this.fillerNav.push(  
     {
      name: 'Coso',
      icon: 'home',
      subMenu:
        [
          {
            name: 'List',
            route: 'inicio',
          }
          ]
      })
      this.route.navigateByUrl('panel/inicio')
  }

  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('')
  }

  // private cargarUser (){

  //   let user = JSON.parse(sessionStorage.getItem('currentUser'))
  //   this.datoUser={
  //     name : user.name,
  //     imagen : "assets/img/logo.png"
  //   }
  // }
}
