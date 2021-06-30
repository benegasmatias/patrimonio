import { Component, OnInit, ViewEncapsulation, ɵConsole,ViewChild, TemplateRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import {CategoriasService} from '../services/categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login/services/login.service';
import { InventarioService } from '../services/inventario.service';

import {MatDialog} from '@angular/material/dialog'

import { ActivatedRoute } from '@angular/router';
import { InputService } from 'src/app/services/input.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import{ FormElementosComponent} from './form-elementos/form-elementos.component';
import{ FormEditComponent} from './form-edit/form-edit.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categorias',
  templateUrl: './list-elementos.component.html',
  styleUrls: ['./list-elementos.component.scss'],
  encapsulation: ViewEncapsulation.None,

})


export class ListElementosComponent implements OnInit {

//////////////////////////////////////////////////////////////////////////////
elementos=[]
cantElementos=0;
spinnerInput= false
noInputs=false
displayedColumns: string[] = [ 'name_element', 'description','mark_name'/*,'name_category'*/,'estado','edit'];

dataSource: MatTableDataSource<Elementos>;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

///////////////////////////////////////////////////////////////////////////////
  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute,private serviceInput:InputService,private loginService: LoginService, private servicioInventario: InventarioService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargaTabla();
  }
  public cargaTabla(){
    this.elementos=[];
    this.servicioInventario.getAllElements().subscribe((data:any)=>{
      this.elementos= data.list_elem;
      this.dataSource = new MatTableDataSource(this.elementos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    err=>{
      console.log(err)
    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verifica(){
    let aux= this.loginService.getRol();
    return (aux=="guest");
  }

  estado(row,tipo){

    const dialogref = this.dialog.open(FormElementosComponent, {
      data: {title: 'Verificacion Elemento', row:row, tipo:tipo},
      width: '600px',
    });
    dialogref.afterClosed().subscribe((result:any) => {
      if(result.confirm)
        this.cargaTabla();
    });

  }

  editElem(row){
    const dialogref = this.dialog.open(FormEditComponent, {
      data: {title: 'Edicion Elemento', row:row},
      width: '600px',
    });
    dialogref.afterClosed().subscribe((result:any) => {
      if(result.confirm){
        this.cargaTabla();
        this.alert('Modificacion Guardada');
      }
    });
  }

  alert(msj) {
    this._snackBar.open(msj, 'OK', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

  }

}

export interface Elementos{
  description: string,
  id_element: number,
  mark_id:number,
  mark_name: string,
  name_element: string,
  output_id: number,
  input_id: number,
}
