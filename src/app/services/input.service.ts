import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InputService {
  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

    addInput(input){
    return this.http.post(`${this.API_URI}/inputs.json`,input)
  }

  getInputByStruct(struct_id){
    return this.http.get(`${this.API_URI}/inputs/struct/${struct_id}.json`)
  }

  deleteInput(input){
    return this.http.post(`${this.API_URI}/inputs/delete.json`,input)
  }
}
