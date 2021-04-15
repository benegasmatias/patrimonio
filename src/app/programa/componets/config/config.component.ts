import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router';
import { InputService } from 'src/app/services/input.service';
import { LoginService } from '../../../login/services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StructService } from 'src/app/services/struct.service';




@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
 
})



export class ConfigComponent implements OnInit {


  spinnerInput= false
  noInputs=false
  spinnerGuardar= false;
  spinnerEliminar= false;

  form = new FormGroup({
    name: new FormControl('', []),

  });
  struct= null;

  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute, private loginService: LoginService, private structService: StructService) { }


  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.spinnerInput = true
      console.log(params)
      this.structService.getStruct(params.struct).subscribe((data:any)=>{
        this.struct= data.struct;
        console.log(this.struct)
        this.form.get('name').setValue(this.struct.name)
      },
      err=>{
        console.log(err)
      })
    });
  }

  edit(){
    this.spinnerGuardar=true;
    console.log(this.form.get('name').value)
    this.structService.editStruct({
      struct_id: this.struct.id,
      name: this.form.get('name').value
    }).subscribe((data:any)=>{      
      this.spinnerGuardar=false;
      //window.location.assign("https://sedacreditaciones.com/app/patrimonio/panel")
      window.location.assign("/panel")
    },
    err=>{
      console.log(err)
    })
  }

  delete(){
    if(confirm("¿Seguro que desea eliminar?\nSe Elminarain todas las entradas y salidas relacionadas")){
      this.spinnerEliminar=true;
      this.structService.deleteStruct({
        struct_id: this.struct.id,
      }).subscribe((data:any)=>{      
        console.log(data)
        this.spinnerEliminar=false;
        //window.location.assign("https://sedacreditaciones.com/app/patrimonio/panel")
        window.location.assign("/panel")
      },
      err=>{
        console.log(err)
        this.spinnerEliminar=false;
      })
    }
  }

  verifica(){
    let aux= this.loginService.getRol();
    return (aux=="guest");    
  }
}




