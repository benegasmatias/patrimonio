import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { StructService } from 'src/app/services/struct.service';
import { TypestructComponent } from '../typestruct/typestruct.component';

@Component({
  selector: 'app-struct',
  templateUrl: './struct.component.html',
  styleUrls: ['./struct.component.scss']
})
export class StructComponent implements OnInit {

  //SPINNERS
   spinnerTypeStruct=false;
  //FIN SPINNERS
  
  addTypeStruct = true

  typeStructs:any[];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialog,private dialogRef: MatDialogRef<StructComponent>, private serviceStruct:StructService) { }
  
  form= new FormGroup({  
    name: new FormControl ('', Validators.required),
    origin_struct_id:new FormControl(''),
    type_struct_id: new FormControl('',Validators.required)
  });   




  ngOnInit(): void {
     console.log(this.data)
     //this.typeStructs= []

    this.spinnerTypeStruct=false;
     //set el origen id a externo
     this.form.get('origin_struct_id').setValue(this.data.origin_id)

     this.getTypeStruct()
    
  }

  getTypeStruct(){
    this.serviceStruct.getTypeStructs().subscribe(
      data=>{
        this.spinnerTypeStruct=true;
        this.typeStructs = data['types_structs'];
        console.log(this.typeStructs)
      }
    )
  }
  
  public save(){
    console.log(this.form.get('type_struct_id'))
    this.serviceStruct.addStruct(this.form.value).subscribe(
      data=>{
     
      }
    )
    this.dialogRef.close(this.form.value);
  }

  addTypeStruc(){

    const dialogref = this.dialog.open(TypestructComponent, {
      data: {title: 'Nuevo tipo de estructura'}
		});

		dialogref.afterClosed().subscribe(result => {
			console.log(result);
			if (result) {
        // this.salidaGenerada=true 
        // this.getInventarios()
        this.getTypeStruct()
			}else {
        
      }
		});
  }




}
