import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InventarioService } from 'src/app/services/inventario.service';
import { LoginService } from 'src/app/login/services/login.service';
import { CategoriasService } from 'src/app/services/categorias.service';


@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {


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
  band=false;

  form = new FormGroup({
    category_of_element_id: new FormControl([], Validators.required)
  });
  categoriasss: any = []

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<FormEditComponent>, private inventarioservice:InventarioService,private serviceCategoria: CategoriasService,private loginService: LoginService,) {
  }

  ngOnInit(): void {
    this.serviceCategoria.getCategoriasOne(this.data.row.id_element).subscribe((data:any)=>{
      let aux=[];
      data.forEach(element => {
        aux.push({
          hijo: [],
          id_category: element.categ.id_category,
          name_category: element.categ.name_category,
          type: "padre",
        })
      });
      this.form.get('category_of_element_id').setValue(aux);
      this.CargaCateg();
    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    })


  }

  CargaCateg(){
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
            }
          }
        })
        //let aux= this.arraycateg;
        this.spinnerCategory=false;
        this.band=true;
      },
      err => {
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


  close(){
    this.dialogref.close({confirm:false})
  }

  save(){
    if(this.form.valid){
      this.serviceCategoria.editElementCategory({categ:this.form.value.category_of_element_id,element_id:this.data.row.id_element}).subscribe(data=>{
        this.dialogref.close({confirm:true})
      },
      err=>{
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      })
    }

  }

    //Chips
  onCatRemoved(avaRem: string) {
      // const ava = this.form.value.availabilitys;
      const cat = this.form.value.category_of_element_id;
      this.removeFirst(cat, avaRem);
       this.form.setValue({
         category_of_element_id: cat,
       }); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
       const index = array.indexOf(toRemove);
       if (index !== -1) {
         array.splice(index, 1);
       }
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
        category_of_element_id: arrayaux,
      })
  }
  selectvoid(){
     this.categoriaseleccionada= null;
  }
  disabledSelect=false

}
