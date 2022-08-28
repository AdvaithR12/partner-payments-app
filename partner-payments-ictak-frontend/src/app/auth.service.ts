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
    console.log(' updateUserProfile() in service',user);
    return this.http.post<any>(`${this.server}/auth/updateProfile`,user);
  }
}
