import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {OutputService} from '../services/output.service';
import * as Chart from 'chart.js'
import { LoginService } from 'src/app/login/services/login.service';
import { FormGroup, FormControl, Validators,AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  encapsulation: ViewEncapsulation.None,

})


export class EstadisticasComponent implements OnInit {
  typeStructs=[];
  structs=[];
  structSeleccionado=0;
  ////////spinners
  spinnerGen=false;
  spinnerStruct=false;

  //////form fechas
  form = new FormGroup({
    desde: new FormControl(null,Validators.required),
    hasta: new FormControl(null,Validators.required),
  });
  get formDesde() { return this.form.get('desde'); }
  get formHasta() { return this.form.get('hasta'); }

  formSt = new FormGroup({
    desde: new FormControl(null,Validators.required),
    hasta: new FormControl(null,Validators.required),
  });
  get formDesdeSt() { return this.formSt.get('desde'); }
  get formHastaSt() { return this.formSt.get('hasta'); }

  validateDesde(control: AbstractControl) {
    let desde,hasta;
    desde= new Date(control.value)
    hasta= new Date(this.formHasta.value)
    if(this.formHasta.value){
      if (desde> hasta) {
        this.formHasta.setErrors(null);
        return this.formDesde.setErrors({
          errorCheck: true
        });
      }
      else{
        return null;
      }
    }
    else{
      return null;
    }

  }

  validateHasta(control: AbstractControl) {
    let desde,hasta;
    desde= new Date(this.formDesde.value)
    hasta= new Date(control.value)
    if(this.formDesde.value){
      if (desde> hasta) {
        this.formDesde.setErrors(null);
        return this.formHasta.setErrors({
          errorCheck: true
        });
      }
      else{
        return null;
      }
    }
    else{
      return null;
    }

  }

  validateDesdeSt(control: AbstractControl) {
    let desde,hasta;
    desde= new Date(control.value)
    hasta= new Date(this.formHastaSt.value)
    if(this.formHastaSt.value){
      if (desde> hasta) {
        this.formHastaSt.setErrors(null);
        return this.formDesdeSt.setErrors({
          errorCheck: true
        });
      }
      else{
        return null;
      }
    }
    else{
      return null;
    }

  }

  validateHastaSt(control: AbstractControl) {
    let desde,hasta;
    desde= new Date(this.formDesdeSt.value)
    hasta= new Date(control.value)
    if(this.formDesdeSt.value){
      if (desde> hasta) {
        this.formDesdeSt.setErrors(null);
        return this.formHastaSt.setErrors({
          errorCheck: true
        });
      }
      else{
        return null;
      }
    }
    else{
      return null;
    }

  }

  ngOnInit(): void {
  }

  constructor( private outServ: OutputService, private loginService:LoginService,private datePipe: DatePipe,) {}

  canvas: any;
  ctx: any;
  canvas2: any;
  ctx2: any;
  ngAfterViewInit(){
    this.getEstadisticasAll();
  }

