import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {OutputService} from '../services/output.service';
import * as Chart from 'chart.js'
import { LoginService } from 'src/app/login/services/login.service';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  encapsulation: ViewEncapsulation.None,

})


export class EstadisticasComponent implements OnInit {
  typeStructs=[];
  structs=[];

  ////////
  spinnerGen=false;
  spinnerStruct=false;

  ngOnInit(): void {

  }

  constructor( private outServ: OutputService, private loginService:LoginService) {}

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
      if(struct_id!=0){
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
              //document.getElementById('padreCanvas').firstChild.remove
              let p=document.getElementById('padreCanvas')
              p.removeChild(p.getElementsByTagName('canvas')[0])
            }
            let canvas= document.createElement('canvas');
            canvas.setAttribute('id','myChartStruct')
            canvas.setAttribute('width','700')
            canvas.setAttribute('height','400')
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

        },
        err=>{
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          console.log(err)
        })
      }
      else{
        this.structs=[];
        if(document.getElementById('padreCanvas').firstChild){
          let p=document.getElementById('padreCanvas')
          p.removeChild(p.getElementsByTagName('canvas')[0])
        }
      }

    }
}
