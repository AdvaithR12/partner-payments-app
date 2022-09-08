import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-new-request',
  templateUrl: './admin-new-request.component.html',
  styleUrls: ['./admin-new-request.component.css']
})
export class AdminNewRequestComponent implements OnInit {

  constructor(
    private adminServices: AdminService,
    private router: Router 
  ) { }

  partners: any = [];
  textColor: string = '';

  trainingRequestForm: any = new FormGroup({
    trainingDetails: new FormGroup({
      topic: new FormControl('', [Validators.required]),
      partnerId: new FormControl('', [Validators.required])
    }),
    sessionDetails: new FormGroup({
      mode: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      venue: new FormControl('', [Validators.required]),
      hourlyPayment: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
    })
  });

  ngOnInit(): void {
    this.adminServices.getPartnerList() //load the list of partners to be displayed on the drop down list
      .subscribe({
        next: (succ)=> {
          this.partners = succ;
        },
        error: (err)=> {
          console.log(err);
        }
      });
  }

  toggleColor() {
    this.textColor = 'black'
  }

  saveRequest() {
    this.trainingRequestForm.value.assignedBy = localStorage.getItem('user-name')
    this.adminServices.addNewRequest(this.trainingRequestForm.value)
      .subscribe({
        next: (response: any)=> {
          if(response.success) {
            alert('Successfully added new request');
            this.router.navigate(['admin/requests']);
          } else {
            alert(`Failed to add new request. ${response.message}`);
          }
        },
        error: (err)=> {
          alert(`Failed to add new request, ${err.error.message}`);
          console.log('Error while adding new request', err.message);
        }
      });
  }

}
