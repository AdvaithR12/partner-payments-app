import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-finance-work-orders',
  templateUrl: './finance-work-orders.component.html',
  styleUrls: ['./finance-work-orders.component.css']
})
export class FinanceWorkOrdersComponent implements OnInit {

  partners: any = [];
  pendingWorkOrders: any = [];
  financeApprovedWorkOrders: any = [];

  constructor( 
    private adminServices: AdminService,
    private router: Router 
  ) { }

  ngOnInit(): void {

    this.adminServices.getWorkOrders({ financeApproved: false })
    .subscribe({
      next: (data: any)=> {
        if(data.success) {
          this.pendingWorkOrders = data.workOrders
        } else {
          alert(`Server error while fetching work orders`);
        }
      },
      error: (err: any)=> {
        console.log(err.message);
        alert(`Unknown error while fetching work orders`);
      }
    });

    this.adminServices.getWorkOrders({ financeApproved: true })
    .subscribe({
      next: (data: any)=> {
        if(data.success) {
          this.financeApprovedWorkOrders = data.workOrders
        } else {
          alert(`Server error while fetching work orders`);
        }
      },
      error: (err: any)=> {
        console.log(err.message);
        alert(`Unknown error while fetching work orders`);
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
        error: (err: any)=> {
          console.log('error', err);
        }
      });
    }
  }

  viewWorkOrderPdf(workOrderId: any) {
    localStorage.setItem(`workOrderId`, workOrderId);
    this.router.navigate(['admin/workorder']);
  }

}
