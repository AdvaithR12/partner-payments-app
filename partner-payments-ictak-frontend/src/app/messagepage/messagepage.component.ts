import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messagepage',
  templateUrl: './messagepage.component.html',
  styleUrls: ['./messagepage.component.css']
})
export class MessagepageComponent implements OnInit {
errormessage="";
  constructor() { }

  ngOnInit(): void {
    let isapproved = localStorage.getItem("isadminapproved")
    if(isapproved === "false")
    this.errormessage = "Your account is not appoved by Admin. Please contact the Admin"
  }

}
