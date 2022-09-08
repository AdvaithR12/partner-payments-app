import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-payments',
  templateUrl: './admin-payments.component.html',
  styleUrls: ['./admin-payments.component.css']
})
export class AdminPaymentsComponent implements OnInit {

  paidInvoices : any = [];

  constructor(private adminServices: AdminService,
    private router: Router) { }

  ngOnInit(): void {


    this.adminServices.getInvoices({ paid: true })
    .subscribe({
      next: (succ: any)=> {
        this.paidInvoices = succ.data;
      },
      error: (err)=> {
        console.log('Error getting paid invoices', err.message);
      }
    });
  }

  viewInvoice(invoiceId: any) {
    sessionStorage.setItem(`goToUrl`, `http://localhost:8080/api/admin/getinvoice/${invoiceId}`);
    this.router.navigate(['admin/invoices/getinvoice']);
  }
}
