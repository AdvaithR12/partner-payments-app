import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-new-enquiry',
  templateUrl: './admin-new-enquiry.component.html',
  styleUrls: ['./admin-new-enquiry.component.css']
})
export class AdminNewEnquiryComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  textColor: string ='';

  trainingRequestForm = new FormGroup({
    trainingDetails: new FormGroup({
      topic: new FormControl('', [Validators.required]),
      partner: new FormControl('')
    }),
    sessionDetails: new FormGroup({
      mode: new FormControl(''),
      date: new FormControl(''),
      venue: new FormControl(''),
      hourlyPayment: new FormControl(''),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
    })
  });

  ngOnInit(): void {
  }

  toggleColor() {
    this.textColor = 'black'
  }

  saveRequest() {
    this.adminService.addNewRequest(this.trainingRequestForm.value)
      .subscribe({
        next: (response)=> {
          console.log(response);
        },
        error: (err)=> {
          console.log(err);
        }
      });
  }

}
