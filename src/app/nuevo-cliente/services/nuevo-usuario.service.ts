import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NuevoUsuarioService {

  API_URI=environment.baseUrl;
  constructor(private http:HttpClient) { 

  }
  enviar(user){
   return this.http.post(`${this.API_URI}/users/client`,user);
  }
}
