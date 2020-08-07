import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementoService } from 'src/app/elemento/service/elemento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCantElementComponent } from 'src/app/elemento/components/dialog-cant-element/dialog-cant-element.component';

import { StructService } from 'src/app/services/struct.service';

import { InputService } from 'src/app/services/input.service';

import { ProveedorService } from 'src/app/services/proveedor.service';
import { DialogProveedorComponent } from 'src/app/dialog/proveedor/dialog-proveedor/dialog-proveedor.component';
import { ActivatedRoute } from '@angular/router';
import { ElementFormComponent } from 'src/app/elemento/components/element-form/element-form.component';
import { ThrowStmt } from '@angular/compiler';
import { CategoriasService } from 'src/app/services/categorias.service';
import { MarcaService } from 'src/app/services/marca.service';




@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.scss']
})

export class EntradaFormComponent implements OnInit {
  @ViewChild('auto') auto;

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
    categoria: new FormControl(''),
    struct_id: new FormControl(Validators.required),
    provider_id:new FormControl('',Validators.required),
    stock: new FormControl(this.stock),
    marca: new FormControl('')
  });
 


  constructor(
      private serviceElement: ElementoService,
      private dialog: MatDialog,
      private serviceStruct: StructService,
      private  serviceCategorias: CategoriasService,
      private serviceInput:InputService,
      private serviceMarca:MarcaService,
      private serviceProvider:ProveedorService,
      private activatedRoute:ActivatedRoute) {
        
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

           this.activatedRoute.params.subscribe(param=>{
            console.log(param)
            // console.log('asdasdasd', this.form.get('estructura').value)


            this.form.get('typeStruct_id').setValue(param['typeStruct'])

            if(param['struct'])
            this.params=true
            this.disabledSelect=true;
            this.getEstructura(param['struct']);

          })

    
      },
      err=>console.log(err)
    )
    //Recupera las Categorias 
    this.serviceCategorias.getCategorias().subscribe(
      data=>{
        this.categorias=data['categorysOfElements']
        this.spinnerCategory=false;
      },
      err=>console.log(err)
    )
    
      this.getMarcas()
   
    
  }//end

  getMarcas(){
    this.spinnerMarks= true;
    this.serviceMarca.getMarcas().subscribe(
      data=>{
     //   console.log(data)
        this.marcas = data['marks']
        this.spinnerMarks= false;
      },
      err=>console.log(err)
    )
    this.serviceProvider.getProviders().subscribe(
      data=>{
        this.proveedores = data['providers']
        this.spinnerProvider=false
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
          }
        )
      }else{
        this.spinnerProvider=false
      }
    });
    
  }
  
  addElement(): void {
		const dialogref = this.dialog.open(ElementFormComponent, {
      data: {title: 'Nuevo Elemento'}
		});

		dialogref.afterClosed().subscribe(element => {
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
       }
     )
      }
    });
    
	}



  getElementByMark(){
    this.spinnerElement=false;
    this.spinnerNoElement = false;
    if(!this.form.get('marca').value && this.form.get('categoria').value ){
      this.serviceElement.getElementByCategory(this.form.get('categoria').value).subscribe(
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
        err=>console.log(err)
      )}
      else
    if(!this.form.get('categoria').value && this.form.get('marca').value){
      this.serviceElement.getElementByCategory(this.form.get('marca').value).subscribe(
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
        err=>console.log(err)
      )}else{
        if(this.form.get('categoria').value && this.form.get('marca').value){
        this.serviceElement.getElementosByCategoryAndMark(this.form.get('categoria').value,this.form.get('marca').value).subscribe(
          data=>{
           this.data = data['elements']
           
           if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;
          
           }else{
            this.spinnerElement=true;
           }
          },
          err=>console.log(err)
        )}else
          {this.spinnerNoElement=true;
           this.spinnerElement=true;}
      }
  }


  getElementByCategory(){
    this.spinnerElement=false;
    this.spinnerNoElement = false;
    if(!this.form.get('categoria').value && this.form.get('marca').value){
      this.serviceElement.getElementByCategory(this.form.get('marca').value).subscribe(
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
        err=>console.log(err)
      )}else

    if(!this.form.get('marca').value && this.form.get('categoria').value ){
     this.serviceElement.getElementByCategory(this.form.get('categoria').value).subscribe(
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
       err=>console.log(err)
     )}else{
       if(this.form.get('categoria').value!= '' && this.form.get('marca').value!= ''){
         this.serviceElement.getElementosByCategoryAndMark(this.form.get('categoria').value,this.form.get('marca').value).subscribe(
           data=>{
           this.data = data['elements']
           if(this.data.length==0){
              this.spinnerNoElement=true;
              this.spinnerElement=true;
            }else{
               this.spinnerElement=true;
             }
          },
           err=>console.log(err)
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
    console.log(this.destinos)

   

    //let select = <HTMLInputElement>document.getElementById('selecEstructura')
    if(struct_id){
      this.serviceStruct.getStruct(struct_id).subscribe(
        data=>{
          console.log(data)
          this.form.get('struct_id').setValue(data['struct'].id)
          this.estructuraNombre = data['struct'].name
          // this.form.get('estructura').setValue(data['struct'].id)
        }
      )
      }else{
        if (this.form.get('struct_id').value) {
          this.serviceStruct.getStructs(this.form.get('struct_id').value).subscribe(
            data => {
              console.log(data)
              this.estructuras = data['structs']
              this.spinnerDestinoStruct = false
            },
    
            err => console.log(err)
          )
        } else {
          this.spinnerDestinoStruct = false
          this.estructuras = []
        }
      }
   
  }




  enviar() {
    this.spinnerGuardar=true
    console.log(this.form.value)
    this.serviceInput.addInput(this.form.value).subscribe(
      data=>{
        console.log(data)
        this.alertExito=true;
        this.stock = []
        this.elementosSelecionados = []
        this.form.get('number_refer').setValue('')
        this.form.get('typeStruct_id').setValue('')
        this.form.get('struct_id').setValue('')
        this.form.get('categoria').setValue('')
        this.form.get('provider_id').setValue('')
        this.spinnerGuardar=false;
      },
      err=>{
        console.log(err)
      }
    )
  }

  noSeleccionar(id) {
    this.stock.splice(id,1);
    this.elementosSelecionados.splice(id, 1);
    this.contadorSeleccion = this.elementosSelecionados.length
  }


  //autocomplet

  selectEvent(item) {
    // do something with selected item
    console.log(item.name_element)

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
          let elemento = {
            elemento: item,
            cantidad: result.cantidad
          }
          console.log(elemento)
          this.elementosSelecionados.push(elemento);
         this.stock.push({element_id:item.id_element,quantity:result.cantidad})
         console.log(this.stock)
          this.contadorSeleccion = this.elementosSelecionados.length;
        }
      }
     
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


}

export class CdkVirtualScrollDlExample {
  elementos: any[]
  elementosSelecionados: any[]
}
