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

  addElement(element){
    return this.http.post(`${this.API_URI}/elements.json`,element)
  }

  getElementByCategory(id_category){
    if(id_category)
    {
    return this.http.get(`${this.API_URI}/elements/category/${id_category}.json`);
    }
    
  }
  getElementosByCategoryAndMark(id_Category,id_mark){
    return this.http.get(`${this.API_URI}/elements/category/${id_Category}/mark/${id_mark}.json`);
  }
  getElementByMarca(id_mark){
    return this.http.get(`${this.API_URI}/elements/mark/${id_mark}.json`);
 
  }


}
