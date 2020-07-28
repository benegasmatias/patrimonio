import { Component, OnInit } from '@angular/core';
import {ElementoDeportivo} from '../../model/elemento-deportivo'
import {MatDialog} from '@angular/material/dialog'

import {EditComponent} from '../edit/edit.component'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  title;
  constructor(private dialog:MatDialog,private activatedRoute:ActivatedRoute) { }
  elementos:ElementoDeportivo []
  ngOnInit(): void {
  
   this.activatedRoute.params.subscribe(params => {
     
    this.title = params['id'];
    console.log(params);
    this.elementos = []
      for(let i=0;i<10;i++){
        let elemento = new ElementoDeportivo;
        elemento.nombre="Negro puto"
        elemento.cantidad=`${this.title}`
        elemento.id=`${i}`
  
        this.elementos.push(elemento)
       }
  });



  }

  edit(): void {
		const dialogref = this.dialog.open(EditComponent, {
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

}
