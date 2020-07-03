import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  cursos = false;

  constructor() {}

  ngOnInit(): void {
    console.log(sessionStorage.getItem('academia'));
  }

  consultaCursos() {}
}
