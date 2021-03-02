import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Categoria } from '../../model/categoria';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ElementoService } from '../../service/elemento.service';
import { MarcaService } from '../../../services/marca.service'
import { Marca } from '../../model/marca';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MarcaComponent } from '../marca/marca.component';
import { CategoriasService } from 'src/app/services/categorias.service';
import { LoginService } from '../../../login/services/login.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-element-form',
  templateUrl: './element-form.component.html',
  styleUrls: ['./element-form.component.scss']
})
export class ElementFormComponent implements OnInit {

  @ViewChild('auto') auto;


  @ViewChild('submenu') submenu;
  @ViewChild('menuaux') menuaux;
  @ViewChild('menuaux2') menuaux2;
  @ViewChild('menuaux3') menuaux3;
  @ViewChild('menuaux4') menuaux4;
  //Spinners
  spinnerGuardar = false;
  spinnerCategory = false;
  spinnerMarks = false;
  //Fin Spinners


  categoriasss: any = []
  marcas: Marca[] = []

  hide = true;

  form = new FormGroup({
    name_element: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    mark_id: new FormControl(''),
    category_of_element_id: new FormControl([], Validators.required)
  });

  constructor(private elementoService: ElementoService, private dialog: MatDialog, private serviceCategoria: CategoriasService, private marcaService: MarcaService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogref: MatDialogRef<ElementFormComponent>,private loginService: LoginService, protected route: Router) { }

  ngOnInit(): void {
    this.spinnerCategory = true
    this.spinnerMarks = true
    this.serviceCategoria.getCategorias().subscribe(
      (data:any) => {
        //this.categorias = data['categorysOfElements']
        //this.spinnerCategory = false
        this.categoriasss = [];

        let tomaresultado=[];
        tomaresultado = data.categorysOfElements; 
        tomaresultado=tomaresultado.sort(this.comparar);

        let arregloaux=[];

        tomaresultado.forEach(n=>{
          if(n.father_category_id== null)
            {                            
              let d={  type: "padre", id_category: n.id_category, name_category:n.name_category, hijo: []}
              this.categoriasss.push(d);
              arregloaux.push(d);
            }
        })                
        
        tomaresultado.forEach((n, index)=>{
          if(n.father_category_id!=null){

            let x=arregloaux.find(element => element.id_category == n.father_category_id)
            if((x!=undefined)){
              let auxasig;
              auxasig=this.CargaRec(n,this.categoriasss,arregloaux,0);
              arregloaux=auxasig;
            }
            else{
              let aux= tomaresultado.splice(index,1);              
              tomaresultado.push(aux[0]);
              console.log(tomaresultado);
            }
          }          
        })
        //let aux= this.arraycateg;
        this.spinnerCategory=false;

        console.log(this.categoriasss)



      },
      err => {
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )

    this.marcaService.getMarcas().subscribe(
      data => {
        console.log(data)
        this.marcas = data['marks']
        this.spinnerMarks = false
      }
      , err=>{
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )

  }

  CargaRec(result, categorias: any[],arregloaux, num){
    
    categorias.forEach(cat => {
      if(cat.id_category == result.father_category_id)
      {
        let color="black";
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
          this.CargaRec(result,cat.hijo,arregloaux, num+1)
    });
    return(arregloaux);
  }
  comparar ( a, b ){ return a.id_category - b.id_category; }



  enviar() {

    let z=[];

    this.form.value.category_of_element_id.forEach(cat => {
        if(cat)
          z.push({category_of_element_id: cat.id_category});
    });

    this.form.setValue({
      name_element: this.form.value.name_element,
      description: this.form.value.description,
      mark_id: this.form.value.mark_id,
      category_of_element_id: z,
    }); 

    console.log(this.form.value)
    this.elementoService.addElement(this.form.value).subscribe(
      (data: any) => {
        //console.log(data) 
      },
      err=>{
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )

    this.dialogref.close({ confirm: true })

  }

  cancelar(){
    this.dialogref.close({ confirm: false })
  }
  //Chips

  onCatRemoved(avaRem: string) {
   // const ava = this.form.value.availabilitys;
   const cat = this.form.value.category_of_element_id;
   this.removeFirst(cat, avaRem);
    this.form.setValue({
      name_element: this.form.value.name_element,
      description: this.form.value.description,
      mark_id: this.form.value.mark_id,
      category_of_element_id: cat,
    }); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  //Marcas

  addMarca(): void {
    const dialogref = this.dialog.open(MarcaComponent, {
      data: { title: 'Nueva Marca' }
    });

    dialogref.afterClosed().subscribe(result => {
      this.spinnerMarks = true
      if (result.confirm) {
        
        this.marcaService.getMarcas().subscribe(
          data => {
            console.log(data)
            this.spinnerMarks = false
            this.marcas = data['marks']
          },
          err=>{
            this.loginService.logout();
            window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          }
        )
      }
    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    });

  }


  //////////////////////////////////////
  public categoriaseleccionada = null;
  select(cat){
    this.categoriaseleccionada=cat;
    let arrayaux: any[]=[];
    arrayaux=this.form.value.category_of_element_id;
    if(!arrayaux.find((element:any)=>element.id_category==cat.id_category))
      arrayaux.push(this.categoriaseleccionada);

    this.form.setValue({
      name_element: this.form.value.name_element ,
      description: this.form.value.description ,
      mark_id: this.form.value.mark_id ,
      category_of_element_id: arrayaux,  
    })
  }
  selectvoid(){
   this.categoriaseleccionada= null;

  }
  disabledSelect=false

}
