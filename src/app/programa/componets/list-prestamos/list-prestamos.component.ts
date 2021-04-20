import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';  
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PendingFormComponent } from '../pending-form/pending-form.component';
import {PdfService} from './pdfService/pdfService';
import { LoginService } from '../../../login/services/login.service';


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

  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute, private inventarioService:InventarioService,private pdfService: PdfService, private loginService: LoginService) {
  }

   displayedColumns: string[] = ['name_element', 'description','quantity_out','mark','destination_id','created', 'estado','action', ];
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
            (data:any)=>{
              console.log(data)
                  this.inventarioData = data['inventario'];
                  this.estructurasDestino = data['structsDestino'];
                  this.estructuraActual = data['structOrigin'][0];
                  this.inventarioData.forEach(element => {
                    let aux:any=[];
                    aux= this.estructurasDestino.find(elem=> elem.id==element.destination_id);
                    element.destination_id= aux.name;
                    element.typeDestino= aux.nombreType;
                    if(element.return_date){
                      element.return_date=true;
                    }
                    else
                      element.return_date=false;
                  });
                  if(this.inventarioData.length!=0){
                    this.inventarioss=true
                    this.noInventarios=false
                  }else{
                    this.inventarioss=false
                    this.noInventarios=true
                  }
                  this.struct_id = param['struct'];
                  this.dataSource = new MatTableDataSource(this.inventarioData);

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
    if(filterValue.trim().toLowerCase().match(/^\d{4}/) && filterValue.trim().toLowerCase().length==4){
      this.dataSource.filter= filterValue.trim().toLowerCase() +'-';
      (event.target as HTMLInputElement).value= this.dataSource.filter;
    }
    else{
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  datoPrestamo(datos){

    if(this.verifica()){
      if( datos.return_date){
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
    }
    else{
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
  }

  generaPdf(){
    if(this.dataSource.filter.slice(5))
    {
      var aux;
      var n = parseInt(this.dataSource.filter.slice(5), aux)
      var datos: DatosPDf[]=[];
      if(typeof n == 'number' && n<=12)
      {
        // var contador=0;
        // this.dataSource.filteredData.forEach((element:any)=>{//elimina para sacar limitacion de devuelto
        //   if(element.return_date){
        //     contador++;
        //   }
        // });
        this.dataSource.filteredData.forEach((element:any) => {
          // if(element.return_date)//elimina para sacar limitacion de devuelto
          this.inventarioService.getPrestamo(element.pend_id).subscribe((dat:any)=>{              
            datos.push({
              expected_date: dat.pending[0].expected_date ,
              phone_number: dat.pending[0].phone_number ,
              receiver_name: dat.pending[0].receiver_name ,
              return_date: dat.pending[0].return_date ,
              return_description: dat.pending[0].return_description ,
              return_quantity: dat.pending[0].return_quantity ,
              availability_id: element.availability_id,
              created: element.created,            ​
              description: element.description,
              destination_id: element.destination_id,
              name_element: element.name_element,
              origin_id: element.origin_id,
              quantity_out: element.quantity_out,
              typeDestino: element.typeDestino,
              autoriza: element.autoriza,
              mark_name: element.mark_name,
            });   
            // if(contador==datos.length){
            //   this.pdfService.generatePdf(datos,this.estructuraActual,n);
            // }
            if(this.dataSource.filteredData.length==datos.length){
              //this.dataSource.filteredData.length==datos.length para sacar limitacion de devuelto
              this.pdfService.generatePdf(datos,this.estructuraActual,n);
            }
          },
          err=>{
            console.log(err);
            this.loginService.logout();
            window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          })

        });
      }
    }       
    
  }  

  verifica(){
    let aux= this.loginService.getRol();
    return (aux=="guest");    
  }

  verificabutt(row){
    let aux= this.loginService.getRol();
    if(aux=="guest" && row.return_date)
      return true;
    else
      if(aux=="user"|| aux=="admin"){
        return true;
      }
      else
        return false;
  }
}

interface DatosPDf{
  expected_date: any ,
  phone_number: any ,
  receiver_name: any ,
  return_date: any ,
  return_description: any ,
  return_quantity: any ,
  availability_id: any,
  created: any,            ​
  description: any,
  destination_id: any,
  name_element: any,
  origin_id: any,
  quantity_out: any,
  typeDestino: any,
  autoriza:any,
  mark_name:any,
}