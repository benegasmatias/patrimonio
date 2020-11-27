import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OutputService } from 'src/app/services/output.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StructService } from 'src/app/services/struct.service';
import { OriginService } from 'src/app/services/origin.service';
import { StructComponent } from 'src/app/components/struct/struct.component';
import { DatePipe } from '@angular/common';

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
  spinnertypOrigenDestino=false
  //FinSpinners
  struct=''
  elemento=''
  StructExterior=false;
  disabledOrigen=true
  origenes=[];
  muestratipodest=true;

  masDestino=false

  form = new FormGroup({
    origin_id: new FormControl('', Validators.required),
    destination_id: new FormControl('',Validators.required),
    availability_id: new FormControl('',Validators.required),
    element_id: new FormControl(Validators.required),
    autoriza: new FormControl('',Validators.required),
    description: new FormControl(''),
    retira: new FormControl(''),
    quantity_out:new FormControl('',[Validators.required,Validators.max(this.data.element.stock),Validators.min(1)]),
  });

  formdest = new FormGroup({
    typedest: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    receiver_name: new FormControl('', Validators.required),
    expected_date: new FormControl('', Validators.required),
  });

  constructor(@Inject (MAT_DIALOG_DATA) public data : any,public dialogref: MatDialogRef<SalidaFormComponent>,private dialog:MatDialog,private outputService:OutputService,private structService:StructService,private serviceOirign:OriginService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.StructExterior=false
    this.structService.getStruct(this.data.origin_id).subscribe(
      data=>{
        console.log(data['struct'].name)
        this.struct = data['struct'].name
      }
    )
    this.getOrigenes()
      //nombre de elemento
    this.elemento = this.data.element.name_element

    
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
  getOrigenes(){
    this.spinnertypOrigenDestino=true
    this.serviceOirign.getStructExterno().subscribe(
      data=>{
        this.spinnertypOrigenDestino=false
        this.origenes =  data['OriginStructs']
      console.log(data)
      }
    )
  }

  getStructExterno(){

  }

  getStrct(){
    this.destinos=[];
    this.masDestino= false;
    this.muestratipodest=true;
    console.log(this.origenes)
    if(this.form.get('availability_id').value==2){//Donacion
      this.structService.getStructsByOrigin(this.origenes[1].id).subscribe(//origen externo
        data=>{
          this.destinos = data['structs']
          this.spinnerDestino= true
          this.masDestino= true;
         // console.log(this.data.origin_id)
          for(let i=0;i<this.destinos.length;i++){
            if(this.data.origin_id==this.destinos[i].id){
              this.destinos.splice(i,1)
            }
          }
        }
      )
    }else  if(this.form.get('availability_id').value==4){//Entrega
      this.structService.getStructsByOrigin(this.origenes[0].id).subscribe(
        data=>{
          this.destinos = data['structs']
          this.spinnerDestino= true
      
        // console.log(this.data.origin_id)
          for(let i=0;i<this.destinos.length;i++){
            if(this.data.origin_id==this.destinos[i].id){
              this.destinos.splice(i,1)
            }
          }
        }
      )
    }
    else if(this.form.get('availability_id').value==5){
      this.muestratipodest=false;
    }
  }
  
 
 
 addDestino(){

    const dialogref = this.dialog.open(StructComponent, {
      data: {title: 'Nuevo Destino',availability_id:this.form.get('availability_id').value,origin_id:this.origenes[1].id}
		});

		dialogref.afterClosed().subscribe(result => {
			console.log(result);
			if (result.confirm) {
        // this.salidaGenerada=true 
        // this.getInventarios()
        this.getStrct()
			}else {
        
      }
		});
  }

  getTypodest(){

    this.masDestino= false;

    this.structService.getStructsByOrigin(this.formdest.value.typedest).subscribe(
      data=>{
        this.destinos = data['structs']
        this.spinnerDestino= true
        if(this.formdest.value.typedest==2)
          this.masDestino= true;

      // console.log(this.data.origin_id)
        for(let i=0;i<this.destinos.length;i++){
          if(this.data.origin_id==this.destinos[i].id){
            this.destinos.splice(i,1)
          }
        }
      }
    )

  }
  close(){
    this.dialogref.close({confirm:false})
  }

  save(){
    if(this.form.get('availability_id').value!=5){
    this.outputService.addOutput(this.form.value).subscribe(
      data=>{
          this.dialogref.close({confirm:true})
      },
      err=>{
        console.log(err);
      }
    )
    }
    else{
      //console.log(this.formdest.value.expected_date)
      var fecha= this.datePipe.transform(this.formdest.value.expected_date,"yyyy-MM-dd");

      this.formdest.setValue({
        typedest: this.formdest.value.typedest,
        phone_number: this.formdest.value.phone_number,
        receiver_name: this.formdest.value.receiver_name,
        expected_date: fecha,
      })
      
      this.outputService.addOutputPrest(this.form.value, this.formdest.value).subscribe(
        data=>{
          console.log(data);
          this.dialogref.close({confirm:true})
        },
        (err:any)=>{
          console.log(err);
        }
      )
    }

    
  }

}
