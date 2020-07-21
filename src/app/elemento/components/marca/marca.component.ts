import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementoService } from '../../service/elemento.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent implements OnInit {
  title

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });


  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<DialogComponent>,private serviceElement:ElementoService) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogref.close({confirm:false});
  }

  save(){
    let mayus:string = this.form.get('name').value
    this.form.get('name').setValue(mayus.toUpperCase())
    

    this.serviceElement.addMarca(this.form.value).subscribe(
      data=>console.log(data)
    )
    this.dialogref.close({confirm:true})
  }
  
  close(){
    this.dialogref.close()
  }


}
