import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service'
import { Router } from '@angular/router';
import {Programa} from '../programa/model/programa';
import { StructService } from '../services/struct.service';

@Component({
  selector: 'app-panel-base',
  templateUrl: './panel-base.component.html',
  styleUrls: ['./panel-base.component.scss']
})
export class PanelBaseComponent implements OnDestroy,OnInit {

  spinnerNav=false;
  snipperFillerNav= false

  datoUser : {name,imagen};
  fillerNav = [];

  destinosNav:any =[]

  estructuras:any=[]




  programaa : Programa;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
 

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService: LoginService, protected route: Router,private serviceStruct:StructService) {
    // this.cargarUser()
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.spinnerNav = true
  
    this.serviceStruct.getTypeStructs().subscribe(
      data=>{
        this.destinosNav = data['types_structs']
        this.spinnerNav = false
        console.log(data)
      },
      err=>console.log(err)
    )

 
   }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  destinNav(destinoNav){
  // console.log(this.ruta) 
 
  this.fillerNav=[];
  console.log(destinoNav)
    
  this.serviceStruct.getStructs(destinoNav.id).subscribe(
    data=>{
      console.log(data)
      this.fillerNav=[];
      this.estructuras=data['structs']
      console.log(data)
      for(let i=0;i<this.estructuras.length;i++){
        this.fillerNav.push(  { 
            name: `${this.estructuras[i].name}`,
            icon: 'account_balance_wallet',
            subMenu:
              [
               {
                 name: 'Listar Entradas',
                 route: `programa/${this.estructuras[i].id}`,
               },
               {
                 name: 'Generar Entrada',
                 route: `entrada/add/${destinoNav.id}/${this.estructuras[i].id}`,
               }
              ]
           })
     }
    },
    err=>console.log(err)
  )
     

   this.route.navigateByUrl('panel/programa')
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
