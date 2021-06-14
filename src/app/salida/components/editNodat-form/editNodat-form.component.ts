import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OutputService } from 'src/app/services/output.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-envio-form',
  templateUrl: './editNodat-form.component.html',
  styleUrls: ['./editNodat-form.component.scss']
})
export class EditNodatComponent implements OnInit {

  form = new FormGroup({
    origin_id: new FormControl(''),
    quantity_out: new FormControl('', Validators.required),
    output_id: new FormControl(''),
  });

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EditNodatComponent>,private dialog:MatDialog,private outputService:OutputService, private datePipe: DatePipe, private loginService:LoginService) { }

  ngOnInit(): void {
    this.form.get('quantity_out').setValue(this.data.element.quantity_out)
    this.form.get('output_id').setValue(this.data.element.output_id)
  }

  close(){
    this.dialogref.close({confirm:false})
  }

  save(){
    if(this.form.valid){
      this.outputService.editOutputNoData(this.form.value).subscribe((data:any)=>{
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
