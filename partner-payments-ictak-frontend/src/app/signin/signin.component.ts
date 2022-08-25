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
    .subscribe((data: any)=>{
      
      this.result = JSON.parse(JSON.stringify(data));
      
      if(this.result.success) {
      if(!this.result.user.adminapproved) {   //if not approved by Admin then redirect to common message page
          localStorage.setItem("isadminapproved","false");
          this.router.navigate(['unauthorized']);
        } else {
          this.redirectTo(this.result.user.userType);
        }
      } else {
        alert(this.result.message);
      }    
    });
  }

  redirectTo(userType: any){
    localStorage.setItem("usertype",userType);  //store usertype in localstorage
    
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
