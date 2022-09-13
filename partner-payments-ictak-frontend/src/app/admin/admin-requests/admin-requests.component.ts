import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { server } from 'src/app/globals';
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

    this.adminServices.getWorkOrders('admin-approved')
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
          } else {
            alert(`Work Order generation failed`)
          }
        },
        error: (err)=> {
          alert('Work Order generation failed')
          console.log('error', err);
        }
      });
    }
  }

  modifyRequest(requestId: any) {
    sessionStorage.setItem('editRequestId', requestId);
    this.router.navigate(['admin/requests/modifyrequest']);
  }

  deleteRequest(requestId:any) {
    if(confirm(`Are you sure you want to delete this Training Request?`)) {
    this.adminServices.deleteRequest(requestId)
    .subscribe({
      next: (data: any) => {
        console.log(data)
        if(data.success) {
          alert(data.message);

          const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
              }); 
              
        } else {
          alert(data.message)
        }
      },
      error: (err: any)=> {
        alert('Failed to delete training request')
      }
    });
    }
  }

  viewWorkOrderPdf(workOrderId: any, workOrderNumber: any) {
    
    sessionStorage.setItem(`goToUrl`, `${server}/admin/getworkorder/${workOrderId}/${encodeURIComponent(workOrderNumber)}`);
    this.router.navigate(['admin/requests/workorder']);
  };

}
