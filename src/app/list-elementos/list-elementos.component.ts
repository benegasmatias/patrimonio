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
displayedColumns: string[] = [ 'name_element', 'description','mark_name','estado'];

dataSource: MatTableDataSource<Elementos>;

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

///////////////////////////////////////////////////////////////////////////////
  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute,private serviceInput:InputService,private loginService: LoginService, private servicioInventario: InventarioService) { }

  ngOnInit(): void {
    //this.cargaTabla();
    this.servicioInventario.getAllElements().subscribe((data:any)=>{
      console.log(data.list_elem)
      this.elementos= data.list_elem;
      this.dataSource = new MatTableDataSource(this.elementos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    err=>{
      console.log(err)
    })
    // this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
    //   if (typeof data[sortHeaderId] === 'string') {
    //     return data[sortHeaderId].toLocaleLowerCase();
    //   }
    
    //   return data[sortHeaderId];
    // };
  }
  public cargaTabla(){

    // this.inputs= []
    // this.spinnerInput = true
    // this.serviceInput.getInputByStruct(1).subscribe(
    //   data=>{
    //     this.inputs = data['inputs']
    //     this.inputs.forEach(element => {
    //       element.name_element= element.elements[0].name_element;
    //     });
    //     this.dataSource = new MatTableDataSource(this.inputs);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;

    //     this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
    //       if (typeof data[sortHeaderId] === 'string') {
    //         return data[sortHeaderId].toLocaleLowerCase();
    //       }
        
    //       return data[sortHeaderId];
    //     };
        
    //     if(data['inputs'].length!=0){
    //     this.spinnerInput=false
          
    //   }else{
    //     this.noInputs=true
    //   }
 
    //   },
    //   err =>{
    //     console.log(err)
    //     this.loginService.logout();
    //     window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    //   }
    // )

    // if(this.verifica()){
    //   this.displayedColumns.pop();      
    // }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verifica(){
    let aux= this.loginService.getRol();
    return (aux=="guest");    
  }

  estado(row){

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
