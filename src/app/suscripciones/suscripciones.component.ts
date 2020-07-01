import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.scss']
})
export class SuscripcionesComponent implements OnInit {

  suscripciones: any =['','','']
  constructor() { }

  ngOnInit(): void {
  }

}
