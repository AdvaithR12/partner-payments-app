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
          console.log(this.pendingUserlist);
          
        },
        error: (err)=> {
          console.log('Error getting pending user list', err.message);
        }
      });

  }
  approveuser(id:any){
    this.adminServices.approveuser(id)
      .subscribe({
        next: (succ: any)=> {
          console.log(succ);
          if(succ.success) {
            alert(`User account approved`)
            const currentRoute = this.router.url; // function to reload the current component
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
              }); 
          }
        },
        error: (err: any)=> {
          console.log('Error while approving user account', err.message);
        }
      }); 
    
  }
}
