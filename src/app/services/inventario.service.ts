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



  //donacion y entregas
  getOutputsByStruct(struct_id){
    return this.http.get(`${this.API_URI}/outputs/struct-lista/${struct_id}.json`);
  }

  getOutputsByStructNodata(struct_id){
    return this.http.get(`${this.API_URI}/outputs/struct-lista-nodata/${struct_id}.json`);
  }

  //prestamos
  getOutputsByStructPrestamo(struct_id){
    return this.http.get(`${this.API_URI}/outputs/struct-prestamo/${struct_id}.json`);
  }

  getPrestamo(pending_return_id){
    return this.http.get(`${this.API_URI}/outputs/struct-pending/${pending_return_id}.json`);
  }

  getView(){
    return this.http.get(`${this.API_URI}/outputs/${1}.json`);
  }

  updatePrestamo(archivo){
    return this.http.post(`${this.API_URI}/outputs/struct-pending.json`, archivo);
  }

  getAllElements(){
    return this.http.get(`${this.API_URI}/elements/list-all.json`);
  }

  getIntersectElements(id_elem){
    return this.http.get(`${this.API_URI}/elements/intersect-elem/${id_elem}.json`);
  }

  deleteElement(id_elem){
    return this.http.get(`${this.API_URI}/elements/delete/${id_elem}.json`);
  }

}
