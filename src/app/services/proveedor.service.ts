import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getProviders(){
    return this.http.get(`${this.API_URI}/providers.json`);
  }
  addProvider(provider){
    return this.http.post(`${this.API_URI}/providers.json`,provider);
  }
}
