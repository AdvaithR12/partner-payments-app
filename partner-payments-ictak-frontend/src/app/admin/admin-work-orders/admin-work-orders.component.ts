import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-work-orders',
  templateUrl: './admin-work-orders.component.html',
  styleUrls: ['./admin-work-orders.component.css']
})
export class AdminWorkOrdersComponent implements OnInit {

  workOrders: any = []

  constructor(private adminServices :AdminService ) { }

  ngOnInit(): void {
    this.adminServices.getWorkOrders()
      .subscribe({
        next: (data: any)=> {
          console.log(data.workOrders);
          
          if(data.success) {
            this.workOrders = data.workOrders
          } else {
            alert(`Server error while fetching work orders`);
          }
        },
        error: (err)=> {
          console.log(err.message);
          alert(`Unknown error while fetching work orders`);
        }
      });
  }

  viewWorkOrderPdf(workOrderId: any) {

  }

}
