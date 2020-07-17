import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service'
import { Router, ChildActivationEnd } from '@angular/router';
import {Programa} from '../programa/model/programa';

@Component({
  selector: 'app-panel-base',
  templateUrl: './panel-base.component.html',
  styleUrls: ['./panel-base.component.scss']
})
export class PanelBaseComponent implements OnDestroy,OnInit {

  datoUser : {name,imagen};
  fillerNav = [];

  programas :Programa []
  programaa : Programa;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService: LoginService, protected route: Router) {
    // this.cargarUser()
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

    this.programas =[]
    for(var i=0;i<2;i++){
      this.programaa = new Programa;
        this.programaa.nombre=`Negro puto${i}`
        this.programaa.id=`${i}`
 
         this.programas.push(this.programaa)
         console.log(this.programas)
    }  
   
 
   }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  programa(){
  // console.log(this.ruta) 
  this.fillerNav=[];

    for(let i=0;i<this.programas.length;i++){
      this.fillerNav.push(  { 
          name: `${this.programas[i].nombre}`,
          icon: 'home',
          subMenu:
            [
             {
               name: 'List',
               route: `programa/${this.programas[i].id}`,
             },
             {
               name: 'Edit',
               route: `programa/edit/${this.programas[i].id}`,
             }
            ]
         })
    }



   // this.route.navigateByUrl('panel/programa')
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
            route: 'programa/list',
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
