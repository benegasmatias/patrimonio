import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OutputService } from 'src/app/services/output.service';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InventarioService } from 'src/app/services/inventario.service';
import { LoginService } from 'src/app/login/services/login.service';


import { ElementoService } from 'src/app/elemento/service/elemento.service';
import { DialogCantElementComponent } from 'src/app/elemento/components/dialog-cant-element/dialog-cant-element.component';
import { StructService } from 'src/app/services/struct.service';
import { InputService } from 'src/app/services/input.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { DialogProveedorComponent } from 'src/app/dialog/proveedor/dialog-proveedor/dialog-proveedor.component';
import { ActivatedRoute } from '@angular/router';
import { ElementFormComponent } from 'src/app/elemento/components/element-form/element-form.component';
import { CategoriasService } from 'src/app/services/categorias.service';
import { MarcaService } from 'src/app/services/marca.service';



@Component({
  selector: 'app-pending-form',
  templateUrl: './entrada-edit.component.html',
  styleUrls: ['./entrada-edit.component.scss']
})
export class EntradaEditComponent implements OnInit {

  @ViewChild('auto') auto;


  @ViewChild('submenu') submenu;
  @ViewChild('menuaux') menuaux;
  @ViewChild('menuaux2') menuaux2;
  @ViewChild('menuaux3') menuaux3;
  @ViewChild('menuaux4') menuaux4;

  //arreglo de categorias
  public arraycateg: categ[]=[];  

  //alerts
  alertExito=false
  //Fin de alerts

  //Spinners
  spinnerGuardar = false;
  spinnerProvider = true;
  spinnerDestino=true;
  spinnerCategory=true;
  spinnerMarks= true;
  spinnerDestinoStruct=false;
  spinnerElement=false;
  spinnerNoElement=false;
//Fin de Spinners
//placeholders
tipoDestino=''
//Fin de placeholders
  disabledSelect=false


  stock:any = []
  
  keyword = 'name_element';
  data = [];

  elementos: any = []
  elementosSelecionados: any = []
  contadorSeleccion = 0;

  params = false
  estructuraNombre=''
  //Arrays
  destinos:any=[]

  estructuras:any=[]

  categorias:any=[]

  marcas:any=[]

  proveedores:any=[]
  //fin Arrays

  form = new FormGroup({
    number_refer: new FormControl('', Validators.required),
    typeStruct_id: new FormControl('',Validators.required),
     categoria: new FormControl({  type: "",
      id_category: -1,
      name_category:"-----",
      hijo: [] }),
    struct_id: new FormControl(Validators.required),
    provider_id:new FormControl('',Validators.required),
    stock: new FormControl(this.stock),
    marca: new FormControl('')
  });

  constructor(
      @Inject (MAT_DIALOG_DATA) public datos : any,
      private serviceElement: ElementoService,
      private dialog: MatDialog,
      private serviceStruct: StructService,
      private  serviceCategorias: CategoriasService,
      private serviceInput:InputService,
      private serviceMarca:MarcaService,
      private serviceProvider:ProveedorService,
      private activatedRoute:ActivatedRoute,
      private loginService: LoginService,
      
      public dialogref: MatDialogRef<EntradaEditComponent>,
      private outputService:OutputService, 
      private datePipe: DatePipe, 
      private inventarioservice:InventarioService, 
      ) {
        this.form.setValue({
          number_refer: datos.row.number_refer,
          typeStruct_id: datos.row.struct.type_struct_id,
          categoria: this.form.value.categoria,
          struct_id: datos.row.struct.id,
          provider_id: datos.row.provider.id,
          stock: this.form.value.stock,
          marca: this.form.value.marca
        })
        datos.row.elements.forEach(element => {

          this.serviceElement.getMarkbyId(element.mark_id).subscribe((data:any)=>{
            let newelem={
              cantidad: element._joinData.quantity,
              elemento:{
                category_of_element_id: null,
                description: element.description,
                id_element: element.id_element,
                mark_id: element.mark_id,
                name_element: element.name_element,
                quantity: null,
              },
                mark_name: data.mark.name
            }
            let newstock= {
              element_id: newelem.elemento.id_element,
              quantity: newelem.cantidad,
              mark_name: data.mark.name
            }
            this.elementosSelecionados.push(newelem);
            console.log(this.elementosSelecionados)
            this.stock.push(newstock);
            this.contadorSeleccion++;
          },
          err=>{
            console.log(err)
          })

          
        });
       }

