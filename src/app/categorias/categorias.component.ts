import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';
import {CategoriasService} from '../services/categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login/services/login.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  encapsulation: ViewEncapsulation.None,

})


export class CategoriasComponent implements OnInit {

  public arrayauxiliar: algo[];
  public dialogo;
  public dialogConfig;
  public elimina = false;
  public varguardado=false;
  public agregarCat= true;
  public muestraalerta=false;

  //variable de respaldo del listado de categorias
  public respaldo = [];

  public form = new FormGroup({
    categoria: new FormControl('', [Validators.required]),

  });

  //arreglo de categorias (vista previa)
  public arraycateg: categ[]=[];
  disabledSelect=false


////////////definicion de elementos del drag and drop///////////////////////////////////////////////
public nestedCateg = {
  selected: null,
  templates: [
    { type: "padre", id_category: -1, hijo: [] ,name_category:"Categoria generica", color: "black", },
    { type: "hijo", id_category: -1, hijo: [] ,name_category:"Categoria generica", color: "black", },
  ],
  dropzones: [
    [

  ],[
    {
      "type": "padre",
      "id_category": 1,
      "name_category":"AAAAAAAAAAAA",
      "hijo":null
    }
  ]
]
};

  ngOnInit(): void {
    this.cargaArreglo();

  }

  cargaArreglo(){
    this.nestedCateg.dropzones[0]=[];
    this.arraycateg=[];

    this.serviceCategoria.getCategorias().subscribe(
      (data:any) => {
        let tomaresultado=[];
        tomaresultado = data.categorysOfElements;
        // tomaresultado=tomaresultado.sort(this.comparar);
        let arregloaux=[];

        tomaresultado.forEach(n=>{
          if(n.father_category_id== null)
            {
              let d={  type: "padre", id_category: n.id_category, name_category:n.name_category, hijo: [], color: "black"}
              this.nestedCateg.dropzones[0].push(d);
              arregloaux.push(d);
            }
        })

        tomaresultado.forEach((n, index)=>{
          if(n.father_category_id!=null){

            let x=arregloaux.find(element => element.id_category == n.father_category_id)
            if((x!=undefined)){
              let auxasig;
              auxasig=this.CargaRec(n,this.nestedCateg.dropzones[0],arregloaux,0);
              arregloaux=auxasig;
            }
            else{
              let aux= tomaresultado.splice(index,1);
              tomaresultado.push(aux[0]);
            }
          }
        })
        /////////////////////////////////////////////////////////////////////////
        //vista previa rapida
        this.CategoriasVistaPrev(data);
        //console.log(this.nestedCateg.dropzones[0])
        setTimeout(()=>{
          this.varguardado=true;
        }, 1000);

      },
      error => {
        console.log(error)
        console.log("No se pudo recuperar Categorias")
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      });
  }

  CategoriasVistaPrev(data:any){
    let tomaresultado=[];
    tomaresultado = data.categorysOfElements;
    let arregloaux=[];

    tomaresultado.forEach(n=>{
      if(n.father_category_id== null)
        {
          let d={  type: "padre", id_category: n.id_category, name_category:n.name_category, hijo: [], color: "black"}
          this.arraycateg.push(d);
          arregloaux.push(d);
        }
    })

    tomaresultado.forEach((n, index)=>{
      if(n.father_category_id!=null){

        let x=arregloaux.find(element => element.id_category == n.father_category_id)
        if((x!=undefined)){
          let auxasig;
          auxasig=this.CargaRecPrev(n,this.arraycateg,arregloaux,0);
          arregloaux=auxasig;
        }
        else{
          let aux= tomaresultado.splice(index,1);
          tomaresultado.push(aux[0]);
        }
      }
    })
    this.nestedCateg.dropzones[0]= this.arraycateg;
  }
    //carga recursiva de elementreacs de la categoria
  CargaRec(result, categorias: algo[],arregloaux, num){
    // categorias.sort(this.comparar)

    categorias.forEach(cat => {
      if(cat.id_category == result.father_category_id)
      {
        let color="black";
        let index;

        index= num % 5;

        switch(index){
          case 0:{
            color="green";
            break;
          }
          case 1:{
            color="blue";
            break;
          }
          case 2:{
            color="red";
            break;
          }
          case 3:{
            color="brown";
            break;
          }
          case 4:{
            color="indigo";
          }
        }
        let d;
        if(num<4){
          d={ type: "padre", id_category: result.id_category, name_category:result.name_category, hijo:[] ,color: color};
        }
        else
        {
          d={ type: "hijo", id_category: result.id_category, name_category:result.name_category, hijo:[] ,color: color};
        }
        cat.hijo.push(d);
        arregloaux.push(d);
      }
      else
        if(cat.hijo!=[])
          this.CargaRec(result,cat.hijo,arregloaux, num+1)
    });
    return(arregloaux);
  }

