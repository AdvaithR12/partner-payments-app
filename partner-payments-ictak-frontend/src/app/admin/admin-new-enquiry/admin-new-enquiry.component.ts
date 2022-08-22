import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms'

@Component({
  selector: 'app-admin-new-enquiry',
  templateUrl: './admin-new-enquiry.component.html',
  styleUrls: ['./admin-new-enquiry.component.css']
})
export class AdminNewEnquiryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  

  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]),
    password: new FormControl('',[Validators.required,Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]),
    role: new FormControl('')
  })

  get email(){ 
    return this.loginForm.get('email');
  }
  
  get password(){ 
    return this.loginForm.get('password');
  }


  employeeRegister(){
    
    
  }

}
