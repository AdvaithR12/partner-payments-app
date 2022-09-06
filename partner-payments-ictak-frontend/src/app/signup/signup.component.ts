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
    userType:'Admin',
    adminapproved: false
  }
  retypePassword :string = '';
  usertypes= ['Admin', 'Finance Admin','Partner']
  
  addUser() {    

    if(this.loginuser.password == this.retypePassword) {
      this.auth.addUser(this.loginuser)
      .subscribe({
        next: (succ: any)=> {
          if(succ.success) {
            alert('Sign Up successful. Proceed to sign in and use your account!');
            this.router.navigate(['']);
          }
        },
        error: (err: any)=> {
          alert(`${err.error.message}, Try again`);
          const currentRoute = this.router.url; // function to reload the current component
          this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentRoute]); // navigate to same route
            }); 
        }
      });
    } else {
      alert(`Passwords doesn't match`)
    }
  }

}
