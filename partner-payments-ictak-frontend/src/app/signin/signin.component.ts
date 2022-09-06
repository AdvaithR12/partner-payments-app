import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  result:any = {};
  user:any = {};

  constructor(
    private auth:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logUser(user:any){
    
    this.auth.logUser(user)
      .subscribe({
        next: (data: any)=> {        
          this.result = JSON.parse(JSON.stringify(data));
          let token = this.result.token
          let userData = JSON.parse(window.atob(token.split('.')[1]))
          
          if(this.result.success) {
            if(!userData.adminapproved) {   //if not approved by Admin then redirect to common message page
              this.router.navigate(['unauthorized']);
            } else {
              localStorage.setItem('user-token', token);
              localStorage.setItem("userid",this.result.userId.toString());  //store userid in localstorage
              this.redirectTo(userData);
            }
          } else {
            alert(this.result.message);
          }
        },
        error: (err: any)=> {
          console.error('Error while signing in!', err.message);
          alert(err.error.message);
        }
      });
      
  }

  redirectTo(user: any){
    var userType = user.userType;
    // localStorage.setItem("usertype",userType);  //store usertype in localstorage

    switch(userType) {  //'Admin', 'Finance Admin','Partner'
      case "Admin":
        this.router.navigate(['admin/dashboard']);
        break;
      case "Finance Admin":
        this.router.navigate(['finance/dashboard']);
        break;
      case "Partner":
        this.router.navigate(['partner/dashboard']);
        break;
    }
  }

}
