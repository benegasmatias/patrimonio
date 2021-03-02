import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {InputService} from '../../../services/input.service';
import { LoginService } from 'src/app/login/services/login.service';
@Component({
  selector: 'app-entrada-delete',
  templateUrl: './entrada-delete.component.html',
  styleUrls: ['./entrada-delete.component.scss']
})
export class EntradaDeleteComponent implements OnInit {
  
  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EntradaDeleteComponent>, public inputService: InputService, private loginService: LoginService) { }
  
  ngOnInit(): void {
    console.log(this.data)
  }
  save(){
    this.dialogref.close({confirm:false})
  }
  borrar(){
      let input= this.data.input;
      let inputelements=[];
      this.data.elements.forEach(element => {
        inputelements.push(element._joinData.id)
      });    
      this.inputService.deleteInput({input_id: input, input_elements:inputelements }).subscribe(data=>{
          this.dialogref.close({confirm:true})
        },
        err=>{
          console.log(err)
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        });
  }
}



