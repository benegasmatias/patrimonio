import { Component, OnInit } from '@angular/core';

import { LoginUser } from 'src/app/login/models/login-user';
import {LoginService} from './services/login.service';
import {Router} from '@angular/router';

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
 
   constructor(private loginService:LoginService,protected route:Router) { }
 
   ngOnInit() {
   }
 
   login(){
     let usuario
 
    this.loginService.login(this.user).
    subscribe(data=>{
      this.loginService.setUser(this.user) 
     console.log(data )
     usuario = data
      this.loginService.setToken(usuario.api_token)
      this.route.navigateByUrl('navbar')
     
     },
    err=>{console.log(err)
     this.isloged=true },
     ()=>{})
   }
}
