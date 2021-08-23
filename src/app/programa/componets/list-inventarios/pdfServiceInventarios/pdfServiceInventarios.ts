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

    async generatePdf(data, estructura) {
      await this.loadPdfMaker();
      this.datePipe= new DatePipe('en-US');
      let f= new Date();
      let g=this.datePipe.transform(f,'d/M/y')
      let fecha;
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
      var docDefinition = {
        content: [
          { text: 'Informe de Inventarios: '+ estructura.typeStruct.name+'-'+estructura.name + "   \n"+ fecha+ "  "+ f.getFullYear(), margin: [0, 20, 0, 8] },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              body: [
                [
                  { text: 'Elemento', style: 'tableHeader' },
                  { text: 'Marca', style: 'tableHeader' },
                  { text: 'Descripcion', style: 'tableHeader' },
                  { text: 'Ingreso', style: 'tableHeader' },
                  { text: 'Egreso', style: 'tableHeader' },
                  { text: 'Stock', style: 'tableHeader' },
                  { text: 'Observacion', style: 'tableHeader' },

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
      console.log(data)
      data.forEach((element:any) => {
          docDefinition.content[1].table.body.push(
            [
              element.name_element,
              element.mark_name,
              element.description,
              element.stock_inicial,
              element.stock_out,
              element.stock,
              element.observation,
            ]);

      });
      this.pdfMake.createPdf(docDefinition).open();
    }
  }
