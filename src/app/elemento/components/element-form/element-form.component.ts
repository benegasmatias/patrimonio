import { Component, OnInit, Inject } from '@angular/core';
import { Categoria } from '../../model/categoria';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ElementoService } from '../../service/elemento.service';
import { MarcaService } from '../../../services/marca.service'
import { Marca } from '../../model/marca';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MarcaComponent } from '../marca/marca.component';
import { CategoriasService } from 'src/app/services/categorias.service';


@Component({
  selector: 'app-element-form',
  templateUrl: './element-form.component.html',
  styleUrls: ['./element-form.component.scss']
})
export class ElementFormComponent implements OnInit {


  //Spinners
  spinnerGuardar = false;
  spinnerCategory = false;
  spinnerMarks = false;
  //Fin Spinners


  categorias: any = []
  marcas: Marca[] = []

  hide = true;

  form = new FormGroup({
    name_element: new FormControl('', Validators.required),

    description: new FormControl('', Validators.required),
    mark_id: new FormControl(''),
    // availabilitys: new FormControl([]),
    category_of_element_id: new FormControl('', Validators.required)
  });

  constructor(private elementoService: ElementoService, private dialog: MatDialog, private serviceCategoria: CategoriasService, private marcaService: MarcaService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogref: MatDialogRef<ElementFormComponent>) { }

  ngOnInit(): void {
    this.spinnerCategory = true
    this.spinnerMarks = true
    this.serviceCategoria.getCategorias().subscribe(
      data => {
        this.categorias = data['categorysOfElements']
        this.spinnerCategory = false
      },
      err => {

      }
    )

    this.marcaService.getMarcas().subscribe(
      data => {
        console.log(data)
        this.marcas = data['marks']
        this.spinnerMarks = false
      }
    )

  }


  enviar() {
    console.log(this.form.value)
    this.elementoService.addElement(this.form.value).subscribe(
      data => {
        console.log(data)
      }
    )

    this.dialogref.close({ element: true })

  }

  //Chips

  onCatRemoved(avaRem: string) {
    const ava = this.form.value.availabilitys;
    this.removeFirst(ava, avaRem);
    this.form.setValue({
      name: this.form.value.name,
      categ: ava,
      descC: this.form.value.descC,
      descL: this.form.value.descL,
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
          }
        )
      }
    });

  }


}
