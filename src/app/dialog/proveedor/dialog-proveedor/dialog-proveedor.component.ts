import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ProveedorService} from '../../../services/proveedor.service'
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-dialog-proveedor',
  templateUrl: './dialog-proveedor.component.html',
  styleUrls: ['./dialog-proveedor.component.scss']
})
export class DialogProveedorComponent implements OnInit {
  
  form = new FormGroup({
    name: new FormControl('', Validators.required),

  });
 

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<DialogProveedorComponent>,private serviceProveedor:ProveedorService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogref.close({confirm:false});
  }

  save(){
    let mayus:string = this.form.get('name').value
    this.form.get('name').setValue(mayus.toUpperCase())
    

    this.serviceProveedor.addProvider(this.form.value).subscribe(
      data=>console.log(data),
      err=>{
        console.log(err);
        // this.loginService.logout();
        // window.location.assign("/")
      }
    )
    this.dialogref.close({confirm:true})
  }
  
  close(){
    this.dialogref.close()
  }
}
