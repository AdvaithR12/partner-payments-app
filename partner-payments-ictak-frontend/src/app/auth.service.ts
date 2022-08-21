import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  server: string = 'http://localhost:8080/api';

  User= {
    name:'',
    email:'',
    password:'',
    usertype:'',
    adminapproved: false
    }
  
  constructor(private http: HttpClient, private router: Router) { }

  addUser(user:any){
    console.log('inside service: ', user);
    return this.http.post<any>(`${this.server}/auth/signup`,user);
  }

  logUser(user:any){
    return this.http.post(`${this.server}/auth/signin`, user)
    .subscribe((data)=>{
      console.log('inside service: ', data);
      this.User = JSON.parse(JSON.stringify(data));

      //if not approved by Admin then redirect to common message page
      if(this.User.adminapproved === false){
        localStorage.setItem("isadminapproved","false");
        this.router.navigate(['messagepage']);
      }else{
        this.redirecttouserpage(this.User.usertype);
      }
    });
  }

  redirecttouserpage(userType:any){
    //store usertype in localstorage
    localStorage.setItem("usertype",this.User.usertype);
    //'Admin', 'Finance Admin','Partner'
    switch(userType){
      case "Admin":
        this.router.navigate(['admin/dashboard']);
        break;
      case "Finance Admin":
        this.router.navigate(['financedashboard']);
        break;
      case "Partner":
        this.router.navigate(['partnerdashboard']);
        break;
    }
    
  }

  
}
