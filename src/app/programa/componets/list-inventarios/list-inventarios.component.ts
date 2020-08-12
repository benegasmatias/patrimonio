import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface IventarioData {
  id_element: string;
  name_element: string;
  description: string;
  stock: string;
}
@Component({
  selector: 'app-list-inventarios',
  templateUrl: './list-inventarios.component.html',
  styleUrls: ['./list-inventarios.component.scss']
})
export class ListInventariosComponent implements OnInit {
  iventarioData=[]
  displayedColumns: string[] = ['id_element', 'name_element', 'description', 'stock'];
  dataSource: MatTableDataSource<IventarioData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private activatedRoute:ActivatedRoute, private inventarioService:InventarioService) {

   }

  

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
     param=>{
       if(param['struct']){
         this.inventarioService.getIventariosByStruct(param['struct']).subscribe(
           data=>{
             this.iventarioData = data['inventario']
             console.log(this.iventarioData)
             
             this.dataSource = new MatTableDataSource(this.iventarioData);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
           },
           err=>{console.log(err)}
         )
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

