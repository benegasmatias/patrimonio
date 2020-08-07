import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  API_URI = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getMarcas(){
    return this.http.get(`${this.API_URI}/marks.json`);
  }
  addMarca(marca){
    return this.http.post(`${this.API_URI}/marks.json`,marca)
  }

}
