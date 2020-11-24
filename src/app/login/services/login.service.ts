import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  API_URI = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(user) {
   
    return this.http.post(`${this.API_URI}/users/login.json`, user);
  }
  logout() {
    let tokenAccess = sessionStorage.getItem('accessToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('currentUser');
    return;
  }

  setUser(user) {
    let login_user = JSON.stringify(user);
    sessionStorage.setItem('currentUser', login_user);
  }
  getUser() {
    console.log(sessionStorage.getItem('currentUser'));
  }

  // setAcademia(academi) {
  //   let academia = JSON.stringify(academi);
  //   sessionStorage.setItem('academia', academia);
  // }
  getAcademia() {
    console.log(sessionStorage.getItem('academia'));
  }
  setToken(token) {
    sessionStorage.setItem('accessToken', token);
    console.log(sessionStorage.getItem('accessToken'));
  }
  getToken() {
    return sessionStorage.getItem('accessToken');
  }
  isLogged() {
    console.log(sessionStorage.getItem('accessToken'));
    return sessionStorage.getItem('accessToken') != null;
  }

  // create(archivo){
  //   return this.http.post(`${this.API_URI}/users.json`,archivo);
  // }

  //login de edit
}
