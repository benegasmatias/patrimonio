import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-entrada-detalle',
  templateUrl: './entrada-detalle.component.html',
  styleUrls: ['./entrada-detalle.component.scss']
})
export class EntradaDetalleComponent implements OnInit {
  


  total=0;

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EntradaDetalleComponent>) { }
  

  ngOnInit(): void {
    console.log(this.data.input.length )
   for(let i=0; i<this.data.input.length;i++){
     let cant = parseInt(this.data.input[i]._joinData.quantity)
      this.total = this.total+cant
      
   }
  }

  
  close(){
    this.dialogref.close()
  }

  save(){
    this.dialogref.close({confirm:true})
  }
}



