import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { PartnerService } from '../partner.service';
import { SigninComponent } from 'src/app/signin/signin.component';

@Component({
  selector: 'app-partner-workorders',
  templateUrl: './partner-workorders.component.html',
  styleUrls: ['./partner-workorders.component.css']
})
export class PartnerWorkordersComponent implements OnInit {

  partners: any = [];
  trainingRequests: any = [];
  workOrders: any = []

  

  constructor( 
    private partnerServices: PartnerService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    var userid = localStorage.getItem("userid")

    this.partnerServices.getWorkOrders(userid)
    .subscribe({
      next: (data: any)=> {
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
    sessionStorage.setItem(`goToUrl`, `http://localhost:8080/api/partner/getworkorder/${workOrderId}`);
    this.router.navigate(['partner/workorders/getworkorder']);
  }

}
