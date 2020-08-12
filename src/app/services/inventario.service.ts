import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  API_URI = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getIventariosByStruct(struct_id){
    return this.http.get(`${this.API_URI}/inventario/struct/${struct_id}.json`);
  }

}
