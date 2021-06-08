import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ElementoService } from 'src/app/elemento/service/elemento.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCantElementComponent } from 'src/app/elemento/components/dialog-cant-element/dialog-cant-element.component';

import { StructService } from 'src/app/services/struct.service';

import { InputService } from 'src/app/services/input.service';

import { ProveedorService } from 'src/app/services/proveedor.service';
import { DialogProveedorComponent } from 'src/app/dialog/proveedor/dialog-proveedor/dialog-proveedor.component';
import { ActivatedRoute } from '@angular/router';
import { ElementFormComponent } from 'src/app/elemento/components/element-form/element-form.component';
import { CategoriasService } from 'src/app/services/categorias.service';
import { MarcaService } from 'src/app/services/marca.service';
import { LoginService } from 'src/app/login/services/login.service';


@Component({
  selector: 'app-entrada-form',
  templateUrl: './entrada-form.component.html',
  styleUrls: ['./entrada-form.component.scss']
})

export class EntradaFormComponent implements OnInit {
  @ViewChild('auto') auto;


  @ViewChild('submenu') submenu;
  @ViewChild('menuaux') menuaux;
  @ViewChild('menuaux2') menuaux2;
  @ViewChild('menuaux3') menuaux3;
  @ViewChild('menuaux4') menuaux4;

  //arreglo de categorias
  public arraycateg: categ[]=[];

  //alerts
  alertExito=false
  //Fin de alerts

  //Spinners
  spinnerGuardar = false;
  spinnerProvider = true;
  spinnerDestino=true;
  spinnerCategory=true;
  spinnerMarks= true;
  spinnerDestinoStruct=false;
  spinnerElement=false;
  spinnerNoElement=false;
//Fin de Spinners
//placeholders
tipoDestino=''
//Fin de placeholders
  disabledSelect=false


  stock:any = []

  keyword = 'name_element';
  data = [];

  elementos: any = []
  elementosSelecionados: any = []
  contadorSeleccion = 0;

  params = false
  estructuraNombre=''
  //Arrays
  destinos:any=[]

  estructuras:any=[]

  categorias:any=[]

  marcas:any=[]

  proveedores:any=[]
  //fin Arrays

  form = new FormGroup({
    number_refer: new FormControl('', Validators.required),
    typeStruct_id: new FormControl('',Validators.required),
     categoria: new FormControl({  type: "",
      id_category: -1,
      name_category:"-----",
      hijo: [] }),
    struct_id: new FormControl(Validators.required),
    provider_id:new FormControl('',Validators.required),
    stock: new FormControl(this.stock),
    marca: new FormControl('')
  });



  constructor(
      private serviceElement: ElementoService,
      private dialog: MatDialog,
      private serviceStruct: StructService,
      private  serviceCategorias: CategoriasService,
      private serviceInput:InputService,
      private serviceMarca:MarcaService,
      private serviceProvider:ProveedorService,
      private activatedRoute:ActivatedRoute,
      private loginService: LoginService
      ) {

       }


