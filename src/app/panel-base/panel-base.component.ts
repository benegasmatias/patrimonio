import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service'
import { Router } from '@angular/router';
import {Programa} from '../programa/model/programa';
import { StructService } from '../services/struct.service';
import { ViewChild, TemplateRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';

import {dialogoNuevoStructComponent} from './dialogoNuevoStruct/dialogoNuevoStruct.component'

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

  muestrabutton= true;
  datobuton: any={};
  public dialogConfig;
  public dialogo;

  programaa : Programa;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
 

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService: LoginService, protected route: Router,private serviceStruct:StructService, private dialog: MatDialog) {
    // this.cargarUser()
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    //dialogo
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
  }

  ngOnInit(): void {
    this.spinnerNav = true
  
    this.serviceStruct.getTypeStructs().subscribe(
      data=>{
        this.destinosNav = data['types_structs']
        this.spinnerNav = false
      },
      err=>{console.log(err)
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )    
   }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  destinNav(destinoNav){
  // console.log(this.ruta) 
  this.fillerNav=[];
  //console.log(destinoNav)
  //console.log(destinoNav.name)
  this.datobuton= destinoNav;
    
  this.serviceStruct.getStructs(destinoNav.id).subscribe(
    data=>{
      this.fillerNav=[];
      this.estructuras=data['structs']
      this.muestrabutton=false;

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
               },
               {
                name: 'Listar Inventarios',
                route: `programa/inventarios/${this.estructuras[i].id}`,
              },
              {
                name: 'Listar Salidas',
                route: `programa/salidas/${this.estructuras[i].id}`,
              },
              {
                name: 'Listar Prestamos',
                route: `programa/prestamos/${this.estructuras[i].id}`,
              },
              {
                name: 'Configuracion',
                route: `programa/configuracion/${this.estructuras[i].id}`,
              }
              ]
           })

           if(!this.verifica()){
            this.fillerNav[i].subMenu.splice(1,1);
           }

     }
    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    }
    )
   this.route.navigateByUrl('panel/programa')
  }

  logout() {
    this.loginService.logout();
    this.route.navigateByUrl('')
  }

  categorias(){
    let aux=this.loginService.getRol();
    if(aux=="admin" || aux=="user"){
      this.muestrabutton=true;
      this.fillerNav=[];
      this.fillerNav.push({ 
        name: `Categorias`,
        icon: 'folder',
        route:'categorias'
      })
    }
  }

  elementos(){
    let aux=this.loginService.getRol();
    if(aux=="admin" || aux=="user"){
      this.muestrabutton=true;
      this.fillerNav=[];
      this.fillerNav.push({ 
        name: `Elementos`,
        icon: 'folder',
        route:'list-elementos'
      })
    }
  }

  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;

  nuevoStruct(){
    
    this.dialogConfig.data = {
      data: '',
    };
    this.dialogo = this.dialogConfig;

    let dialogRef = this.dialog.open( dialogoNuevoStructComponent, this.dialogo);

    dialogRef.afterClosed().subscribe((data:any) => {
      if (data.valor == 'confirm' ) {
        console.log(data.nombre)

        this.serviceStruct.addStruct({type_struct_id:this.datobuton.id, origin_struct_id:1, name: data.nombre})
          .subscribe((data:any)=>{

            this.serviceStruct.getTypeStructs().subscribe(
              data=>{
                this.destinosNav = data['types_structs']
                this.spinnerNav = false
                
                let x= this.destinosNav.find((element:any )=> element.id= this.datobuton.id)
                this.destinNav(x);
              },
              err=>console.log(err)
            )
        
          },
          err=>{
            console.log(err)
            this.loginService.logout();
            window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          })

      }
    },
    error=>{
      console.log(error)
    })
  }

  verifica(){
    let aux=this.loginService.getRol();
    return (aux=="admin" || aux=="user");
  } 

  // private cargarUser (){

  //   let user = JSON.parse(sessionStorage.getItem('currentUser'))
  //   this.datoUser={
  //     name : user.name,
  //     imagen : "assets/img/logo.png"
  //   }
  // }
}
