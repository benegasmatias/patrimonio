import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementoService } from 'src/app/elemento/service/elemento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCantElementComponent } from 'src/app/elemento/components/dialog-cant-element/dialog-cant-element.component';

import { StructService } from 'src/app/services/struct.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { InputService } from 'src/app/services/input.service';



@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.scss']
})
export class EntradaFormComponent implements OnInit {

  stock:any = []

  keyword = 'name_element';
  data = [];

  elementos: any = []
  elementosSelecionados: any = []
  contadorSeleccion = 0;

  destinos:any=[]

  estructuras:any=[]

  categorias:any=[]

  form = new FormGroup({
    number_refer: new FormControl('', Validators.required),
    struct_id: new FormControl('',Validators.required),
    categoria: new FormControl('',Validators.required),
    estructura: new FormControl('',Validators.required),
    stock: new FormControl([])
  });


  constructor(
    private serviceElement: ElementoService,
     private dialog: MatDialog,
      private serviceStruct: StructService,
      private serviceCategorias:CategoriasService,
      private serviceInput:InputService) { }


  ngOnInit(): void {
    //Recupera El Destino
    this.serviceStruct.getTypeStructs().subscribe(
      data=>{
        this.destinos = data['types_structs']
      },
      err=>console.log(err)
    )
    //Recupera las Categorias 
    this.serviceCategorias.getCategorias().subscribe(
      data=>{
        this.categorias=data['categorysOfElements']
      },
      err=>console.log(err)
    )
  
  }

  getEstructura(){
    this.serviceStruct.getStructs(this.form.get('struct_id').value).subscribe(
      data=>{
        console.log(data)
        this.estructuras=data['structs']
      },
      err=>console.log(err)
    )
  }
  getElementByCategory(){
    this.serviceElement.getElementByCategory(this.form.get('categoria').value).subscribe(
      data=>{
        console.log(data)
        this.data = data['elements']
      }
    )
  }




  enviar() {
    this.serviceInput.addInput(this.form.value).subscribe(
      data=>{
        console.log(data)
        this.stock = []
        this.elementosSelecionados = []
        this.form.get('number_refer').setValue('')
        this.form.get('struct_id').setValue('')
        this.form.get('estructura').setValue('')
        this.form.get('categoria').setValue('')
        
      },
      err=>{
        console.log(err)
      }
    )
  }
  seleccionar(elemento: any) {


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

    const dialogref = this.dialog.open(DialogCantElementComponent, {
      data: { title: 'Cantidad de ' + item.name_element }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result.confirm) {
        if (this.elementosSelecionados.find(element => element.elemento.id_element == item.id_element)) {
          console.log(this.elementosSelecionados.find(element => element.elemento.id_element == item.id_element))
          alert("No seas hijo de puta. Como vas agregar el mismo elemento a la Lista!")
        } else {
          let elemento = {
            elemento: item,
            cantidad: result.cantidad
          }
          console.log(elemento)
          this.elementosSelecionados.push(elemento);
         this.stock.push({element_id:item.id_element,quantity:result.cantidad})
          this.contadorSeleccion = this.elementosSelecionados.length;
        }
      }
    });

  }




  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }


}

export class CdkVirtualScrollDlExample {
  elementos: any[]
  elementosSelecionados: any[]
}
