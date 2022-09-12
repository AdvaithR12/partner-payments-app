import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { FinanceService} from 'src/app/finance/finance.service';
import { server } from 'src/app/globals';

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
    private adminServices : AdminService,
    private financeServices: FinanceService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.adminServices.getWorkOrders('finance-pending') // fetch all pending invoices
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

    this.adminServices.getWorkOrders('finance-approved')
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

  approve_old(requestId: any) {
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

  //Approve
  approveworkorder(requestId: any){
    if(confirm('Approve work order and forward to partner?')) {
      this.financeServices.setworkorder(requestId, true)
        .subscribe({
          next: (succ: any)=> {
            console.log(succ);
            if(succ.success) {
              alert(`Work order approved`)
              const currentRoute = this.router.url; // function to reload the current component
              this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentRoute]); // navigate to same route
                }); 
            }
          },
          error: (err: any)=> {
            console.log('Error while approving work order', err.message);
          }
        }); 
    }
  }

   //Reject
  rejectworkorder(requestId: any){
    if(confirm('Reject this work order?')) {
      this.financeServices.setworkorder(requestId, false)
      .subscribe({
        next: (succ: any)=> {
          console.log(succ);
          if(succ.success) {
            alert(`Work order rejected`)
            const currentRoute = this.router.url; // function to reload the current component
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
              }); 
          }
        },
        error: (err: any)=> {
          console.log('Error while rejecting work order ', err.message);
        }
      }); 
    }
  }

  //View
  viewworkorder(workOrderId: any){
    sessionStorage.setItem(`goToUrl`, `${server}/admin/getworkorder/${workOrderId}`);
    this.router.navigate(['finance/workorders/getworkorder']);
  }
}
