import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilClienteService {

  API_URI=environment.baseUrl;
  constructor(private http:HttpClient) {     
  }
  
  enviar(user){
   return this.http.post(`${this.API_URI}/users/client`,user);
  }

 recuperamonedas(){

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };
    return this.http.get(`${this.API_URI}/monedas` ,httpOptions  );
  }
}
