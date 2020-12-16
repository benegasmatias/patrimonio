import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StructService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getTypeStructs(){
    return this.http.get(`${this.API_URI}/types-structs.json`);
  }

  addTypeStruct(typeStruct){
    return this.http.post(`${this.API_URI}/types-structs.json`,typeStruct);
  }
  getStructsByOrigin(id){
    return this.http.get(`${this.API_URI}/structs/origin/${id}.json`);
  }

  getStructs(id){
    return this.http.get(`${this.API_URI}/structs/type/${id}.json`)
  }
  getStruct(id_struct){
    return this.http.get(`${this.API_URI}/structs/${id_struct}.json`)
  }
  getStructss(){
    return this.http.get(`${this.API_URI}/structs.json`)
  }

  addStruct(struct){
    return this.http.post(`${this.API_URI}/structs.json`,struct);
  }
}
