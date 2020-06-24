import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URI=environment.baseUrl;

  constructor(private http:HttpClient) { }

 login(user){

     let u={
       username:user.username,
      password:user.password
      }

    return this.http.post(`${this.API_URI}/users/login`,u);

 }
 logout(){
   let tokenAccess= sessionStorage.getItem('accessToken');
   sessionStorage.removeItem("accessToken");
   sessionStorage.removeItem("currentUser");
  return ; 
 }

 setUser(user)
 {
      let login_user = JSON.stringify(user);
      sessionStorage.setItem("currentUser", login_user);
 }
 setToken(token){
  sessionStorage.setItem("accessToken",token);
 }
 getToken(){
   return sessionStorage.getItem("accessToken");
 }
 isLogged(){
   
    return (sessionStorage.getItem("accessToken") != null);
   
 }


 //login de edit
}
