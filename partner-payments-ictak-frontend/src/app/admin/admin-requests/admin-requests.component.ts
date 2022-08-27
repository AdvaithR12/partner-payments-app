import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {

  partners: any = [];
  trainingRequests: any = [];

  constructor( private adminServices: AdminService ) { }

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

  generateWorkOrder(requestId: any) {
    this.adminServices.createWorkOrder(requestId)
    .subscribe({
      next: (response)=> {
        console.log('success', response);
      },
      error: (err)=> {
        console.log('error', err);
      }
    });
  }

}
