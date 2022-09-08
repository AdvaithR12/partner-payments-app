import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server: string = 'http://localhost:8080/api';

  user: any = {
    name: '',
    email: '',
    password: '',
    userType: '',
    adminApproved: false,
    additionalqualification : null,
    address : null,  
    gstnumber : null,
    heighestqualification: '',
    mobile : null,
    pannumber : null,
    partnertype : null,
    workexperience  : null,
    skills : []
  }

  constructor( private http: HttpClient ) { }

  addUser(user:any) {
    return this.http.post<any>(`${this.server}/auth/signup`,user);
  }

  logUser(user:any) {
    return this.http.post(`${this.server}/auth/signin`, user);
  }

  getUserProfile(id:any){
    return this.http.get(`${this.server}/auth/findprofile/`+id);
  }

  updateUserProfile(user:any){
    return this.http.post<any>(`${this.server}/auth/updateProfile`,user);
  }

  loggedIn(userType: any): boolean {
    let userId = localStorage.getItem('userid');
    let token = localStorage.getItem('user-token');

    if(userId && token) {
      try {
        var userData = JSON.parse(window.atob(token.split('.')[1]));
        var tokenHeader = JSON.parse(window.atob(token.split('.')[0]));
      } catch {
        console.error(`Tampered token`);
        return false;
      }
    } else {
      return false;
    }

    if(JSON.stringify(tokenHeader) == JSON.stringify({alg: 'HS256', typ: 'JWT'})) {
      if(userData._id == userId) {
        return userData.userType == userType;
      } else {
        return false;
      }
    } else {
      console.error(`Tampered token`);
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('user-token');
  }

}
