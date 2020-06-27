import { Component, OnInit } from '@angular/core';
import {NuevoUsuarioService} from './services/nuevo-usuario.service';
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//
@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent implements OnInit {

public nuevoUsuario:NuevoUsuarioService;

public monedas : Option[];

public form = new FormGroup({
  name: new FormControl('',Validators.required),
  last_name: new FormControl('',Validators.required),
  username: new FormControl('',Validators.required),
  email: new FormControl('',Validators.required),
  password: new FormControl('',Validators.required),
  academia: new FormControl('',Validators.required),
  moneda: new FormControl('',Validators.required),
});

  constructor(nuevou:NuevoUsuarioService, http:HttpClient) { 
    this.nuevoUsuario=nuevou;
  }

  ngOnInit(): void {
    this.monedas = [
      {id:1,nombre:"Dolares estadounidenses (USD)"},
      {id:2,nombre:"Pesos uruguayos (UYU)"},
      {id:3,nombre:"Guaraníes (PYG)"},
      {id:4,nombre:"Soles peruanos (PEN)"},
      {id:5,nombre:"Pesos mexicanos (MXN)"},
      {id:6,nombre:"Euros (EUR)"},
      {id:7,nombre:"Pesos colombianos (COP)"},
      {id:8,nombre:"Pesos chilenos (CLP)"},
      {id:9,nombre:"Reales brasileños (BRL)"},
      {id:10,nombre:"Bolivianos (BOB)"},
      {id:11,nombre:"Pesos argentinos (ARS)"}
    ];    
  }
  enviar(){
    console.log(this.form.value)
    this.nuevoUsuario.enviar(this.form.value)   
    .subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(error)
      });
  }
}
export interface Option {
  id: number;
  nombre: string;
}
