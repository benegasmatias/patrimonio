import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  API_URI = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  getStructExterno(){
    return this.http.get(`${this.API_URI}/origin-structs.json`);
  }
}
