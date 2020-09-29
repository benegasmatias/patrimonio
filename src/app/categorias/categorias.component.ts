import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';
import {CategoriasService} from '../services/categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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

  public agregarCat= true;


  public form = new FormGroup({
    categoria: new FormControl('', [Validators.required]),

  });



////////////definicion de elementos del drag and drop///////////////////////////////////////////////
public nestedCateg = {
  selected: null,
  templates: [
    { type: "padre", id_category: -1, hijo: [] ,name_category:"Categoria generica"}
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
      this.serviceCategoria.getCategorias().subscribe(
      (data:any) => {
        let tomaresultado=[];
        tomaresultado = data.categorysOfElements; 
        tomaresultado=tomaresultado.sort(this.comparar);

        let arregloaux=[];

        console.log(tomaresultado);
        
        tomaresultado.forEach(n=>{
          if(n.father_category_id== null)
            {                            
              let d={  type: "padre", id_category: n.id_category, name_category:n.name_category, hijo: []}
              this.nestedCateg.dropzones[0].push(d);
              arregloaux.push(d);
            }
        })                
        
        tomaresultado.forEach((n, index)=>{
          if(n.father_category_id!=null){

            let x=arregloaux.find(element => element.id_category == n.father_category_id)
            if((x!=undefined)){
              let auxasig;
              auxasig=this.CargaRec(n,this.nestedCateg.dropzones[0],arregloaux);
              arregloaux=auxasig;
            }
            else{
              let aux= tomaresultado.splice(index,1);              
              tomaresultado.push(aux[0]);
              console.log(tomaresultado);
            }
          }          
        })
        
      },
      error => {
        console.log(error)
        console.log("No se pudo recuperar Categorias")
      });
      


    }
  
    //carga recursiva de elementos de la categoria
  CargaRec(result, categorias: algo[],arregloaux){
    
    categorias.forEach(cat => {
      if(cat.id_category == result.father_category_id)
      {
        let d={ type: "padre", id_category: result.id_category, name_category:result.name_category, hijo:[] };
        cat.hijo.push(d);
        arregloaux.push(d);
      }
      else
        if(cat.hijo!=[])
          this.CargaRec(result,cat.hijo,arregloaux)
    });
    return(arregloaux);
  }
  comparar ( a, b ){ return a.id_category - b.id_category; }

  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;

  constructor(private serviceCategoria: CategoriasService ) {}

//ELIMINAR

  eliminaCategoria(event){
    console.log(event.item);
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
    }      
    else
        this.agregarCat=true;
        
  }



  public GuardaCategorias(){
    console.log(this.nestedCateg.dropzones[0])
    this.serviceCategoria.modificaCategorias(this.nestedCateg.dropzones[0]).subscribe((data: any)=>{
      this.nestedCateg.dropzones[0]=[];

      let tomaresultado=[];
      tomaresultado = data;        
      tomaresultado=tomaresultado.sort(this.comparar);
      let arregloaux=[];
      
      tomaresultado.forEach(n=>{
        if(n.father_category_id== null)
          {                            
            let d={  type: "padre", id_category: n.id_category, name_category:n.name_category, hijo: []}
            this.nestedCateg.dropzones[0].push(d);
            arregloaux.push(d);
          }
      })
      tomaresultado.forEach((n, index)=>{
        if(n.father_category_id!=null){

          let x=arregloaux.find(element => element.id_category == n.father_category_id)
          if((x!=undefined)){
            let auxasig;
            auxasig=this.CargaRec(n,this.nestedCateg.dropzones[0],arregloaux);
            arregloaux=auxasig;
          }
          else{
            let aux= tomaresultado.splice(index,1);              
            tomaresultado.push(aux[0]);
            console.log(tomaresultado);
          }
        }          
      })

    },
    error=>{
      console.log(error)
    });
    
    
  }

}

export interface algo{
  type: string,
  id_category: number,
  name_category:string,
  hijo: algo[] 
}
