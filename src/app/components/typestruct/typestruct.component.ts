import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StructService } from 'src/app/services/struct.service';
import { StructComponent } from '../struct/struct.component';
import { LoginService } from 'src/app/login/services/login.service';

@Component({
  selector: 'app-typestruct',
  templateUrl: './typestruct.component.html',
  styleUrls: ['./typestruct.component.scss']
})
export class TypestructComponent implements OnInit {

  form= new FormGroup({  
    name: new FormControl ('', Validators.required)
  });   

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<TypestructComponent>,private serviceStruct:StructService, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  
  public save(){
    this.serviceStruct.addTypeStruct(this.form.value).subscribe(
      data=>{
        this.dialogRef.close(true);
      },
      err=>{
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )
 
  }

}
