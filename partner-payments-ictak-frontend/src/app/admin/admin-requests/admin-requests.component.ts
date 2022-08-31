import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {

  partners: any = [];
  trainingRequests: any = [];
  workOrders: any = []

  constructor( 
    private adminServices: AdminService,
    private router: Router 
  ) { }

  ngOnInit(): void {

    this.adminServices.getPartnerList()
    .subscribe({
      next: (succ)=> {
        this.partners = succ;
      },
      error: (err)=> {
        console.log(err);
      }
    })

    this.adminServices.getWorkOrders({ adminApproved: true })
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

    this.adminServices.getTrainingRequests()
      .subscribe({
        next: (response)=> {
          this.trainingRequests = response;
        },
        error: (err)=> {
          console.log(err);
        }
      });
  }

  approve(requestId: any) {
    if(confirm(`Create Work Order and forward the request to Finance Department? (This might take a few seconds)`)) {
      this.adminServices.createWorkOrder(requestId)
      .subscribe({
        next: (response: any)=> {
          if(response.success) {
            alert(`Work Order successfully generated`)
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
              }); 
          }
        },
        error: (err)=> {
          console.log('error', err);
        }
      });
    }
  }

  viewWorkOrderPdf(workOrderId: any) {
    sessionStorage.setItem(`workOrderId`, workOrderId);
    this.router.navigate(['admin/workorder']);
  }

}
