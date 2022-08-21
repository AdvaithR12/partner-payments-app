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
      this.user = JSON.parse(JSON.stringify(data.user));
      
      if(this.user.adminApproved === false) {   //if not approved by Admin then redirect to common message page
        localStorage.setItem("isadminapproved","false");
        this.router.navigate(['unauthorized']);
      }else{
        this.redirectToUserPage(this.user.userType);
      }
    });
  }

  redirectToUserPage(userType: any){
    localStorage.setItem("usertype",userType);  //store usertype in localstorage
    
    switch(userType) {  //'Admin', 'Finance Admin','Partner'
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
