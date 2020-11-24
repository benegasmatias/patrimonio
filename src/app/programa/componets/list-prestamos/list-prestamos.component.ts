import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';  
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PendingFormComponent } from '../pending-form/pending-form.component';
import {PdfService} from './pdfService/pdfService';


export interface IventarioData {
  id_element: string;
  name_element: string;
  description: string;
  stock_out: string;
  destination_id: string;
  created: string;
  
}
@Component({
  selector: 'app-list-prestamos',
  templateUrl: './list-prestamos.component.html',
  styleUrls: ['./list-prestamos.component.scss']
})
export class ListPrestamosComponent implements OnInit {
  inventarioss=false
  noInventarios=false

  //Fin alerts

  inventarioData=[]
  estructurasDestino=[]
  estructuraActual=[];
  availabilities=[];    

  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute, private inventarioService:InventarioService,private pdfService: PdfService) {
  }

   displayedColumns: string[] = ['name_element', 'description','quantity_out','destination_id','created', 'estado','action', ];
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
          

          this.inventarioService.getOutputsByStructPrestamo(param['struct']).subscribe(
            data=>{
                  console.log(data)
                  this.inventarioData = data['inventario'];
                  this.estructurasDestino = data['structsDestino'];
                  this.estructuraActual = data['structOrigin'][0];
                  this.inventarioData.forEach(element => {
                    let aux:any=[];
                    aux= this.estructurasDestino.find(elem=> elem.id==element.destination_id);
                    element.destination_id= aux.name;
                  });
                  if(this.inventarioData.length!=0){
                    this.inventarioss=true
                    this.noInventarios=false
                  }else{
                    this.inventarioss=false
                    this.noInventarios=true
                  }
                  this.struct_id = param['struct']        
                  this.dataSource = new MatTableDataSource(this.inventarioData);
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

  datoPrestamo(datos){
    const dialogref = this.dialog.open(PendingFormComponent, {
      data: {title: 'Datos de la Devolucion', row:datos},
      width: '600px',
		});

		dialogref.afterClosed().subscribe(result => {
      if(result){
        if (result.confirm) {
          console.log(result.data);
          this.getInventarios()
        }
      }

		});
  }

  generaPdf(){
    if(this.dataSource.filter.slice(5))
    {
      var aux;
      var n = parseInt(this.dataSource.filter.slice(5), aux)
      if(typeof n == 'number' && n<=12)
      {
        this.pdfService.generatePdf(this.dataSource.filteredData,this.estructuraActual['name'],n);
      }
    }       
    
  }  

//   if (v.match(/^\d{4}$/) !== null) {
//     this.value = v + '/';
// }

}

