import { Component, OnInit } from '@angular/core';

import { LoginUser } from 'src/app/models/login-user';
import {LoginService} from './services/login.service';
import {Router} from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:LoginUser={
    api_token:"",
    created_at: "",
    email: "",
    id: "",
    name: "",
    updated_at: "",
    username: "",
    password :""
  };
 
  isloged=false;
  spinner=false;

  form = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });
 
   constructor(private loginService:LoginService,protected route:Router) { }
 
   ngOnInit() {
   }
 
   login(){
    let usuario
    this.spinner=true
    this.isloged=false
 
    this.loginService.login(this.form.value).
    subscribe(data=>{
      this.loginService.setUser(this.user) 
     console.log(data )
     usuario = data
      this.loginService.setToken(usuario.api_token)
      this.route.navigateByUrl('panel')
      
     },
    err=>{console.log(err)
     this.isloged=true
     this.spinner=false },
     ()=>{})
   }
}
