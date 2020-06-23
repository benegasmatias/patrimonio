import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/services/login.service';
//
import {Router } from '@angular/router';
//
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(private login: LoginService,private route: Router) {    
      }
      
  ngOnInit(): void {

       // this.login.getUser();

      }
}