  ngOnInit(): void {

    //spinners
    this.spinnerGuardar = false;
    this.spinnerProvider = true;
    this.spinnerDestino=true;
    this.spinnerDestinoStruct=false;
    this.spinnerCategory=true;

    this.spinnerElement=true;
    //alert
    this.alertExito=false;

    //Recupera El Destino
    this.serviceStruct.getTypeStructs().subscribe(
      data=>{
           this.destinos = data['types_structs']
           this.spinnerDestino=false

           this.activatedRoute.params.subscribe(param=>{
            console.log(param)
            // console.log('asdasdasd', this.form.get('estructura').value)


            this.form.get('typeStruct_id').setValue(param['typeStruct'])

            if(param['struct'])
            this.params=true
            this.disabledSelect=true;
            this.getEstructura(param['struct']);

          })


      },
      err=>{
        console.log(err)
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )

    this.serviceCategorias.getCategorias().subscribe(
      (data:any) => {
        let tomaresultado=[];
        tomaresultado = data.categorysOfElements;
        tomaresultado=tomaresultado.sort(this.comparar);

        let arregloaux=[];

        tomaresultado.forEach(n=>{
          if(n.father_category_id== null)
            {
              let d={  type: "padre", id_category: n.id_category, name_category:n.name_category, hijo: []}
              this.arraycateg.push(d);
              arregloaux.push(d);
            }
        })

        tomaresultado.forEach((n, index)=>{
          if(n.father_category_id!=null){

            let x=arregloaux.find(element => element.id_category == n.father_category_id)
            if((x!=undefined)){
              let auxasig;
              auxasig=this.CargaRec(n,this.arraycateg,arregloaux,0);
              arregloaux=auxasig;
            }
            else{
              let aux= tomaresultado.splice(index,1);
              tomaresultado.push(aux[0]);
              console.log(tomaresultado);
            }
          }
        })
        //let aux= this.arraycateg;
        this.spinnerCategory=false;
      },
      error => {
        console.log(error)
        console.log("No se pudo recuperar Categorias")
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      });

    this.getMarcas()

  }//end

  //aux de categorias
  CargaRec(result, categorias: categ[],arregloaux, num){

    categorias.forEach(cat => {
      if(cat.id_category == result.father_category_id)
      {
        let color="black";
        let d;
        if(num<8){
          d={ type: "padre", id_category: result.id_category, name_category:result.name_category, hijo:[] ,color: color};
        }
        else
        {
          d={ type: "hijo", id_category: result.id_category, name_category:result.name_category, hijo:[] ,color: color};
        }
        cat.hijo.push(d);
        arregloaux.push(d);
      }
      else
        if(cat.hijo!=[])
          this.CargaRec(result,cat.hijo,arregloaux, num+1)
    });
    return(arregloaux);
  }
  comparar ( a, b ){ return a.id_category - b.id_category; }


  getMarcas(){
    this.spinnerMarks= true;
    this.serviceMarca.getMarcas().subscribe(
      data=>{
     //   console.log(data)
        this.marcas = data['marks']
        this.spinnerMarks= false;
      },
      err=>{
        console.log(err)
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )
    this.serviceProvider.getProviders().subscribe(
      data=>{
        this.proveedores = data['providers']
        this.spinnerProvider=false
      },
      err=>{
        console.log(err)
        this.loginService.logout();
       window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )


  }

  addProveedor(): void {
		const dialogref = this.dialog.open(DialogProveedorComponent, {
      data: {title: 'Nuevo Proveedor'}
		});

		dialogref.afterClosed().subscribe(result => {
      this.spinnerProvider=true
			if (result.confirm) {
        this.serviceProvider.getProviders().subscribe(
          data=>{
            this.proveedores = data['providers']
            this.spinnerProvider=false
          },
          err=>{
            this.loginService.logout();
            window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          }
        )
      }else{
        this.spinnerProvider=false
      }
    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    });

  }

  addElement(): void {
		const dialogref = this.dialog.open(ElementFormComponent, {
      data: {title: 'Nuevo Elemento'}
		});

		dialogref.afterClosed().subscribe(element => {
      if(element.confirm){
        this.getMarcas()
        alert("El elemento fue creado. Ya se puede incluir a la entrada.")
        this.spinnerElement=false;
        this.spinnerNoElement = false;
        console.log(element.data.id_element)
        this.serviceElement.getOneElemento(element.data.id_element).subscribe(
            data=>{
              console.log(data)
              this.data = data['elements']
              if(this.data.length==0){
                this.spinnerNoElement=true;
                this.spinnerElement=true;
              }else{
                this.spinnerElement=true;
              }
            },
            err=>{
              console.log(err)
              this.loginService.logout();
              window.location.assign("https://sedacreditaciones.com/app/patrimonio")
            }
          )
      }
    });

	}

  getElementByMark(){
    this.spinnerElement=false;
    this.spinnerNoElement = false;
    if(!this.form.get('marca').value && this.form.get('categoria').value.id_category!=-1 ){
      this.serviceElement.getElementByCategory(this.form.get('categoria').value.id_category).subscribe(
        data=>{
          console.log(data)
           this.data = data['elements']
           if(this.data.length==0){
             this.spinnerNoElement=true;
             this.spinnerElement=true;
            }else{
             this.spinnerElement=true;
            }
        },
        err=>{
          console.log(err)
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        }

      )}
      else
    if(this.form.get('categoria').value.id_category==-1 && this.form.get('marca').value){
      this.serviceElement.getElementByMarca(this.form.get('marca').value).subscribe(
        data=>{
          console.log(data)

           this.data = data['elements']
           if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;
           }else{
            this.spinnerElement=true;
           }
        },
        err=>{
          console.log(err)
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        }
      )}else{
        if(this.form.get('categoria').value.id_category!=-1 && this.form.get('marca').value){
        this.serviceElement.getElementosByCategoryAndMark(this.form.get('categoria').value.id_category,this.form.get('marca').value).subscribe(
          data=>{
           this.data = data['elements']
           console.log(data)
           if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;

           }else{
            this.spinnerElement=true;
           }
          },
          err=>{
            console.log(err)
            this.loginService.logout();
            window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          }
        )}else
          {this.spinnerNoElement=true;
           this.spinnerElement=true;}
      }
  }


  getElementByCategory(){
    this.spinnerElement=false;
    this.spinnerNoElement = false;
    if(this.form.get('categoria').value.id_category==-1 && this.form.get('marca').value){
      this.serviceElement.getElementByMarca(this.form.get('marca').value).subscribe(
        data=>{
          console.log(data)

           this.data = data['elements']
           if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;
           }else{
            this.spinnerElement=true;
           }
        },
        err=>{console.log(err)
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        }
      )}else

    if(!this.form.get('marca').value && this.form.get('categoria').value.id_category!=-1 ){
     this.serviceElement.getElementByCategory(this.form.get('categoria').value.id_category).subscribe(
       data=>{
         console.log(data)
          this.data = data['elements']
          if(this.data.length==0){
            this.spinnerNoElement=true;
            this.spinnerElement=true;
           }else{
            this.spinnerElement=true;
           }
       },
       err=>{
         console.log(err)
         this.loginService.logout();
         window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
     )}else{
       if(this.form.get('categoria').value.id_category!=-1 && this.form.get('marca').value!= ''){
         this.serviceElement.getElementosByCategoryAndMark(this.form.get('categoria').value.id_category,this.form.get('marca').value).subscribe(
           data=>{
             console.log(data)
           this.data = data['elements']
           if(this.data.length==0){
              this.spinnerNoElement=true;
              this.spinnerElement=true;
            }else{
               this.spinnerElement=true;
             }
          },
           err=>{
             console.log(err)
             this.loginService.logout();
             window.location.assign("https://sedacreditaciones.com/app/patrimonio")
          }
         )
      }else{
        this.spinnerNoElement=true;
        this.spinnerElement=true;
      }
     }
  }

  getEstructura(struct_id = null) {
    // if(struct_id)


    this.spinnerDestinoStruct = true;
    console.log(this.destinos)



    //let select = <HTMLInputElement>document.getElementById('selecEstructura')
    if(struct_id){
      this.serviceStruct.getStruct(struct_id).subscribe(
        data=>{
          console.log(data)
          this.form.get('struct_id').setValue(data['struct'].id)
          this.estructuraNombre = data['struct'].name
          // this.form.get('estructura').setValue(data['struct'].id)
        },
        err=>{
          this.loginService.logout();
          window.location.assign("https://sedacreditaciones.com/app/patrimonio")
        }
      )
      }else{
        if (this.form.get('struct_id').value) {
          this.serviceStruct.getStructs(this.form.get('struct_id').value).subscribe(
            data => {
              console.log(data)
              this.estructuras = data['structs']
              this.spinnerDestinoStruct = false
            },

            err =>{
              console.log(err)
              this.loginService.logout();
              window.location.assign("https://sedacreditaciones.com/app/patrimonio")
            }
          )
        } else {
          this.spinnerDestinoStruct = false
          this.estructuras = []
        }
      }

  }

  enviar() {
    console.log(this.form.value)
    this.spinnerGuardar=true;
    this.serviceInput.addInput(this.form.value).subscribe(
      data=>{
        this.alertExito=true;
        this.stock = [];
        this.elementosSelecionados = [];
        this.contadorSeleccion=0;
        this.categoriaseleccionada= {  type: '',
        id_category: -1,
        name_category:'-----',
        hijo: []
        };
        this.form.get('number_refer').setValue('')
        this.form.get('categoria').setValue(this.categoriaseleccionada)
        this.form.get('stock').setValue(this.stock)
        this.form.get('provider_id').setValue('')
        this.form.get('marca').setValue('')
        this.spinnerGuardar=false;
        console.log(this.form.value)
      },
      err=>{
        console.log(err)
        this.loginService.logout();
        window.location.assign("https://sedacreditaciones.com/app/patrimonio")
      }
    )
  }

  noSeleccionar(id) {
    this.stock.splice(id,1);
    this.elementosSelecionados.splice(id, 1);
    this.contadorSeleccion = this.elementosSelecionados.length
  }


  //autocomplet

  selectEvent(item) {
    // do something with selected item
    //console.log(item.name_element)

    if(item!=''){

    const dialogref = this.dialog.open(DialogCantElementComponent, {
      data: { title: 'Cantidad de ' + item.name_element }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result.confirm) {
        if (this.elementosSelecionados.find(element => element.elemento.id_element == item.id_element)) {
          //console.log(this.elementosSelecionados.find(element => element.elemento.id_element == item.id_element))
          alert("El elemento ya se agrego a la lista.")
        } else {
          let elemento;
          this.serviceElement.getMarkbyId(item.mark_id).subscribe((data:any)=>{
            elemento = {
              elemento: item,
              cantidad: result.cantidad,
              mark_name: data.mark.name
            }
            this.elementosSelecionados.push(elemento);
            this.stock.push({element_id:item.id_element,quantity:result.cantidad})
            this.contadorSeleccion = this.elementosSelecionados.length;
          },
          err=>{
            console.log(err)
          })



        }
      }

    },
    err=>{
      this.loginService.logout();
      window.location.assign("https://sedacreditaciones.com/app/patrimonio")
    });

   }

  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  console.log(val)
  }

  onFocused(e) {
    // do something when input is focused
  }

  public categoriaseleccionada: categ = null;
   select(cat){
     this.categoriaseleccionada=cat;
     this.form.setValue({
      number_refer: this.form.value.number_refer,
      typeStruct_id: this.form.value.typeStruct_id,
      categoria: this.categoriaseleccionada,
      struct_id: this.form.value.struct_id ,
      provider_id: this.form.value.provider_id,
      stock: this.form.value.stock ,
      marca: this.form.value.marca
     })
     this.getElementByCategory();
   }

   selectvoid(){
    this.categoriaseleccionada= {  type: '',
    id_category: -1,
    name_category:'-----',
    hijo: [] };
    this.form.setValue({
     number_refer: this.form.value.number_refer,
     typeStruct_id: this.form.value.typeStruct_id,
     categoria: this.categoriaseleccionada,
     struct_id: this.form.value.struct_id ,
     provider_id: this.form.value.provider_id,
     stock: this.form.value.stock ,
     marca: this.form.value.marca
    })
    this.getElementByCategory();
   }

}

export interface categ{
  type: string,
  id_category: number,
  name_category:string,
  hijo: categ[]
}

