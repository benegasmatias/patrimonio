import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { InputService } from 'src/app/services/input.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-envio-form',
  templateUrl: './envio-form.component.html',
  styleUrls: ['./envio-form.component.scss']
})
export class EnvioFormComponent implements OnInit {

  form = new FormGroup({
    origin_id: new FormControl(''),
    observation: new FormControl('', Validators.required),
    inp_elem_id: new FormControl(''),
  });

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EnvioFormComponent>,private dialog:MatDialog,private inputService:InputService, private datePipe: DatePipe, private loginService:LoginService) { }

  ngOnInit(): void {

    this.inputService.getObservation(this.data.element.inp_elem_id).subscribe((data:any)=>{
      console.log(data.inpElem)
      this.form.get('observation').setValue(data.inpElem.observation)
      this.form.get('inp_elem_id').setValue(data.inpElem.id)
    },
    err=>{
      console.log(err)
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    });
  }

  close(){
    this.dialogref.close({confirm:false})
  }

  save(){
    if(this.form.valid){
      this.inputService.setObservation(this.form.value).subscribe((data:any)=>{
        console.log(data)
        this.dialogref.close({confirm:true})
      },
      err=>{
        console.log(err)
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      });
    }
  }

}
