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

    var x = this.form.value.category_of_element_id;

    let z=[];

    x.forEach(cat => {
      this.categorias.forEach(x => {
        if(cat==x.name_category)
          z.push({category_of_element_id: x.id_category});
      });
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
 
      }
    )

    this.dialogref.close({ confirm: true })

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
          }
        )
      }
    });

  }


}
