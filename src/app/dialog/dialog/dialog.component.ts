import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogref.close({confirm:false});
  }

  save(){
    this.dialogref.close({confirm:true})
  }
  
  close(){
    this.dialogref.close()
  }


}