  getEstadisticasAll(){
    this.spinnerGen=true;
    this.outServ.getAllOutputStatistics().subscribe((data:any)=>{
      this.typeStructs= data.types_structs;
      if(data.types_structs.length!=0){
        let datos=[];
        let cant=[];
        data.types_structs.forEach(element => {
          datos.push(element.name)
          cant.push(element.cant)
        });
        let aux=[]
        let aux2=[]

        aux2=  this.makeColorGradient(this.redFrequency,this.grnFrequency,this.bluFrequency,0,0,0,this.center,this.width,50);
        for (let index = 0; index < data.types_structs.length; index++) {
          let x=aux2[Math.floor(Math.random()*aux2.length)]
          let band=true;
          do{
            if(!aux.includes(x)){
              aux[index]=x;
              band=false;
            }
            else{
                x=aux2[Math.floor(Math.random()*aux2.length)]
                band=true;
            }
          }while(band)

        }


        if(document.getElementById('genCanvas').firstChild){
          let p=document.getElementById('genCanvas')
          p.removeChild(p.getElementsByTagName('canvas')[0])
        }
        let canvas= document.createElement('canvas');
        canvas.setAttribute('id','myChart')
        canvas.setAttribute('width','500')
        canvas.setAttribute('height','300')
        canvas.setAttribute('style','margin: auto;')
        document.getElementById('genCanvas').appendChild(canvas);

        this.canvas = document.getElementById('myChart');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
          type: 'pie',
          data: {
              labels: datos,
              datasets: [{
                  label: '# de Salidas',
                  data: cant,
                  backgroundColor:
                      aux
                  ,
                  borderWidth: 1
              }]
          },
          options: {
            responsive: false,
            //display:true
          }
        });

        this.spinnerGen=false;
      }
      else{
        this.typeStructs=[];
        if(document.getElementById('genCanvas').firstChild){
          let p=document.getElementById('genCanvas')
          p.removeChild(p.getElementsByTagName('canvas')[0])
        }
        this.spinnerGen=false;
      }
      this.form.setValue({
        desde:null,
        hasta:null
      })
      this.formHasta.setErrors(null);
      this.formDesde.setErrors(null);
    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      console.log(err)
    })
  }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    center = 128;
    width = 100;
    redFrequency = 1.666;
    grnFrequency = 2.666;
    bluFrequency = 3.666;
    makeColorGradient(frequency1, frequency2, frequency3,
        phase1, phase2, phase3,
        center, width, len)
    {
      let aux=[];
        if (center == undefined)   center = 128;
        if (width == undefined)    width = 127;
        if (len == undefined)      len = 50;

        for (var i = 0; i < len; ++i)
        {
          var red = Math.sin(frequency1*i + phase1) * width + center;
          var grn = Math.sin(frequency2*i + phase2) * width + center;
          var blu = Math.sin(frequency3*i + phase3) * width + center;
          aux.push( this.RGB2Color(red,grn,blu))
        }
        return aux;
    }

    RGB2Color(r,g,b){
      return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
    }

    byte2Hex(n)
    {
      var nybHexString = "0123456789ABCDEF";
      return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    }

    getStructs(struct_id){
      if(struct_id!=0 && struct_id!=null){
        this.structSeleccionado=struct_id;
        this.spinnerStruct=true;
        this.outServ.getStructOutputStatistics(struct_id).subscribe((data:any)=>{
          if(data.structs.length!=0){
            this.structs= data.structs;
            let datos=[];
            let cant=[];
            data.structs.forEach(element => {
              datos.push(element.name)
              cant.push(element.cant)
            });
            let aux=[]
            let aux2=[]

            aux2=  this.makeColorGradient(this.redFrequency,this.grnFrequency,this.bluFrequency,0,0,0,this.center,this.width,50);
            for (let index = 0; index < data.structs.length; index++) {
              let x=aux2[Math.floor(Math.random()*aux2.length)]
              let band=true;
              do{
                if(!aux.includes(x)){
                  aux[index]=x;
                  band=false;
                }
                else{
                    x=aux2[Math.floor(Math.random()*aux2.length)]
                    band=true;
                }
              }while(band)

            }

            if(document.getElementById('padreCanvas').firstChild){
              let p=document.getElementById('padreCanvas')
              p.removeChild(p.getElementsByTagName('canvas')[0])
            }
            let canvas= document.createElement('canvas');
            canvas.setAttribute('id','myChartStruct')
            canvas.setAttribute('width','500')
            canvas.setAttribute('height','300')
            canvas.setAttribute('style','margin: auto;')
            document.getElementById('padreCanvas').appendChild(canvas);

            this.canvas2 = document.getElementById('myChartStruct');
            this.ctx2 = this.canvas2.getContext('2d');
            let myChart = new Chart(this.ctx2, {
              type: 'pie',
              data: {
                  labels: datos,
                  datasets: [{
                      label: '# de Salidas',
                      data: cant,
                      backgroundColor:
                          aux
                      ,
                      borderWidth: 1
                  }]
              },
              options: {
                responsive: false,
                //display:true
              }
            });

            this.formSt.setValue({
              desde:'',
              hasta:''
            })
          }
          else{
            this.structs=[];
            if(document.getElementById('padreCanvas').firstChild){
              let p=document.getElementById('padreCanvas')
              p.removeChild(p.getElementsByTagName('canvas')[0])
            }
          }
          this.spinnerStruct=false;
          this.formSt.setValue({
            desde:null,
            hasta:null
          })
          this.formHastaSt.setErrors(null);
          this.formDesdeSt.setErrors(null);
        },
        err=>{
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          console.log(err)
        })
      }
      else{
        this.structSeleccionado=0;
        this.structs=[];
        if(document.getElementById('padreCanvas').firstChild){
          let p=document.getElementById('padreCanvas')
          p.removeChild(p.getElementsByTagName('canvas')[0])
        }
      }

    }


    //////////get por fechas

    getEstadisticasAllFecha(){
      if(this.form.value.desde && this.form.value.hasta && this.form.valid){
        this.spinnerGen=true;

        let desde= this.datePipe.transform(this.form.value.desde,"yyyy-MM-dd").toString();
        let hasta= this.datePipe.transform(this.form.value.hasta,"yyyy-MM-dd").toString();
        this.outServ.getAllOutputStatisticsFecha({
          desde: desde,
          hasta: hasta,
        }).subscribe((data:any)=>{
          this.typeStructs= data.types_structs;
          if(data.types_structs.length!=0){
            let datos=[];
            let cant=[];
            data.types_structs.forEach(element => {
              datos.push(element.name)
              cant.push(element.cant)
            });
            let aux=[]
            let aux2=[]

            aux2=  this.makeColorGradient(this.redFrequency,this.grnFrequency,this.bluFrequency,0,0,0,this.center,this.width,50);
            for (let index = 0; index < data.types_structs.length; index++) {
              let x=aux2[Math.floor(Math.random()*aux2.length)]
              let band=true;
              do{
                if(!aux.includes(x)){
                  aux[index]=x;
                  band=false;
                }
                else{
                    x=aux2[Math.floor(Math.random()*aux2.length)]
                    band=true;
                }
              }while(band)

            }


            if(document.getElementById('genCanvas').firstChild){
              let p=document.getElementById('genCanvas')
              p.removeChild(p.getElementsByTagName('canvas')[0])
            }
            let canvas= document.createElement('canvas');
            canvas.setAttribute('id','myChart')
            canvas.setAttribute('width','500')
            canvas.setAttribute('height','300')
            canvas.setAttribute('style','margin: auto;')
            document.getElementById('genCanvas').appendChild(canvas);

            this.canvas = document.getElementById('myChart');
            this.ctx = this.canvas.getContext('2d');
            let myChart = new Chart(this.ctx, {
              type: 'pie',
              data: {
                  labels: datos,
                  datasets: [{
                      label: '# de Salidas',
                      data: cant,
                      backgroundColor:
                          aux
                      ,
                      borderWidth: 1
                  }]
              },
              options: {
                responsive: false,
                //display:true
              }
            });

            this.spinnerGen=false;

            if(this.structSeleccionado!=0 && this.structSeleccionado!=null){
              this.formSt.setValue({
                desde: this.form.value.desde,
                hasta: this.form.value.hasta,
              })
              this.getStructsFecha();
            }
          }
          else{
            this.typeStructs=[];
            if(document.getElementById('genCanvas').firstChild){
              let p=document.getElementById('genCanvas')
              p.removeChild(p.getElementsByTagName('canvas')[0])
            }
            this.spinnerGen=false;
          }

        },
        err=>{
          //this.loginService.logout();
          //window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          console.log(err)
        })
      }
    }

    getStructsFecha(){
      if(this.formSt.valid){
        this.spinnerStruct=true;
        let desde= this.datePipe.transform(this.formSt.value.desde,"yyyy-MM-dd").toString();
        let hasta= this.datePipe.transform(this.formSt.value.hasta,"yyyy-MM-dd").toString();
        this.outServ.getStructOutputStatisticsFecha({
          struct_id: this.structSeleccionado,
          desde:desde,
          hasta:hasta,
        }).subscribe((data:any)=>{
          if(data.structs.length!=0){
            this.structs= data.structs;
            let datos=[];
            let cant=[];
            data.structs.forEach(element => {
              datos.push(element.name)
              cant.push(element.cant)
            });
            let aux=[]
            let aux2=[]

            aux2=  this.makeColorGradient(this.redFrequency,this.grnFrequency,this.bluFrequency,0,0,0,this.center,this.width,50);
            for (let index = 0; index < data.structs.length; index++) {
              let x=aux2[Math.floor(Math.random()*aux2.length)]
              let band=true;
              do{
                if(!aux.includes(x)){
                  aux[index]=x;
                  band=false;
                }
                else{
                    x=aux2[Math.floor(Math.random()*aux2.length)]
                    band=true;
                }
              }while(band)

            }

            if(document.getElementById('padreCanvas').firstChild){
              //document.getElementById('padreCanvas').firstChild.remove
              let p=document.getElementById('padreCanvas')
              p.removeChild(p.getElementsByTagName('canvas')[0])
            }
            let canvas= document.createElement('canvas');
            canvas.setAttribute('id','myChartStruct')
            canvas.setAttribute('width','500')
            canvas.setAttribute('height','300')
            canvas.setAttribute('style','margin: auto;')
            document.getElementById('padreCanvas').appendChild(canvas);

            this.canvas2 = document.getElementById('myChartStruct');
            this.ctx2 = this.canvas2.getContext('2d');
            let myChart = new Chart(this.ctx2, {
              type: 'pie',
              data: {
                  labels: datos,
                  datasets: [{
                      label: '# de Salidas',
                      data: cant,
                      backgroundColor:
                          aux
                      ,
                      borderWidth: 1
                  }]
              },
              options: {
                responsive: false,
                //display:true
              }
            });
          }
          else{
            this.structs=[];
            if(document.getElementById('padreCanvas').firstChild){
              let p=document.getElementById('padreCanvas')
              p.removeChild(p.getElementsByTagName('canvas')[0])
            }
          }
          this.spinnerStruct=false;
          console.log(this.structSeleccionado)
        },
        err=>{
          //this.loginService.logout();
          //window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          console.log(err)
        })
      }
    }

}
