import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  API_URI = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addOutputPrest(output,prest){
    return this.http.post(`${this.API_URI}/outputs.json`,{output:output, pending_returns:prest});
  }
  addOutput(output){
    return this.http.post(`${this.API_URI}/outputs.json`,{output:output});
  }
  getAvailabilities(){
    return this.http.get(`${this.API_URI}/availabilities.json`);
  }

  addOutputNoData(output){
    return this.http.post(`${this.API_URI}/outputs/nodata.json`,{output:output});
  }

  editOutputNoData(output){
    return this.http.post(`${this.API_URI}/outputs/edit-nodata.json`,output);
  }

  getAllOutputStatistics(){
    return this.http.get(`${this.API_URI}/outputs/statistics-all.json`);
  }

  getStructOutputStatistics(struct_id){
    return this.http.get(`${this.API_URI}/outputs/statistics/${struct_id}.json`);
  }

  getAllOutputStatisticsFecha(data){
    return this.http.post(`${this.API_URI}/outputs/statistics-all/date.json`,data);
  }

  getStructOutputStatisticsFecha(data){
    return this.http.post(`${this.API_URI}/outputs/statistics/date.json`,data);
  }
}
