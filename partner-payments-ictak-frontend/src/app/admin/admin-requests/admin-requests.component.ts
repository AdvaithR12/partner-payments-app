import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit {

  trainingRequests: any = []

  constructor(private adminServices: AdminService) { }

  ngOnInit(): void {
    this.adminServices.getTrainingRequests()
      .subscribe({
        next: (response)=> {
          console.log(response);
          this.trainingRequests = response;
        },
        error: (err)=> {
          console.log(err);
        }
      });
  }

  generateWorkOrder() {
  }

}
