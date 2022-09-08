import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceService } from '../finance.service'; 

@Component({
  selector: 'app-finance-remittance',
  templateUrl: './finance-remittance.component.html',
  styleUrls: ['./finance-remittance.component.css']
})
export class FinanceRemittanceComponent implements OnInit {

  remittanceDetails : any={}

  constructor( private financeservices: FinanceService,
    private router: Router) { }

  ngOnInit(): void {

  }
  submitForm(){
    // console.log(this.remittanceDetails)

   const invoiceId =  sessionStorage.getItem("invoiceId")
   const workOrderId =  sessionStorage.getItem("workOrderId")
    console.log(invoiceId)
    console.log(workOrderId)

    this.financeservices.remittanceForm(this.remittanceDetails, invoiceId, workOrderId)
        .subscribe({
      next: (succ: any)=> {
        if(succ.success) {
          console.log(this.remittanceDetails)
          // this.router.navigate(['partner/dashboard'])
        }
      },
      error: (err)=> {
        console.log('Error', err);
      }
    });


  }
}
