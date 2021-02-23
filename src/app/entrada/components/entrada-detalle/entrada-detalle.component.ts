import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ElementoService } from 'src/app/elemento/service/elemento.service';


@Component({
  selector: 'app-entrada-detalle',
  templateUrl: './entrada-detalle.component.html',
  styleUrls: ['./entrada-detalle.component.scss']
})
export class EntradaDetalleComponent implements OnInit {
  


  total=0;

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EntradaDetalleComponent>, private serviceElement: ElementoService,
  ) { }
  

  ngOnInit(): void {
   for(let i=0; i<this.data.input.length;i++){
     let cant = parseInt(this.data.input[i]._joinData.quantity)
      this.total = this.total+cant      
   }

   this.data.input.forEach(element => {
    this.serviceElement.getMarkbyId(element.mark_id).subscribe((data:any)=>{
      element.mark_name= data.mark.name;
    },
    err=>{
      console.log(err)
    })
  });
  console.log(this.data.input)
  }

  
  close(){
    this.dialogref.close()
  }

  save(){
    this.dialogref.close({confirm:true})
  }
}



