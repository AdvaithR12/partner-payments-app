import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-modify-request',
  templateUrl: './admin-modify-request.component.html',
  styleUrls: ['./admin-modify-request.component.css']
})
export class AdminModifyRequestComponent implements OnInit {

  partners: any = [];
  textColor: string = '';

  trainingRequestForm = new FormGroup({
    trainingDetails: new FormGroup({
      topic: new FormControl('', [Validators.required]),
      partner: new FormControl('', [Validators.required])
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

  constructor( 
    private adminServices: AdminService,
    private router: Router
  ) { }

  requestId: any = '';

  ngOnInit(): void {

    this.requestId = sessionStorage.getItem('editRequestId');

    this.adminServices.getPartnerList() //load the list of partners to be displayed on the drop down list
      .subscribe({
        next: (succ)=> {
          this.partners = succ;
        },
        error: (err)=> {
          console.log(err);
        }
      });

    this.adminServices.getTrainingRequest(this.requestId)
      .subscribe({
        next: (succ: any)=> {
          succ.data.trainingDetails.partner = succ.data.trainingDetails.partnerId 
          let sessionStartDate = new Date(succ.data.sessionDetails.startTime);
          // console.log(`${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()}`);  
          // succ.data.sessionDetails.date = (`${startDate.getFullYear()}-${startDate.getMonth()}-0${startDate.getDate()}`).toString();
          // let startDate =  sessionStartDate.getDate().toString().slice(-2);
          // let startMonth = '0' + sessionStartDate.getMonth().toString().slice(-2);
          // let startYear = sessionStartDate.getFullYear().toString();

          // succ.data.sessionDetails.date =  `${startYear}-${startMonth}-${startDate}`
          console.log(succ);
          this.trainingRequestForm.patchValue(succ.data);
        },
        error: (err: any)=> {
          console.log(err.message);
        }
      });
  }

  toggleColor() {
    this.textColor = 'black'
  }

  saveModifiedRequest() {
    this.adminServices.updateRequest(this.trainingRequestForm.value, this.requestId)
      .subscribe({
        next: (response: any)=> {
          if(response.success) {
            alert('Successfully updated');
            this.router.navigate(['admin/requests']);
          } else {
            alert(response.message)
          }
        },
        error: (err: any)=> {
          console.log(err.message);
        }
      });
  }

}
