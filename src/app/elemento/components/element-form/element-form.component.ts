import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../model/categoria';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import {ElementoService} from '../../service/elemento.service'

@Component({
  selector: 'app-element-form',
  templateUrl: './element-form.component.html',
  styleUrls: ['./element-form.component.scss']
})
export class ElementFormComponent implements OnInit {
  categorias:Categoria[]=[]

   hide = true;

   form = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cantidad: new FormControl('', [Validators.required, Validators.maxLength(9)]),
    descripcion: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    categoria: new FormControl([]),

  });

  constructor(private elementoService:ElementoService) { }

  ngOnInit(): void {
    this.elementoService.getDisponibilidades().subscribe(
      data=>{
        console.log(data)
      }
     );
    for(var i=0;i<6;i++){
      let cat = new Categoria
    cat.id_category=`${i}`;
    cat.name_category=`negro${i}`
    this.categorias.push(cat)}
    console.log(this.categorias)
  }

  enviar(){}

  //Chips

  onCatRemoved(catRem: string) {
    const cat = this.form.value.categoria;
    this.removeFirst(cat, catRem);
    this.form.setValue({
      name:this.form.value.name,
      categ: cat,
      descC: this.form.value.descC,
      descL:this.form.value.descL,
      url: this.form.value.url,
      precio: this.form.value.precio,
    }); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }


}
