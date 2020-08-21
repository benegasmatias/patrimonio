import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OutputService } from 'src/app/services/output.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StructService } from 'src/app/services/struct.service';


@Component({
  selector: 'app-salida-form',
  templateUrl: './salida-form.component.html',
  styleUrls: ['./salida-form.component.scss']
})
export class SalidaFormComponent implements OnInit {
  availabilitys:any=[]
  destinos:any = []
  //Spinners
  spinnerAvailability=false
  spinnerDestino=false
  //FinSpinners
  struct=''
  elemento=''

  disabledOrigen=true
  
  form = new FormGroup({
    origin_id: new FormControl('', Validators.required),
    destination_id: new FormControl('',Validators.required),
    availability_id: new FormControl(''),
    element_id: new FormControl(Validators.required),
    description: new FormControl(''),
    quantity_out:new FormControl('',[Validators.required,Validators.max(this.data.element.stock),Validators.min(1)])
  });

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<SalidaFormComponent>,private outputService:OutputService,private structService:StructService) { }

  ngOnInit(): void {

    this.structService.getStruct(this.data.origin_id).subscribe(
      data=>{
        console.log(data['struct'].name)
        this.struct = data['struct'].name
      
      }
    )
      //nombre de elemento
    this.elemento = this.data.element.name_element

    this.structService.getStructss().subscribe(
      data=>{
        this.destinos = data['structs']
        this.spinnerDestino= true
    
        console.log(this.data.origin_id)
        for(let i=0;i<this.destinos.length;i++){
          if(this.data.origin_id==this.destinos[i].id){
            this.destinos.splice(i,1)
          }
        }
      }
    )
    
    //set El id de elemento y origen
    this.form.get('origin_id').setValue(this.data.origin_id)
    this.form.get('element_id').setValue(this.data.element.id_element)

    this.outputService.getAvailabilities().subscribe(
      data=>{
       // console.log(data)
        if(data){
         this.availabilitys=data['availabilities']
         console.log(this.availabilitys)
         this.spinnerAvailability=true
        }
      })


      console.log(this.form.value,this.data.origin_id)
  }


  
  close(){
    this.dialogref.close({confirm:false})
  }

  save(){

    console.log(this.form.value)
    this.outputService.addOutput(this.form.value).subscribe(
      data=>{
          console.log(data)
          this.dialogref.close({confirm:true})
      }
    )
    
  }

}
