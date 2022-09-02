import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.css']
})
export class AdminInvoicesComponent implements OnInit {

  pendingInvoices: any = [];
  approvedInvoices: any = [];

  constructor(
    private adminServices: AdminService,
    private router: Router
  ) { }

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
    if(confirm(`Approve invoice and forward to finance for payment?`)) {
      let daysForPayment = prompt('Enter the number of days before the payment should be made');
      this.adminServices.approveInvoice(invoiceId, daysForPayment)
      .subscribe({
        next: (succ: any)=> {
          console.log(succ);
          if(succ.success) {
            alert(`Invoice approved and forwarded to finance department`)
            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([currentRoute]); // navigate to same route
              }); 
          }
        },
        error: (err: any)=> {
          console.log('Error while approving invoice', err.message);
        }
      });    
    }
  }

  viewInvoice(invoiceId: any) {
    sessionStorage.setItem(`goToUrl`, `http://localhost:8080/api/admin/getinvoice/${invoiceId}`);
    this.router.navigate(['admin/invoices/getinvoice']);
  }

}
