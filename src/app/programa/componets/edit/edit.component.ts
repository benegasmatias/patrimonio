import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatButton} from '@angular/material/button'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  title= "Editando"
  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<EditComponent>) { }

  

  ngOnInit(): void {

  }

  close(){
    this.dialogref.close()
  }

  save(){
    this.dialogref.close({confirm:true})
  }
}
