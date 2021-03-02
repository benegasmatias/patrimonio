import { Component, OnInit, ViewChild } from '@angular/core';

import {MatDialog} from '@angular/material/dialog'

import {EntradaDetalleComponent} from '../../../entrada/components/entrada-detalle/entrada-detalle.component'
import {EntradaDeleteComponent} from '../../../entrada/components/entrada-delete/entrada-delete.component'
import {EntradaEditComponent} from '../../../entrada/components/entrada-edit/entrada-edit.component'


import { ActivatedRoute } from '@angular/router';
import { InputService } from 'src/app/services/input.service';
import { LoginService } from '../../../login/services/login.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { element } from 'protractor';

export interface provider{
  id:string;
  created:string;
  name:string;
}

export interface ElementData {
  id_element:string;
  name_element:string;
  description:string;
  quantity:string;
  mark_id:string;
  category_of_element_id:string;
}

export interface InputData {
  id: string;
  number_refer: string;
  created: string;
  elements: ElementData[];
  provider: provider;
  name_element: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
 
})



export class ListComponent implements OnInit {
  cantElementos=0;


  spinnerInput= false
  noInputs=false

  hola=true
  title;


  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute,private serviceInput:InputService, private loginService: LoginService) { }
  inputs=[]
  displayedColumns: string[] = [ 'number_refer', 'created','name_element','elements','actions', 'modify'];
  dataSource: MatTableDataSource<InputData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit(): void {
    this.cargaTabla();
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
    
      return data[sortHeaderId];
    };
  }

  public cargaTabla(){
    this.inputs= []
    this.activatedRoute.params.subscribe(params => {
    this.spinnerInput = true
    this.title = params['id'];
    this.serviceInput.getInputByStruct(params['id']).subscribe(
      data=>{
        this.inputs = data['inputs']
        this.inputs.forEach(element => {
          element.name_element= element.elements[0].name_element;
        });
        this.dataSource = new MatTableDataSource(this.inputs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
          if (typeof data[sortHeaderId] === 'string') {
            return data[sortHeaderId].toLocaleLowerCase();
          }
        
          return data[sortHeaderId];
        };
        
        if(data['inputs'].length!=0){
        this.spinnerInput=false
          
      }else{
        this.noInputs=true
      }
 
      },
      err =>{
        console.log(err)
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )

  });
    if(this.verifica()){
      this.displayedColumns.pop();      
    }
  }

  edit(row): void {
		const dialogref = this.dialog.open(EntradaEditComponent, {
      data: {row: row}
		});

		dialogref.afterClosed().subscribe(result => {
			console.log(result);
			if (result.confirm) {
        this.cargaTabla();
			}
    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    });
  }


  verEntrada(input:ElementData[]): void {
		const dialogref = this.dialog.open(EntradaDetalleComponent, {
      data: {title: 'Elementos',input}
		});
  }
  
  eliminaEntrada(input:any): void{
    const dialogref = this.dialog.open(EntradaDeleteComponent, {
      data: {title: 'Eliminar Entrada',
      input:input.id,
      elements:input.elements,
    }
    });
    dialogref.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.ngOnInit();
      }      
    })

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
}




