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

   const newinvoiceId =  sessionStorage.getItem("Id")
    console.log(newinvoiceId)

    this.financeservices.remittanceForm(this.remittanceDetails, newinvoiceId)
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
