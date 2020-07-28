import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-cant-element',
  templateUrl: './dialog-cant-element.component.html',
  styleUrls: ['./dialog-cant-element.component.scss']
})
export class DialogCantElementComponent implements OnInit {

  form = new FormGroup({
    cantidad: new FormControl('', [Validators.required,Validators.min(1)]),

  });

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<DialogCantElementComponent>) { }

  ngOnInit(): void {
  }

  
  close(){
    this.dialogref.close()
  }

  save(){
    this.dialogref.close({confirm:true,cantidad:this.form.get('cantidad').value})
  }

}
