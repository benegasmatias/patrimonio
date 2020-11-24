import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {InputService} from '../../../services/input.service';

@Component({
  selector: 'app-entrada-delete',
  templateUrl: './entrada-delete.component.html',
  styleUrls: ['./entrada-delete.component.scss']
})
export class EntradaDeleteComponent implements OnInit {
  
  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EntradaDeleteComponent>, public inputService: InputService) { }
  

  ngOnInit(): void {

  }

  
  close(){
    this.dialogref.close()
  }

  save(){
    this.dialogref.close({confirm:true})
  }
  borrar(){
    let input= this.data.input[0]._joinData.input_id;
    let inputelements=[];
    this.data.input.forEach(element => {
      inputelements.push(element._joinData.id)
    });    
    this.inputService.deleteInput({input_id: input, input_elements:inputelements }).subscribe(data=>{
        console.log(data)
        this.dialogref.close({confirm:true})
      },
      err=>{
        console.log(err)
      });
  }
}



