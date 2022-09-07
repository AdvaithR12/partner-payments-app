import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  pendingUserlist: any = [];
  //approvedUserlist: any = [];

  constructor(private adminServices: AdminService,
    private router: Router) { }

  ngOnInit(): void {
    this.adminServices.getUserlist()
      .subscribe({
        next: (succ: any)=> {
          this.pendingUserlist = succ.data;
        },
        error: (err)=> {
          console.log('Error getting pending user list', err.message);
        }
      });

  }
  approveuser(id:any, email:any, userType:any){

    if(confirm(`Approve and authorize the user (${email}) to access the portal as ${userType}`)) {
      this.adminServices.approveuser(id)
      .subscribe({
        next: (succ: any)=> {
          if(succ.success) {
            alert(`User account approved`)
            const currentRoute = this.router.url; // function to reload the current component
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
              }); 
          } else {
            alert(succ.message)
          }
        },
        error: (err: any)=> {
          console.log('Error while approving user account', err.message);
          alert(err.error.message)
        }
      }); 
    }
    
  }
}
