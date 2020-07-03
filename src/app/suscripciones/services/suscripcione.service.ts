import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment'
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuscripcioneService {
    
  API_URI=environment.baseUrl;
  constructor(private http:HttpClient) {     
  }
  
  pedirPromocion(user){

   return this.http.get(`${this.API_URI}/users/client`,user);
  }
}
