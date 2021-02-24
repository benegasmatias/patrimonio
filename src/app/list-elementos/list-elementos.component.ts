import { Component, OnInit, ViewEncapsulation, ɵConsole,ViewChild, TemplateRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import {CategoriasService} from '../services/categorias.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login/services/login.service';

import {MatDialog} from '@angular/material/dialog'

import { ActivatedRoute } from '@angular/router';
import { InputService } from 'src/app/services/input.service';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-categorias',
  templateUrl: './list-elementos.component.html',
  styleUrls: ['./list-elementos.component.scss'],
  encapsulation: ViewEncapsulation.None,

})


export class ListElementosComponent implements OnInit {


  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

  }


}
