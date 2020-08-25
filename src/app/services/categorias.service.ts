import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getCategorias(){
    return this.http.get(`${this.API_URI}/categorys-of-elements.json`);
  }
}