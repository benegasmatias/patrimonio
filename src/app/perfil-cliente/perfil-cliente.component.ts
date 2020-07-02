import { Component, OnInit } from '@angular/core';
import { PerfilClienteService } from './services/perfil-cliente.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss']
})
export class PerfilClienteComponent implements OnInit {

  public perfilCliente:PerfilClienteService;
  public monedas2:  OBJ[] =[] ;
  //oculta la contraseña con el boton
  public hide = true;

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    academia: new FormControl('', Validators.required),
    moneda: new FormControl('', Validators.required),
    pais: new FormControl(''),
    provincia: new FormControl(''),
    calle: new FormControl(''),
    numero: new FormControl(''),
    pisoDepto: new FormControl('')
  });

  constructor(perf:PerfilClienteService,http:HttpClient) {
    this.perfilCliente=perf;
   }

  ngOnInit(): void {
    this.tomaMonedas();
  }

  enviar() {
    console.log(this.form.value);

    this.perfilCliente.enviar(this.form.value)   
    .subscribe(
      result => {
        console.log(result)
      },
      error => {
        console.log(error)
      });
     
  }

 public tomaMonedas()
  {
     this.perfilCliente.recuperamonedas()   
     .subscribe (res => {
       this.monedas2= res[0];
       console.log (this.monedas2)
      },
      error => {
        console.log(error)
        return {};
      });
  }
}


export interface Direccion {

  pais: string;
  provincia: string;
  calle: string;
  numero: number;
  pisoDepto: number;
}

export interface OBJ{
  id: number,
  nombre: string
}
