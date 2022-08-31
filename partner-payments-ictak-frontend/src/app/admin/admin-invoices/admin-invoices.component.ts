import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.css']
})
export class AdminInvoicesComponent implements OnInit {

  pendingInvoices: any = [];
  approvedInvoices: any = [];

  constructor(private adminServices: AdminService) { }

  ngOnInit(): void {

    this.adminServices.getInvoices({ adminApproved: false })
      .subscribe({
        next: (succ: any)=> {
          this.pendingInvoices = succ.data;
        },
        error: (err)=> {
          console.log('Error getting pending invoices', err.message);
        }
      });

    this.adminServices.getInvoices({ adminApproved: true })
      .subscribe({
        next: (succ: any)=> {
          this.approvedInvoices = succ.data;
        },
        error: (err)=> {
          console.log('Error getting approved invoices', err.message);
        }
      });

  }

  approve(invoiceId: any) {

  }

  viewInvoice(invoiceId: any) {

  }

}
