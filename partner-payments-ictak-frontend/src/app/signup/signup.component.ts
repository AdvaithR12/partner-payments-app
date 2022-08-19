import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginuser= {
    name:'',
    email:'',
    password:'',
    usertype:'Admin'
    }
  retypePassword :string = '';
    usertypes= ['Admin', 'Finance Admin','Partner']
  
addUser()
  {    
    if(this.loginuser.password == this.retypePassword) {
      console.log('req :', this.loginuser);
   
      this.auth.addUser(this.loginuser)
      .subscribe(
        res=>{
          //localStorage.setItem('token',res.token)
          //this.router.navigate(['products'])
          console.log('res :', res);
          if(res.success == true) {
            alert('New user added');
          } else {
            alert(res.message);
          }
        })
    } else {
      alert(`Passwords doesn't match`)
    }
   
    
   // this.router.navigate(['login'])
  }

}
