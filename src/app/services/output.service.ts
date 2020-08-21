import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addOutput(output){
    return this.http.post(`${this.API_URI}/outputs.json`,output)
  }

  getAvailabilities(){
    return this.http.get(`${this.API_URI}/availabilities.json`);
  }


}
