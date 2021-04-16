import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';

import { LoginService } from '../../../login/services/login.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { SalidaFormComponent } from 'src/app/salida/components/salida-form/salida-form.component';
import { MatDialog } from '@angular/material/dialog';
import {pdfServiceInventarios} from './pdfServiceInventarios/pdfServiceInventarios';


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
  inventarioss=false
  noInventarios=false
  //alerts
  salidaGenerada=false

  //Fin alerts
  iventarioData=[]
  estructuraActual='';
  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute, private inventarioService:InventarioService, private loginService: LoginService,private pdfService: pdfServiceInventarios,) {}
   displayedColumns: string[] = [ 'name_element', 'description','marca', 'stock','action'];
   dataSource: MatTableDataSource<IventarioData>;
   struct_id=''
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {    
    this.getInventarios()
    if(this.verifica()){
      this.displayedColumns.pop();
    }
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
    
      return data[sortHeaderId];
    };
  }

  getInventarios(){
    this.activatedRoute.params.subscribe(
      param=>{
        if(param['struct']){
          this.inventarioService.getIventariosByStruct(param['struct']).subscribe(
            data=>{
                console.log(data);
                
              this.iventarioData = data['inventario'];
              this.estructuraActual= data['struct'];
              console.log(this.estructuraActual)

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
              this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
                if (typeof data[sortHeaderId] === 'string') {
                  return data[sortHeaderId].toLocaleLowerCase();
                }
              
                return data[sortHeaderId];
              };
            },
            err=>{
              console.log(err)
              this.loginService.logout();
              window.location.assign("https://sedacreditaciones.com/app/patrimonio")  
            }
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

  addSalida(element){
    const dialogref = this.dialog.open(SalidaFormComponent, {
      data: {title: 'Generar Salida',element:element,origin_id:this.struct_id}
		});

		dialogref.afterClosed().subscribe(result => {
			if (result.confirm== true) {
        this.salidaGenerada=true
        this.getInventarios()
			}else {
        
      }
		});
  }

  verifica(){
    let aux= this.loginService.getRol();
    return (aux=="guest");    
  }

  generaPdf(){
    let datos=  this.dataSource.filteredData
    console.log(datos)
    this.pdfService.generatePdf(datos,this.estructuraActual);      
  }  
}

