import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-work-order',
  templateUrl: './admin-work-order.component.html',
  styleUrls: ['./admin-work-order.component.css']
})
export class AdminWorkOrderComponent implements OnInit {

  workOrderUrl: string ='';

  constructor(private adminServices :AdminService ) { }

  ngOnInit(): void {
    let workOrderId = localStorage.getItem(`workOrderId`);
    console.log(`http://localhost:8080/api/admin/getworkorder/${workOrderId}`);
    
    this.workOrderUrl = `https://localhost:8080/api/admin/getworkorder/${workOrderId}`
  }

}
