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

  editInput(input){
    return this.http.post(`${this.API_URI}/inputs/edit.json`,input)
  }

  getInputByStruct(struct_id){
    return this.http.get(`${this.API_URI}/inputs/struct/${struct_id}.json`)
  }

  deleteInput(input){
    return this.http.post(`${this.API_URI}/inputs/delete.json`,input)
  }

  getObservation(inp_elem_id){
    return this.http.get(`${this.API_URI}/inventario/observation/${inp_elem_id}.json`)
  }
  setObservation(data){
    return this.http.post(`${this.API_URI}/inventario/observation.json`,data)
  }

  getAllInputStatistics(){
    return this.http.get(`${this.API_URI}/inputs/statistics-all.json`);//inputs
  }

  getStructInputStatistics(struct_id){
    return this.http.get(`${this.API_URI}/inputs/statistics/${struct_id}.json`);
  }

  getAllInputStatisticsFecha(data){
    return this.http.post(`${this.API_URI}/inputs/statistics-all/date.json`,data);
  }

  getStructInputStatisticsFecha(data){
    return this.http.post(`${this.API_URI}/inputs/statistics/date.json`,data);
  }
}
