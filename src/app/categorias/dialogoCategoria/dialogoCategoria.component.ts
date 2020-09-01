import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
import { lista } from '../categorias.component';

@Component({
  selector: 'dialogoCategoriaComponent', // Replace with your own selector
  templateUrl: './dialogoCategoria.html'
})

export class dialogoCategoriaComponent { 

  public datos: lista[];
  form: FormGroup;          
  formB: FormBuilder;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public fb: FormBuilder,private dialogRef: MatDialogRef<dialogoCategoriaComponent>,
  ) { 
    this.datos= data.nombre;
    this.formB=fb;

    console.log(this.datos)

    var x:lista[]=[];
    this.datos.forEach(y => {
  
        if(!y.get())
          this.itera(x,y); 
        else
          x.push(y);       
    });
    this.datos=x;
    console.log(this.datos)

  }


  ngOnInit() {
    this.form = this.formB.group({
        categoria: ['', []],    
        padre: ['',[]] ,
        valor: ['confirm',[]]   
    });
}

public itera(x,y){
  x.push(y);
  if(!y.get()){
  y.hijo.forEach(z => {
    this.itera(x,z); 
  });

}
}

  public save(){
    this.dialogRef.close(this.form.value);
  }
  
}
