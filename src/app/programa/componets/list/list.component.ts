import { Component, OnInit } from '@angular/core';

import {MatDialog} from '@angular/material/dialog'

import {EntradaDetalleComponent} from '../../../entrada/components/entrada-detalle/entrada-detalle.component'
import { ActivatedRoute } from '@angular/router';
import { InputService } from 'src/app/services/input.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
 
})
export class ListComponent implements OnInit {
  cantElementos=0;


  spinnerInput= false
  noInputs=false

  hola=true
  title;
  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute,private serviceInput:InputService) { }
 

  inputs:any=[]
  ngOnInit(): void {
  this.inputs= []
   this.activatedRoute.params.subscribe(params => {
    this.spinnerInput = true
    this.title = params['id'];
    this.serviceInput.getInputByStruct(params['id']).subscribe(
      data=>{
        console.log(data)
        this.inputs = data['inputs']
        if(this.inputs.length!=0){
        this.cantElementos = this.inputs[0].elements.length
        this.spinnerInput=false
          
      }else{
        this.noInputs=true
      }
      },
      err =>{
        console.log(err)
      }
    )
    console.log(params);

  });



  }

  edit(): void {
		const dialogref = this.dialog.open(EntradaDetalleComponent, {
      data: {title: 'austin'}
		});

		dialogref.afterClosed().subscribe(result => {
			console.log(result);
			if (result && result.status && result.status == 'saved') {
				if (result.routes && result.routes.another_guest) {
          console.log("true")
				}
        console.log("false")
			}
		});
  }


  verEntrada(input): void {
    console.log(input)
		const dialogref = this.dialog.open(EntradaDetalleComponent, {
      data: {title: 'Elementos',input}
		});

		// dialogref.afterClosed().subscribe(result => {
			
		// 	if (result.confirm) {
    //   this.marcaService.getMarcas().subscribe(
    //     data=>{
    //       console.log(data)
    //       this.marcas = data['marks']
    //     }
    //   )
    //   }
    // });
    
	}

  


}




