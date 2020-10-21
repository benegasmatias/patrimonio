import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';


import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { SalidaFormComponent } from 'src/app/salida/components/salida-form/salida-form.component';
import { MatDialog } from '@angular/material/dialog';

export interface IventarioData {
  id_element: string;
  name_element: string;
  description: string;
  stock_out: string;
  destination_id: string;
  created: string;
  

}
@Component({
  selector: 'app-list-salidas',
  templateUrl: './list-salidas.component.html',
  styleUrls: ['./list-salidas.component.scss']
})
export class ListSalidasComponent implements OnInit {
  inventarioss=false
  noInventarios=false

  //Fin alerts

  iventarioData=[]
  estructurasOrigen=[]
  estructurasDestino=[]
  availabilities=[];
  
  

  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute, private inventarioService:InventarioService) {}

   displayedColumns: string[] = ['name_element', 'description','quantity_out','destination_id', 'availability_id','created'];
   dataSource: MatTableDataSource<IventarioData>;
   struct_id=''
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;
 

  ngOnInit(): void {
   this.getInventarios()     
  }

  getInventarios(){
    this.activatedRoute.params.subscribe(
      param=>{
        if(param['struct']){

          this.inventarioService.getOutputsByStruct(param['struct']).subscribe(
            data=>{
                  this.iventarioData = data['inventario']
                  this.estructurasOrigen = data['structsOrigen']
                  this.estructurasDestino = data['structsDestino']
                  this.availabilities = data['availabilities'];
                  this.iventarioData.forEach(element => {
                    let aux:any=[];
                    aux= this.availabilities.find(elem=> elem.id==element.availability_id );
                    element.availability_id = aux.name_availability;
                  });

                  this.iventarioData.forEach(element => {
                    let aux:any=[];
                    aux= this.estructurasDestino.find(elem=> elem.id==element.destination_id);
                    element.destination_id= aux.name;
                  });

                  if(this.iventarioData.length!=0){
                    this.inventarioss=true
                    this.noInventarios=false
                  }else{
                    this.inventarioss=false
                    this.noInventarios=true
                  }

                  this.struct_id = param['struct']
                  this.dataSource = new MatTableDataSource(this.iventarioData);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;

            },
            err=>{console.log(err)}
          )

          // this.inventarioService.getIventariosByStruct(param['struct']).subscribe(
          //   data=>{
          //     this.iventarioData = data['inventario']
          //     console.log(this.iventarioData.length)

          //     if(this.iventarioData.length!=0){
          //       this.inventarioss=true
          //       this.noInventarios=false
          //     }else{
          //       this.inventarioss=false
          //       this.noInventarios=true
          //     }
          //     this.struct_id = param['struct']
          //     this.dataSource = new MatTableDataSource(this.iventarioData);
          //     this.dataSource.paginator = this.paginator;
          //     this.dataSource.sort = this.sort;
          //   },
          //   err=>{console.log(err)}
          // )


        }
      }
     )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

