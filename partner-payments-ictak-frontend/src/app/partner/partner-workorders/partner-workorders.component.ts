import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-partner-workorders',
  templateUrl: './partner-workorders.component.html',
  styleUrls: ['./partner-workorders.component.css']
})
export class PartnerWorkordersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let userId = localStorage.getItem('userid')
  }

}
