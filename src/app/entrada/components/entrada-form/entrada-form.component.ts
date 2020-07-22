import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementoService } from 'src/app/elemento/service/elemento.service';


@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.scss']
})
export class EntradaFormComponent implements OnInit {



  elementos:any = []
  elementosSelecionados:any = []
  contadorSeleccion=0;

  form = new FormGroup({
    remito: new FormControl('', Validators.required),

  });

  
  constructor(private serviceElement:ElementoService) { }
  filterPost = ''

  ngOnInit(): void {
    this.serviceElement.getElementos().subscribe(
      data=>{
        console.log(data)
        this.elementos = data['elements']
      }
    )
  }


  

  enviar(){
    console.log(this.form.get('filterPost').value,'hola')
  }
  seleccionar(elemento:any){

    console.log(elemento,this.elementosSelecionados)
    this.elementosSelecionados.push(elemento);
    this.contadorSeleccion = this.elementosSelecionados.length;
  }
  noSeleccionar(id){

    this.elementosSelecionados.splice(id, 1);
    this.contadorSeleccion = this.elementosSelecionados.length
  }

}

export class CdkVirtualScrollDlExample {
  elementos:any[]
  elementosSelecionados:any[]
}
