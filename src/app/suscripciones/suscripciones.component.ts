import { Component, OnInit } from '@angular/core';
import{SuscripcioneService} from './services/suscripcione.service'

@Component({
  selector: 'app-suscripciones',
  templateUrl: './suscripciones.component.html',
  styleUrls: ['./suscripciones.component.scss']
})
export class SuscripcionesComponent implements OnInit {

  suscripciones

  constructor(private suscrip :SuscripcioneService) { 
    this.obtenerPromocion();
  
  }

  ngOnInit(): void {
  }

  private obtenerPromocion() {
    this.suscrip.pedirPromocion().subscribe(result => {
      this.suscripciones =result[0]
      this.suscricionUser();
    },
    error => {
      console.log(error)
    });

  }

  private suscricionUser(){
    let suscricionUser = JSON.parse(sessionStorage.getItem('academia')).venta_suscripcion[0]
    let indexSuscricionUser =this.suscripciones.map(function(e) { return e.id; }).indexOf(suscricionUser.id);
    this.suscripciones[indexSuscricionUser].class = 'activar'
    this.suscripciones[indexSuscricionUser].fechaVencimiento = suscricionUser.fecha_expira_suscripcion
    console.log( this.suscripciones);
  }

}
/**
 * descripcion: "En esta suscripcion, se puede tener hasta 3 cursos con un limite de 100 inscriptos para tu academia y un solo Instructor."
id: 1
limite_cursos: 3
limite_inscriptos: 0
limite_profesores: 1
nombre: "Prueba Gratis"
precio_anual: 0
precio_mensual: 0
 */