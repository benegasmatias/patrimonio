import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-clientes',
  templateUrl: './navbar-clientes.component.html',
  styleUrls: ['./navbar-clientes.component.scss']
})
export class NavbarClientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

}
