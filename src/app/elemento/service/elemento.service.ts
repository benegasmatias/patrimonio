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
}