  ngOnInit(): void {    
    //spinners
    this.spinnerGuardar = false;
    this.spinnerProvider = true;
    this.spinnerDestino=true;
    this.spinnerDestinoStruct=false;
    this.spinnerCategory=true;
 
    this.spinnerElement=true;
    //alert
    this.alertExito=false;
 
    //Recupera El Destino
    this.serviceStruct.getTypeStructs().subscribe(
      data=>{
           this.destinos = data['types_structs']
           this.spinnerDestino=false 
            // console.log('asdasdasd', this.form.get('estructura').value)

            //this.form.get('typeStruct_id').setValue(param['typeStruct'])

            this.params=true
            this.disabledSelect=true;
            this.getEstructura(this.datos.row.struct.id);
   
      },
      err=>{
        console.log(err)
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )      
    
    this.serviceCategorias.getCategorias().subscribe(
      (data:any) => {
        let tomaresultado=[];
        tomaresultado = data.categorysOfElements; 
        tomaresultado=tomaresultado.sort(this.comparar);

        let arregloaux=[];

        tomaresultado.forEach(n=>{
          if(n.father_category_id== null)
            {                            
              let d={  type: "padre", id_category: n.id_category, name_category:n.name_category, hijo: []}
              this.arraycateg.push(d);
              arregloaux.push(d);
            }
        })                
        
        tomaresultado.forEach((n, index)=>{
          if(n.father_category_id!=null){

            let x=arregloaux.find(element => element.id_category == n.father_category_id)
            if((x!=undefined)){
              let auxasig;
              auxasig=this.CargaRec(n,this.arraycateg,arregloaux,0);
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

        console.log(this.arraycateg)
      },
      error => {
        console.log(error)
        console.log("No se pudo recuperar Categorias")
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      });
      
      this.getMarcas()         
    
  }

  get form_cant() { return this.form.get('return_quantity'); }
 
  //aux de categorias
  CargaRec(result, categorias: categ[],arregloaux, num){
    
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


  getMarcas(){
    this.spinnerMarks= true;
    this.serviceMarca.getMarcas().subscribe(
      data=>{
        this.marcas = data['marks']
        this.spinnerMarks= false;
      },
      err=>{
        console.log(err)
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )
    this.serviceProvider.getProviders().subscribe(
      data=>{
        this.proveedores = data['providers']
        this.spinnerProvider=false
      },
      err=>{
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )

          
  }
 
  addProveedor(): void {
		const dialogref = this.dialog.open(DialogProveedorComponent, {
      data: {title: 'Nuevo Proveedor'}
		});

		dialogref.afterClosed().subscribe(result => {
      this.spinnerProvider=true
			if (result.confirm) {
        this.serviceProvider.getProviders().subscribe(
          data=>{
            this.proveedores = data['providers']
            this.spinnerProvider=false
          },
          err=>{
            this.loginService.logout();
            window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          }
        )
      }else{
        this.spinnerProvider=false
      }
    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    });
    
  }
  
  addElement(): void {
		const dialogref = this.dialog.open(ElementFormComponent, {
      data: {title: 'Nuevo Elemento'}
		});

		dialogref.afterClosed().subscribe(element => {
      alert("El elemento fue creado. Ya se puede incluir a la entrada.")
			this.getMarcas()
			if (element.confirm) {
        this.spinnerElement=false;
        this.spinnerNoElement = false;
     this.serviceElement.getElementos().subscribe(
       data=>{
        this.data = data['elements']
        if(this.data.length==0){
          this.spinnerNoElement=true;
          this.spinnerElement=true;
         }else{
          this.spinnerElement=true;
         }
       },
       err=>{
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
       }
     )
      }
    });
    
	}

  getElementByMark(){
    this.spinnerElement=false;
    this.spinnerNoElement = false;
    if(!this.form.get('marca').value && this.form.get('categoria').value.id_category!=-1 ){
      this.serviceElement.getElementByCategory(this.form.get('categoria').value.id_category).subscribe(
        data=>{
          console.log(data)
           this.data = data['elements']
           if(this.data.length==0){
             this.spinnerNoElement=true;
             this.spinnerElement=true;
            }else{
             this.spinnerElement=true;
            }
        },
        err=>{
          console.log(err)
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        }
          
      )}
      else
    if(this.form.get('categoria').value.id_category==-1 && this.form.get('marca').value){
      this.serviceElement.getElementByMarca(this.form.get('marca').value).subscribe(
        data=>{
          console.log(data)
         
           this.data = data['elements']
           if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;
           }else{
            this.spinnerElement=true;
           }
        },
        err=>{
          console.log(err)
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        }
      )}else{
        if(this.form.get('categoria').value.id_category!=-1 && this.form.get('marca').value){
        this.serviceElement.getElementosByCategoryAndMark(this.form.get('categoria').value.id_category,this.form.get('marca').value).subscribe(
          data=>{
           this.data = data['elements']
           console.log(data)
           if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;
          
           }else{
            this.spinnerElement=true;
           }
          },
          err=>{
            console.log(err)
            this.loginService.logout();
            window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          }
        )}else
          {this.spinnerNoElement=true;
           this.spinnerElement=true;}
      }
  }


  getElementByCategory(){
    this.spinnerElement=false;
    this.spinnerNoElement = false;
    if(this.form.get('categoria').value.id_category==-1 && this.form.get('marca').value){
      this.serviceElement.getElementByMarca(this.form.get('marca').value).subscribe(
        data=>{
          console.log(data)
         
           this.data = data['elements']
           if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;
           }else{
            this.spinnerElement=true;
           }
        },
        err=>{console.log(err)
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        }
      )}else

    if(!this.form.get('marca').value && this.form.get('categoria').value.id_category!=-1 ){
     this.serviceElement.getElementByCategory(this.form.get('categoria').value.id_category).subscribe(
       data=>{
         console.log(data)
          this.data = data['elements']
          if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;
           }else{
            this.spinnerElement=true;
           }
       },
       err=>{
         console.log(err)
         this.loginService.logout();
         window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
     )}else{
       if(this.form.get('categoria').value.id_category!=-1 && this.form.get('marca').value!= ''){
         this.serviceElement.getElementosByCategoryAndMark(this.form.get('categoria').value.id_category,this.form.get('marca').value).subscribe(
           data=>{
             console.log(data)
           this.data = data['elements']
           if(this.data.length==0){
              this.spinnerNoElement=true;
              this.spinnerElement=true;
            }else{
               this.spinnerElement=true;
             }
          },
           err=>{
             console.log(err)
             this.loginService.logout();
             window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          }
         )
      }else{
        this.spinnerNoElement=true;
        this.spinnerElement=true;
      }
     }
  }

  getEstructura(struct_id = null) {
    // if(struct_id)
    this.spinnerDestinoStruct = true;
  //let select = <HTMLInputElement>document.getElementById('selecEstructura')
    if(struct_id){
      this.serviceStruct.getStruct(struct_id).subscribe(
        data=>{
          this.form.get('struct_id').setValue(data['struct'].id)
          this.estructuraNombre = data['struct'].name
          // this.form.get('estructura').setValue(data['struct'].id)
        },
        err=>{
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        }
      )
      }else{
        if (this.form.get('struct_id').value) {
          this.serviceStruct.getStructs(this.form.get('struct_id').value).subscribe(
            data => {
              this.estructuras = data['structs']
              this.spinnerDestinoStruct = false
            },
    
            err =>{
              console.log(err)
              this.loginService.logout();
              window.location.assign("https://sedacreditaciones.com/app/patrimonio")
            } 
          )
        } else {
          this.spinnerDestinoStruct = false
          this.estructuras = []
        }
      }
   
  }

  enviar() {
    this.spinnerGuardar=true
    this.serviceInput.editInput({
      input_id: this.datos.row.id,
      number_refer: this.form.value.number_refer,
      provider_id: this.form.value.provider_id,
      stock: this.form.value.stock,

    }).subscribe((data:any)=>{
      console.log(data)
      this.alertExito=true;
      this.spinnerGuardar=false;
      this.dialogref.close({confirm:true, })
    },
    err=>{
      console.log(err)
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    })


  }

  noSeleccionar(id) {
    this.stock.splice(id,1);
    this.elementosSelecionados.splice(id, 1);
    this.contadorSeleccion = this.elementosSelecionados.length
  }


  //autocomplet

  selectEvent(item) {
    // do something with selected item
    //console.log(item.name_element)

    if(item!=''){

    const dialogref = this.dialog.open(DialogCantElementComponent, {
      data: { title: 'Cantidad de ' + item.name_element }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result.confirm) {
        if (this.elementosSelecionados.find(element => element.elemento.id_element == item.id_element)) {
          console.log(this.elementosSelecionados.find(element => element.elemento.id_element == item.id_element))
          alert("El elemento ya se agrego a la lista.")

        } else {
          let elemento;
          this.serviceElement.getMarkbyId(item.mark_id).subscribe((data:any)=>{
            elemento = {
              elemento: item,
              cantidad: result.cantidad,
              mark_name: data.mark.name
            }
            this.elementosSelecionados.push(elemento);
            this.stock.push({element_id:item.id_element,quantity:result.cantidad})
            this.contadorSeleccion = this.elementosSelecionados.length;
          },
          err=>{
            console.log(err)
          })
        }
      }
     
    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    });
    
   } 
    
  }




  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  console.log(val)
  }

  onFocused(e) {
    // do something when input is focused  
  }

  public categoriaseleccionada: categ = null;
   select(cat){
     this.categoriaseleccionada=cat;
     this.form.setValue({
      number_refer: this.form.value.number_refer,
      typeStruct_id: this.form.value.typeStruct_id,
      categoria: this.categoriaseleccionada,
      struct_id: this.form.value.struct_id ,
      provider_id: this.form.value.provider_id,
      stock: this.form.value.stock ,
      marca: this.form.value.marca 
     })
     this.getElementByCategory();
   }
   selectvoid(){
    this.categoriaseleccionada= {  type: '',
    id_category: -1,
    name_category:'-----',
    hijo: [] };
    this.form.setValue({
     number_refer: this.form.value.number_refer,
     typeStruct_id: this.form.value.typeStruct_id,
     categoria: this.categoriaseleccionada,
     struct_id: this.form.value.struct_id ,
     provider_id: this.form.value.provider_id,
     stock: this.form.value.stock ,
     marca: this.form.value.marca 
    })
    this.getElementByCategory();
   }




   //cierre de dialogo
    close(){
    this.dialogref.close({confirm:false})
  }

  // save(){
  //   var fecha= this.datePipe.transform(this.form.value.return_date,"yyyy-MM-dd");
  //   this.inventarioservice.updatePrestamo({return_quantity: this.form.value.return_quantity, 
  //     return_description: this.form.value.return_description, return_date: fecha, pend_id: parseInt(this.data.row.pend_id,10) }).subscribe((data:any)=>{
  //       console.log(data)
  //     },
  //     err=>{console.log(err)
  //       this.loginService.logout();
  //       window.location.assign("https://sedacreditaciones.com/app/patrimonio")      
  //     }
  //     );
  // }

}

export interface categ{
  type: string,
  id_category: number,
  name_category:string,
  hijo: categ[] 
}

