import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceService } from '../finance.service'; 

@Component({
  selector: 'app-finance-invoices',
  templateUrl: './finance-invoices.component.html',
  styleUrls: ['./finance-invoices.component.css']
})
export class FinanceInvoicesComponent implements OnInit {

  pendingInvoices: any = [];
  approvedInvoices: any = [];
  advanceInvoices: any = [];
  invoiceType: any = []

  constructor(private financeServices: FinanceService ,
    private router: Router) { }

  ngOnInit(): void {

  this.financeServices.getInvoices(false)
    .subscribe({
      next: (succ: any)=> {
        this.approvedInvoices = succ.data;
        console.log(this.approvedInvoices);
      },
      error: (err)=> {
        console.log('Error getting approved invoices', err.message);
      }
    });

    this.financeServices.getInvoices(true)
    .subscribe({
      next: (succ: any)=> {
        this.advanceInvoices = succ.data;
        console.log(this.advanceInvoices);
      },
      error: (err)=> {
        console.log('Error getting advance invoices', err.message);
      }
    });
  }


  viewInvoice(invoiceId: any) {
    sessionStorage.setItem(`goToUrl`, `http://localhost:8080/api/finance/getinvoice/${invoiceId}`);
    this.router.navigate(['finance/invoices/getinvoice']);
  }

}