  CargaRecPrev(result, categorias: categ[],arregloaux, num){
    // categorias.sort(this.comparar)

    categorias.forEach(cat => {
      if(cat.id_category == result.father_category_id)
      {
        let color="black";
        let index;

        index= num % 5;

        switch(index){
          case 0:{
            color="green";
            break;
          }
          case 1:{
            color="blue";
            break;
          }
          case 2:{
            color="red";
            break;
          }
          case 3:{
            color="brown";
            break;
          }
          case 4:{
            color="indigo";
          }
        }
        let d;
        if(num<8){
          d={ type: "padre", id_category: result.id_category, name_category:result.name_category, hijo:[] ,color: color};
        }
        else
        {
          d={ type: "hijo", id_category: result.id_category, name_category:result.name_category, hijo:[] ,color: color};
        }
        cat.hijo.push(d);
        arregloaux.push(d);
      }
      else
        if(cat.hijo!=[])
          this.CargaRecPrev(result,cat.hijo,arregloaux, num+1)
    });
    return(arregloaux);
  }

  comparar ( a, b ){ return a.name_category - b.name_category; }

  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;

  constructor(private serviceCategoria: CategoriasService, private loginService: LoginService ) {}

//ELIMINAR

  eliminaCategoria(event){
    //console.log(event.item);
  }


//Deshacer Cambios

  DeshacerCambios(){
    this.cargaArreglo();
  }


//////////////////Drag and drop/////////////////////////////////

  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }

  //agregar nueva categoria
  public modificaTexto(){

    if(this.form.value.categoria!=''){
      this.agregarCat=false;
      this.nestedCateg.templates[0].name_category=this.form.value.categoria;
      this.muestraalerta=false;
    }
    else
        this.agregarCat=true;

    //this.nestedCateg.dropzones[0].push({     type: "hijo", id_category: -1, hijo: [] ,name_category:"Categoria generica"})
  }

  public GuardaCategorias(){
    this.varguardado=false;
    this.serviceCategoria.modificaCategorias(this.nestedCateg.dropzones[0]).subscribe((data: any)=>{

      // this.nestedCateg.dropzones[0]=[];

      // let tomaresultado=[];
      // tomaresultado = data;
      // tomaresultado=tomaresultado.sort(this.comparar);
      // let arregloaux=[];

      // tomaresultado.forEach(n=>{
      //   if(n.father_category_id== null)
      //     {
      //       let d={  type: "padre", id_category: n.id_category, name_category:n.name_category, hijo: []}
      //       this.nestedCateg.dropzones[0].push(d);
      //       arregloaux.push(d);
      //     }
      // })
      // tomaresultado.forEach((n, index)=>{
      //   if(n.father_category_id!=null){

      //     let x=arregloaux.find(element => element.id_category == n.father_category_id)
      //     if((x!=undefined)){
      //       let auxasig;
      //       auxasig=this.CargaRec(n,this.nestedCateg.dropzones[0],arregloaux,0);
      //       arregloaux=auxasig;
      //     }
      //     else{
      //       let aux= tomaresultado.splice(index,1);
      //       tomaresultado.push(aux[0]);
      //       console.log(tomaresultado);
      //     }
      //   }
      // })

      this.muestraalerta=true;
      this.cargaArreglo();
    },
    error=>{
      console.log(error)
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    });


  }

}

export interface algo{
  type: string,
  id_category: number,
  name_category:string,
  hijo: algo[]
}

export interface categ{
  type: string,
  id_category: number,
  name_category:string,
  hijo: categ[]
}
