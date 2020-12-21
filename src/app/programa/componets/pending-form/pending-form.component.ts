import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OutputService } from 'src/app/services/output.service';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InventarioService } from 'src/app/services/inventario.service';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-pending-form',
  templateUrl: './pending-form.component.html',
  styleUrls: ['./pending-form.component.scss']
})
export class PendingFormComponent implements OnInit {

  modifica= true;
  cantidad= false;

  form = null;

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<PendingFormComponent>,private dialog:MatDialog,private outputService:OutputService, private datePipe: DatePipe, private inventarioservice:InventarioService, private loginService:LoginService) {
    if(this.data.row.return_date){
      this.modifica= true;
    }
    else
      this.modifica= false;

    this.form= new FormGroup({
      expected_date: new FormControl({value: '', disabled: true},Validators.required),
      phone_number: new FormControl({value: '', disabled: true}, Validators.required),
      receiver_name: new FormControl({value: '', disabled: true}, Validators.required),
      return_date: new FormControl({value: '', disabled: this.modifica}, Validators.required),
      return_description: new FormControl({value: '', disabled: this.modifica}, Validators.required),
      return_quantity: new FormControl({value: '', disabled: this.modifica}, [Validators.required,Validators.min(1),Validators.max(this.data.row.quantity_out)]),
      quantity_out: new FormControl({value: '', disabled: true},Validators.required),
    });
   }

  ngOnInit(): void {    
    this.inventarioservice.getPrestamo(this.data.row.pend_id).subscribe((dat:any)=>{
      this.form.setValue({
        expected_date: dat.pending[0].expected_date ,
        phone_number: dat.pending[0].phone_number ,
        receiver_name: dat.pending[0].receiver_name ,
        return_date: dat.pending[0].return_date ,
        return_description: dat.pending[0].return_description ,
        return_quantity: dat.pending[0].return_quantity ,
        quantity_out: this.data.row.quantity_out,
      })
      console.log(this.data.row)
    },
    err=>{
      console.log(err);
      this.loginService.logout();
      window.location.assign("/")
    })
  }

  get form_cant() { return this.form.get('return_quantity'); }


  close(){
    this.dialogref.close({confirm:false})
  }

  save(){
    var fecha= this.datePipe.transform(this.form.value.return_date,"yyyy-MM-dd");
    this.inventarioservice.updatePrestamo({return_quantity: this.form.value.return_quantity, 
      return_description: this.form.value.return_description, return_date: fecha, pend_id: parseInt(this.data.row.pend_id,10) }).subscribe((data:any)=>{
        console.log(data)
      },
      err=>{console.log(err)
        this.loginService.logout();
        window.location.assign("/")      
      }
      );

    this.dialogref.close({confirm:true, })
  }



}
