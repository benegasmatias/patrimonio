import { Component } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'

@Component({
  selector: 'dialogoNuevoStruct', // Replace with your own selector
  templateUrl: './dialogoNuevoStruct.html'
})

export class dialogoNuevoStructComponent { 

  //public datos: lista[];
  form: FormGroup;          
  formB: FormBuilder;

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public fb: FormBuilder,private dialogRef: MatDialogRef<dialogoNuevoStructComponent>,
  ) { 
    this.formB=fb;
  }


  ngOnInit() {

    this.form = this.formB.group({
      nombre: ['', []],    
      valor: ['confirm',[]]   
  });

}

  public save(){
    this.dialogRef.close(this.form.value);
  }
  
}