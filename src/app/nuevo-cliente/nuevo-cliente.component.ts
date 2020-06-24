import { Component, OnInit } from '@angular/core';
import { LoginService} from '../login/services/login.service';
//
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//
@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent implements OnInit {

public login:LoginService;

form = new FormGroup({
  name: new FormControl('',Validators.required),
  apell: new FormControl('',Validators.required),
  username: new FormControl('',Validators.required),
  email: new FormControl('',Validators.required),
  password: new FormControl('',Validators.required),
  nomAcademia: new FormControl('',Validators.required),
  monPago: new FormControl('',Validators.required),
});

  constructor(loginService:LoginService, http:HttpClient) { 
    this.login=loginService;
  }

  ngOnInit(): void {
  }
  enviar(){
    //this.login.setUser(this.user)
    console.log(this.form);
  }
}
