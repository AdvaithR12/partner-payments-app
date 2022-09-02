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

}
