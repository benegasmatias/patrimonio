import { DatePipe } from '@angular/common';

export class pdfServiceInventarios {

    pdfMake: any;
    private datePipe: DatePipe;
    constructor( ) { }
  
    async loadPdfMaker() {
      if (!this.pdfMake) {
        const pdfMakeModule = await import('pdfmake/build/pdfmake');
        const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
        this.pdfMake = pdfMakeModule.default;
        this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
      }
    }
  
    async generatePdf(data, estructura, mes) {      
      await this.loadPdfMaker();      
      this.datePipe= new DatePipe('en-US');
      let f= new Date();
      var fecha="";
      switch(mes){
        case 1:{
          fecha="Enero";
          break;
        }
        case 2:{
          fecha="Febrero";
          break;
        }
        case 3:{
          fecha="Marzo";
          break;
        }
        case 4:{
          fecha="Abril";
          break;
        }
        case 5:{
          fecha="Mayo";
          break;
        }
        case 6:{
          fecha="Junio";
          break;
        }
        case 7:{
          fecha="Julio";
          break;
        }
        case 8:{
          fecha="Agosto";
          break;
        }
        case 9:{
          fecha="Septiembre";
          break;
        }
        case 10:{
          fecha="Octubre";
          break;
        }
        case 11:{
          fecha="Noviembre";
          break;
        }
        case 12:{
          fecha="Diciembre";
          break;
        }
      }

      var docDefinition = {
        content: [
          { text: 'Informe de Prestamos: '+ estructura.nombreType+'-'+estructura.name + "   \n"+ fecha+ "  "+ f.getFullYear(), margin: [0, 20, 0, 8] },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              body: [
                [
                //{ text: 'Fecha de Prestamo', style: 'tableHeader' }, 
                { text: 'Autoriza', style: 'tableHeader' },
                { text: 'Retira', style: 'tableHeader' },
                { text: 'Cantidad', style: 'tableHeader' }, 
                { text: 'Materiales', style: 'tableHeader' }, 

                { text: 'Marca', style: 'tableHeader' }, 

                { text: 'Area que Solicita', style: 'tableHeader' }, 
                { text: 'Institucion a la que se Destina', style: 'tableHeader' },
                { text: 'Fecha de Devolucion', style: 'tableHeader' },
                
              ],
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
              },
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
              },
              // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
              // paddingLeft: function(i, node) { return 4; },
              // paddingRight: function(i, node) { return 4; },
              // paddingTop: function(i, node) { return 2; },
              // paddingBottom: function(i, node) { return 2; },
              // fillColor: function (rowIndex, node, columnIndex) { return null; }
            }
          },

        ],
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableOpacityExample: {
            margin: [0, 5, 0, 15],
            fillColor: 'blue',
            fillOpacity: 0.3
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black'
          }
        },
        defaultStyle: {
          alignment: 'justify'
        }
      };
      data.forEach((element:any) => {  
        console.log(element)
        if(element.return_date){
          docDefinition.content[1].table.body.push(
            [
              //this.datePipe.transform(element.created,"dd-MM-yyyy"),//Fecha de Prestamo
              element.autoriza,
              element.receiver_name,//Retira
              element.quantity_out,//Cantidad
              element.name_element,//Materiales

              element.mark_name,//marca

              element.typeDestino,//Area que Solicita
              element.destination_id,//Institucion a la que se Destina
              this.datePipe.transform(element.return_date,"dd-MM-yyyy") + " Devuelto ("+element.return_quantity+")",//Fecha de Devolucion
            ]);
        }
        else{
          docDefinition.content[1].table.body.push(
            [
              //this.datePipe.transform(element.created,"dd-MM-yyyy"),//Fecha de Prestamo
              element.autoriza,
              element.receiver_name,//Retira
              element.quantity_out,//Cantidad
              element.name_element,//Materiales

              element.mark_name,//marca

              element.typeDestino,//Area que Solicita
              element.destination_id,//Institucion a la que se Destina
              this.datePipe.transform(element.expected_date,"dd-MM-yyyy")+" (Estimado)",//Fecha de Devolucion
            ]);          
        }
      });
      this.pdfMake.createPdf(docDefinition).open();
    }
  
  }

  // { text: 'Fecha de Prestamo', style: 'tableHeader' }, 
  // { text: 'Autoriza', style: 'tableHeader' },
  // { text: 'Retira', style: 'tableHeader' },
  // { text: 'Cantidad', style: 'tableHeader' }, 
  // { text: 'Materiales', style: 'tableHeader' }, 
  // { text: 'Area que Solicita', style: 'tableHeader' }, 
  // { text: 'Institucion a la que se Destina', style: 'tableHeader' },
  // { text: 'Fecha de Devolucion', style: 'tableHeader' },
  