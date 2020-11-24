import { Component, OnInit } from '@angular/core';

import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isloged = false;
  spinner = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private loginService: LoginService, protected route: Router) {}

  ngOnInit() {
    //posisiciona el scrol en las coordenadas x y
    document.getElementById('username').focus({ preventScroll: false });
  }

  login() {
    let usuario;
    this.spinner = true;
    this.isloged = false;
    console.log(this.form.value)
    this.loginService.login(this.form.value).subscribe(
      (data) => {
        usuario = data['token']
       
        this.loginService.setUser(usuario);
        console.log(usuario)
        //academia = usuario['usuario']['academia'];
        //  this.loginService.getUser();
        // this.loginService.getAcademia();

        this.loginService.setToken(usuario);
        // this.loginService.setAcademia(academia);

        this.route.navigateByUrl('panel');
      },
      (err) => {
        console.log(err);
        this.isloged = true;
        this.spinner = false;
      },
      () => {}
    );
  }
}
