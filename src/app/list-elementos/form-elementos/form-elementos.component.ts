import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InventarioService } from 'src/app/services/inventario.service';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-form-elementos',
  templateUrl: './form-elementos.component.html',
  styleUrls: ['./form-elementos.component.scss']
})
export class FormElementosComponent implements OnInit {

  modifica= false;
  cantidad= false;
  form = null;

  entradas=[];
  outputs=[];
  tipo= 0;


  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<FormElementosComponent>,private dialog:MatDialog,private datePipe: DatePipe, private inventarioservice:InventarioService, private loginService:LoginService) {

    this.tipo=data.tipo;//0: no usado , 1:en uso  
    if(this.tipo==1){
      this.inventarioservice.getIntersectElements(data.row.id_element).subscribe((datos:any)=>{
        console.log(datos)
        this.entradas=datos.entradas_element;
        this.outputs=datos.outputs_element;
      },
      err=>{
        console.log(err)
      })
    }
   }

  ngOnInit(): void {    

  }

  get form_cant() { return this.form.get('return_quantity'); }


  close(){
    this.dialogref.close({confirm:false})
  }

  delete(){
    this.inventarioservice.deleteElement(this.data.row.id_element).subscribe((data:any)=>{
      this.dialogref.close({confirm:true})
    },
    err=>{
      console.log(err)
    })

  }

}