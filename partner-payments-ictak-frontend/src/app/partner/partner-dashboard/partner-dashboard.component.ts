import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.css']
})
export class PartnerDashboardComponent implements OnInit {

  loggedInUser: any;
  completedProfile: Boolean = false;

  constructor( private authServices: AuthService) { }

  ngOnInit(): void {
    let userId = localStorage.getItem('userid');
    this.authServices.getUserProfile(userId)
      .subscribe({
        next: (data: any)=> {
          this.loggedInUser =JSON.parse(JSON.stringify(data));

          if(!this.loggedInUser.address){
            this.completedProfile = false;
          } else if(this.loggedInUser.partnerType == 'Individual') {
            this.completedProfile = !!this.loggedInUser.pannumber? true : false;
          } else if(this.loggedInUser.partnerType == 'Company') {
            this.completedProfile = !!this.loggedInUser.gstnumber? true : false;
          } else this.completedProfile = true;

        },
        error: (err: any)=> {
          console.log(`Can't find user`, err.message);
        }
      });
  }

}
