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
    // console.log(userid)
    
    this.partnerServices.getPartnerList()
    .subscribe({
      next: (succ)=> {

        this.partners = succ;
      },
      error: (err)=> {
        console.log(err);
      }
    })

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

    // this.adminServices.getTrainingRequests()
    //   .subscribe({
    //     next: (response)=> {
    //       this.trainingRequests = response;
    //     },
    //     error: (err)=> {
    //       console.log(err);
    //     }
    //   });
  }

  // approve(requestId: any) {
  //   if(confirm(`Create Work Order and forward the request to Finance Department? (This might take a few seconds)`)) {
  //     this.adminServices.createWorkOrder(requestId)
  //     .subscribe({
  //       next: (response: any)=> {
  //         if(response.success) {
  //           alert(`Work Order successfully generated`)
  //           const currentRoute = this.router.url;
  //           this.router.navigateByUrl('/', { skipLocationChange: true })
  //             .then(() => {
  //               this.router.navigate([currentRoute]); // navigate to same route
  //             }); 
  //         }
  //       },
  //       error: (err)=> {
  //         console.log('error', err);
  //       }
  //     });
  //   }
  // }

  viewWorkOrderPdf(workOrderId: any) {
    sessionStorage.setItem(`workOrderId`, workOrderId);
    this.router.navigate(['admin/workorder']);
  }

}
