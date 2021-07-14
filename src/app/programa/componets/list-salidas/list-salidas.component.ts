import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from 'src/app/services/inventario.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {pdfServiceSalida} from './pdfServiceSalida/pdfServiceSalida';
import { LoginService } from 'src/app/login/services/login.service';
import { EditNodatComponent } from 'src/app/salida/components/editNodat-form/editNodat-form.component';

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
  inventarioss2=false
  noInventarios2=false
  //Fin alerts

  iventarioData=[]
  iventarioData2=[]
  estructurasDestino=[]
  availabilities=[];
  estructuraActual=[];


  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute, private inventarioService:InventarioService, private pdfService: pdfServiceSalida, private loginService: LoginService) {}

   displayedColumns: string[] = ['name_element', 'description','marca','quantity_out','destination_id', 'availability_id','created'];
   displayedColumns2: string[] = ['name_element', /*'description',*/'marca','quantity_out','editobserv'];

   dataSource: MatTableDataSource<IventarioData>;
   struct_id=''
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort: MatSort;

   dataSource2: MatTableDataSource<IventarioData>;
   @ViewChild(MatPaginator, {static: true}) paginator2: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort2: MatSort;


  ngOnInit(): void {
   this.getInventarios()
   if(this.verifica()){
    this.displayedColumns2.pop();
  }
  }

  getInventarios(){

    this.activatedRoute.params.subscribe(
      param=>{
        if(param['struct']){
          this.inventarioService.getOutputsByStruct(param['struct']).subscribe(
            data=>{
                  this.iventarioData = data['inventario']
                  this.estructurasDestino = data['structsDestino']
                  this.availabilities = data['availabilities'];
                  this.estructuraActual = data['structOrigin'][0];
                  this.iventarioData.forEach(element => {
                    let aux:any=[];
                    aux= this.availabilities.find(elem=> elem.id==element.availability_id );
                    element.availability_id = aux.name_availability;
                  });
                  if(this.iventarioData.length!=0){
                    console.log(this.iventarioData)
                    this.iventarioData.forEach(element => {
                      let aux:any=[];
                      aux= this.estructurasDestino.find(elem=> elem.id==element.destination_id);
                      element.destination_id= aux.name;
                    });
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
            err=>{
              console.log(err)
              this.loginService.logout();
              window.location.assign("https://sedacreditaciones.com/app/patrimonio")
            }
          )


          this.inventarioService.getOutputsByStructNodata(param['struct']).subscribe((data:any)=>{
            console.log(data)
            this.iventarioData2 = data['inventario']
            this.estructuraActual = data['structOrigin'][0];

            if(this.iventarioData2.length!=0){
              this.inventarioss2=true
              this.noInventarios2=false
            }else{
              this.inventarioss2=false
              this.noInventarios2=true
            }
            this.dataSource2 = new MatTableDataSource(this.iventarioData2);
            this.dataSource2.paginator = this.paginator2;
            this.dataSource2.sort = this.sort2;
          },
          err=>{
            console.log(err)
          })
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

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.trim().toLowerCase().match(/^\d{4}/) && filterValue.trim().toLowerCase().length==4){
      this.dataSource2.filter= filterValue.trim().toLowerCase() +'-';
      (event.target as HTMLInputElement).value= this.dataSource2.filter;
    }
    else{
      this.dataSource2.filter = filterValue.trim().toLowerCase();
    }
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  generaPdfDonaciones(){
    if(this.dataSource.filter.slice(5))
    {
      var aux;
      var n = parseInt(this.dataSource.filter.slice(5), aux)
      if(typeof n == 'number' && n<=12)
      {
        var datos=[];
        this.dataSource.filteredData.forEach((element:any) => {
          if(element.availability_id=='donacion')
            datos.push(element);
        });
        this.pdfService.generatePdf(datos,this.estructuraActual['name'],n,0);
      }
    }

  }

  generaPdfEntregas(){
    if(this.dataSource.filter.slice(5))
    {
      var aux;
      var n = parseInt(this.dataSource.filter.slice(5), aux)
      if(typeof n == 'number' && n<=12)
      {
        var datos=[];
        this.dataSource.filteredData.forEach((element:any) => {
          if(element.availability_id=='entrega')
            datos.push(element);
        });
        this.pdfService.generatePdf(datos,this.estructuraActual['name'],n,1);
      }
    }

  }

  editEnvio(element){
    console.log(element);

    const dialogref = this.dialog.open(EditNodatComponent, {
      data: {title: 'Editar Cantidad',element:element,origin_id:this.struct_id}
		});

		dialogref.afterClosed().subscribe(result => {
			if (result.confirm== true) {
        this.getInventarios()
			}
		});
  }

  verifica(){
    let aux= this.loginService.getRol();
    return (aux=="guest");
  }
}

