import { Component, OnInit, ViewChild } from '@angular/core';

import {MatDialog} from '@angular/material/dialog'

import {EntradaDetalleComponent} from '../../../entrada/components/entrada-detalle/entrada-detalle.component'
import { ActivatedRoute } from '@angular/router';
import { InputService } from 'src/app/services/input.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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


  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute,private serviceInput:InputService) { }
  inputs=[]
  displayedColumns: string[] = [ 'number_refer', 'created','provider','elements'];
  dataSource: MatTableDataSource<InputData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit(): void {
  this.inputs= []
   this.activatedRoute.params.subscribe(params => {
    this.spinnerInput = true
    this.title = params['id'];
    this.serviceInput.getInputByStruct(params['id']).subscribe(
      data=>{
        this.inputs = data['inputs']

        this.dataSource = new MatTableDataSource(this.inputs);
        //console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        if(this.dataSource){
       // this.cantElementos = this.dataSource.filteredData[0]elements.length
        this.spinnerInput=false
          
      }else{
        this.noInputs=true
      }
 
      },
      err =>{
        console.log(err)
      }
    )
    console.log(params);

  });



  }

  edit(): void {
		const dialogref = this.dialog.open(EntradaDetalleComponent, {
      data: {title: 'austin'}
		});

		dialogref.afterClosed().subscribe(result => {
			console.log(result);
			if (result && result.status && result.status == 'saved') {
				if (result.routes && result.routes.another_guest) {
          console.log("true")
				}
        console.log("false")
			}
		});
  }


  verEntrada(input:ElementData[]): void {
  //  console.log(input)
		const dialogref = this.dialog.open(EntradaDetalleComponent, {
      data: {title: 'Elementos',input}
		});

		// dialogref.afterClosed().subscribe(result => {
			
		// 	if (result.confirm) {
    //   this.marcaService.getMarcas().subscribe(
    //     data=>{
    //       console.log(data)
    //       this.marcas = data['marks']
    //     }
    //   )
    //   }
    // });
    
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  


}




