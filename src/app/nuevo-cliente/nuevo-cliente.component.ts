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
      {id: 'ARS', description: 'Pesos argentinos (ARS)'}, 
      {id: 'BOB', description: 'Bolivianos (BOB)'},    
      {id: 'BRL', description: 'Reales brasileños (BRL)'},    
      {id: 'CLP', description: 'Pesos chilenos (CLP)'},    
      {id: 'COP', description: 'Pesos colombianos (COP)'},    
      {id: 'EUR', description: 'Euros (EUR)'},    
      {id: 'MXN', description: 'Pesos mexicanos (MXN)'},    
      {id: 'PEN', description: 'Soles peruanos (PEN)'},    
      {id: 'PYG', description: 'Guaraníes (PYG)'},    
      {id: 'USD', description: 'Dólares estadounidenses (USD)'},    
      {id: 'UYU', description: 'Pesos uruguayos (UYU)'},    

    ];    
  }
  enviar(){
    this.nuevoUsuario.enviar(this.form.value)
  }
}
export interface Option {
  id: string;
  description: string;
}
