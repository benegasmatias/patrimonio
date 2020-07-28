import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ElementoService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getDisponibilidades(){
    return this.http.get(`${this.API_URI}/availabilitys.json`);
  }
  getElementos(){
    return this.http.get(`${this.API_URI}/elements.json`);
  }
  getMarcas(){
    return this.http.get(`${this.API_URI}/marks.json`);
  }
  addMarca(marca){
    return this.http.post(`${this.API_URI}/marks.json`,marca)
  }

  addElement(element){
    return this.http.post(`${this.API_URI}/elements.json`,element)
  }

  getElementByCategory(id_category){
    return this.http.get(`${this.API_URI}/elements/category/${id_category}.json`);
   
  }


}
