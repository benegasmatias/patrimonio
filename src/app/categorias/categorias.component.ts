import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { dialogoCategoriaComponent } from './dialogoCategoria/dialogoCategoria.component';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import {CategoriasService} from '../services/categorias.service';


import {NestedTreeControl} from '@angular/cdk/tree';

import {MatTreeNestedDataSource} from '@angular/material/tree';



@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})


export class CategoriasComponent implements OnInit {

  public categorias: lista[];
  public dialogo;
  public i: number;
  public arreglo;
  public dialogConfig;
  public elimina = false;

  public tomaresultado;


  ngOnInit(): void {

    this.categorias = [];


      this.serviceCategoria.getCategorias().subscribe(
      (data:any) => {

        this.tomaresultado = data.categorysOfElements;
        console.log(this.tomaresultado)
        this.tomaresultado.forEach(n=>{

          if(n.father_category_id== null)
            this.categorias.push(new lista(n.name_category,n.id_category));
          else
          {
            this.CargaRec(n,this.categorias)
          }
        })

      },
      error => {
        console.log(error)
        console.log("No se pudo recuperar Categorias")
      });
      console.log(this.categorias)
    }
  
  CargaRec(result, categorias: lista[]){
    
    categorias.forEach(cat => {
      if(cat.id_category == result.father_category_id)
      {
        cat.cargahijo(result.name_category,result.id_category);
      }
      else
      if(cat.hijo!=[])
        this.CargaRec(result,cat.hijo)
    });
  }

  @ViewChild('secondDialog') secondDialog: TemplateRef<any>;

  constructor(private dialog: MatDialog,private serviceCategoria: CategoriasService) {

    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
  }

  Categoria() {
    this.dialogConfig.data = {
      nombre: this.categorias
    };
    this.dialogo = this.dialogConfig;

    this.dialogo.nombre = this.categorias;

    let dialogRef = this.dialog.open(dialogoCategoriaComponent, this.dialogo);

    dialogRef.afterClosed().subscribe(data => {
      if (data.valor == 'confirm' && data.categoria != "") {
        console.log('Categoria Creada');
        if (data.padre != "")
        {
          for (let index = 0; index < this.categorias.length; index++) {
            if (this.categorias[index].name_category == data.padre){                        
              this.serviceCategoria.postCategorias(
                {
                  name_category:data.categoria, 
                  father_category_id: this.categorias[index].id_category,
                  
                }).subscribe(
               (result:any) => {
                console.log(result)
                  var carga= result.categoryOfElement.id_category;
                  this.categorias[index].cargahijo(data.categoria,carga) 
                },
                error => {
                  console.log(error)
                });
            }
            else {
              if(this.categorias[index].get()==false)
                  this.itera(this.categorias[index].hijo,data);
            }
          }
        }
        else
          {

            var carga;
            this.serviceCategoria.postCategorias({
              name_category: data.categoria
            })    .subscribe(
              (result : any) => {
                this.categorias.push(new lista(data.categoria,0))
                     
                console.log(result)
                
                carga= result.categoryOfElement.id_category;

                for (let index = 0; index < this.categorias.length; index++) {
                    if(this.categorias[index].name_category== data.categoria){
                      this.categorias[index].id_category=carga;
                    }
                  }
              },
              error => {
                console.log(error)
              });             
          }
      }
    })
  }

  itera(x:lista[],y){
    var j=true;
    x.forEach(z => {
      if(z.name_category== y.padre)
      {
        this.serviceCategoria.postCategorias({

          name_category: y.categoria ,
          father_category_id: z.id_category

        }).subscribe(
          (result :any) => {

            var carga= result.categoryOfElement.id_category;
            z.cargahijo(y.categoria,carga)
          },
          error => {
            console.log(error)
          });
        j=false;
        return;
      }
    });
    if(j)
      x.forEach(z => {
        if(z.get()==false)
            this.itera(z.hijo,y)
      });

  }





  borrab(n: lista) {
    this.categorias.forEach(list => {
      if (list.name_category == n.name_category) {
        const num = this.categorias.findIndex(element => element == list)
        if (num != -1)
          this.categorias.splice(num, 1);
      }
    });
  }

  borrah(p: lista, h: string) {


    this.categorias.forEach(list => {
      if (list.name_category == p.name_category) {
        const num = this.categorias.findIndex(element => element == list)
        const numh = this.categorias[num].hijo.findIndex(element => element.name_category == h)
        this.categorias[num].hijo.splice(numh, 1)
      }
    });
  }
  aEliminar() {
    this.elimina = !this.elimina;
  }

}
export class lista {
  name_category: string;
  hijo: lista[];
  id_category: number;

  constructor(n: string, id:number) {
    this.name_category = n;
    this.hijo = [];
    this.id_category=id;
  }
  cargahijo(h: string, n:number) {
    this.hijo.push(new lista(h,n))
  }
  get() {
    return this.hijo.length == 0
  }
}
//father_category_id
