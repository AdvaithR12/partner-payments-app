import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  logUser(user:any){
    return this.http.post("http://localhost:8080/api/auth/login", user)
    .subscribe((data)=>{
      // alert('success');
      this.router.navigate(['admin/dashboard']);
    });
  }

  addUser(user:any){
    console.log('inside service: ', user);
    return this.http.post<any>("http://localhost:8080/api/auth/adduser",user);
  }
  
}
