import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  User = {
    email: '',
    password: '',
  };

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  logUser(User:any){
    this.auth.logUser(this.User)
  }

}
