import { DatePipe } from '@angular/common';

export class pdfServiceSalida {

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

    async generatePdf(data, name, mes, tipo) {
      await this.loadPdfMaker();
      this.datePipe= new DatePipe('en-US');
      let f= new Date();
      let aux="";
      var fecha="";
      if(mes){
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
      }
      else{
        switch(f.getMonth()){
          case 0:{
            fecha="Enero";
            break;
          }
          case 1:{
            fecha="Febrero";
            break;
          }
          case 2:{
            fecha="Marzo";
            break;
          }
          case 3:{
            fecha="Abril";
            break;
          }
          case 4:{
            fecha="Mayo";
            break;
          }
          case 5:{
            fecha="Junio";
            break;
          }
          case 6:{
            fecha="Julio";
            break;
          }
          case 7:{
            fecha="Agosto";
            break;
          }
          case 8:{
            fecha="Septiembre";
            break;
          }
          case 9:{
            fecha="Octubre";
            break;
          }
          case 10:{
            fecha="Noviembre";
            break;
          }
          case 11:{
            fecha="Diciembre";
            break;
          }
        }
      }

      var tipoSalida="";
      if(tipo==0)
      {
        tipoSalida="Donacion";
        aux="es";
      }
      else if(tipo==1){
        tipoSalida="Entrega";
        aux="s";
      }
      else{
        tipoSalida="Salida Extra";
        aux="s";
      }
      if(tipo==0 || tipo==1){
        var docDefinition = {
          content: [

            { text: 'Informe de '+ tipoSalida+aux + " : "+ name + "   \n"+ fecha+ "  "+ f.getFullYear(), margin: [0, 20, 0, 8] },
            {
              style: 'tableExample',
              table: {
                headerRows: 1,
                body: [
                  [
                  { text: 'Fecha de '+ tipoSalida, style: 'tableHeader' },
                  { text: 'Autoriza', style: 'tableHeader' },
                  { text: 'Egreso', style: 'tableHeader' },
                  { text: 'Articulo', style: 'tableHeader' },
                  { text: 'Descripcion', style: 'tableHeader' },
                  { text: 'Marca', style: 'tableHeader' },
                  { text: 'Retira', style: 'tableHeader' },
                  { text: 'Solicita', style: 'tableHeader' },
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
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            subheader: {
              fontSize: 16,
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
              fontSize: 13,
              color: 'black'
            }
          },
          defaultStyle: {
            alignment: 'justify'
          }
        };
        data.forEach((element:any) => {

            docDefinition.content[1].table.body.push(
              [
                this.datePipe.transform(element.created,"dd-MM-yyyy"),//Fecha de Donacion
                element.autoriza,//autoriza
                element.quantity_out,//Cantidad
                element.name_element,//Articulo
                element.description,//Descripcion

                element.mark_name,//marca


                element.retira,
                element.destination_id,//Programa que Solicita
              ]);
        });
      }
      else{
        var docDefinition = {
          content: [

            { text: 'Informe de '+ tipoSalida+aux + " : "+ name + "   \n"+ fecha+ "  "+ f.getFullYear(), margin: [0, 20, 0, 8] },
            {
              style: 'tableExample',
              table: {
                headerRows: 1,
                body: [
                  [
                  { text: 'Fecha de '+ tipoSalida, style: 'tableHeader' },
                  { text: 'Egreso', style: 'tableHeader' },
                  { text: 'Articulo', style: 'tableHeader' },
                  { text: 'Marca', style: 'tableHeader' },
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
              }
            },

          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10]
            },
            subheader: {
              fontSize: 16,
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
              fontSize: 13,
              color: 'black'
            }
          },
          defaultStyle: {
            alignment: 'justify'
          }
        };
        data.forEach((element:any) => {

            docDefinition.content[1].table.body.push(
              [
                this.datePipe.transform(element.created,"dd-MM-yyyy"),//Fecha de salida
                element.quantity_out,//Cantidad
                element.name_element,//Articulo
                element.mark_name,//marca
              ]);
        });
      }

      this.pdfMake.createPdf(docDefinition).open();
    }

  }
