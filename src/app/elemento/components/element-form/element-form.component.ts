import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../model/categoria';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import {ElementoService} from '../../service/elemento.service'
import { Marca } from '../../model/marca';

import {MatDialog} from '@angular/material/dialog'
import { MarcaComponent } from '../marca/marca.component';

@Component({
  selector: 'app-element-form',
  templateUrl: './element-form.component.html',
  styleUrls: ['./element-form.component.scss']
})
export class ElementFormComponent implements OnInit {
  availabilitys:Categoria[]=[]
  marcas:Marca[] = []

   hide = true;

   form = new FormGroup({
    name_element: new FormControl('', Validators.required),

    description: new FormControl('', Validators.required),
    mark_id: new FormControl('', Validators.required),
   // availabilitys: new FormControl([]),
   category_of_element_id: new FormControl('',Validators.required)
  });

  constructor(private elementoService:ElementoService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.elementoService.getDisponibilidades().subscribe(
      data=>{
        console.log(data)
        this.availabilitys = data['availabilitys'];
      })
      this.elementoService.getMarcas().subscribe(
        data=>{
          console.log(data)
          this.marcas = data['marks']
        }
      )

    }


  enviar(){
    console.log(this.form.value)
    this.elementoService.addElement(this.form.value).subscribe(
      data=>{
        console.log(data)
      }
    )
  }

  //Chips

  onCatRemoved(avaRem: string) {
    const ava = this.form.value.availabilitys;
    this.removeFirst(ava, avaRem);
    this.form.setValue({
      name:this.form.value.name,
      categ: ava,
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

  //Marcas

  addMarca(): void {
		const dialogref = this.dialog.open(MarcaComponent, {
      data: {title: 'Nueva Marca'}
		});

		dialogref.afterClosed().subscribe(result => {
			
			if (result.confirm) {
      this.elementoService.getMarcas().subscribe(
        data=>{
          console.log(data)
          this.marcas = data['marks']
        }
      )
      }
    });
    
	}


}
