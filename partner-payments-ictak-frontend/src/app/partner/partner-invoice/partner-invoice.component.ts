import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PartnerService } from '../partner.service';

@Component({
  selector: 'app-partner-invoice',
  templateUrl: './partner-invoice.component.html',
  styleUrls: ['./partner-invoice.component.css']
})
export class PartnerInvoiceComponent implements OnInit {

  invoiceData = {
    name: '',
    email: '',
    contactnumber: '',
    workorderid:'',
    invoiceid:''  
  }

  displayMultipleInvoices!: Boolean;

  @ViewChild('multipleInput', { static: false }) multipleInput!: ElementRef;

  images:any;
  multipleInvoices=[]

  constructor(
    private http:HttpClient, 
    private partnerServices: PartnerService,
    private router: Router
  ) { this.displayMultipleInvoices = false; }

  selectMultipleInvoice(event:any) {
    if(event.target.files.length > 0) {
      this.multipleInvoices = event.target.files
    }
  }

  ngOnInit(): void {
  }

  uploadInvoice(){

    const formdata = new FormData()

    for (let img of this.multipleInvoices) {
      formdata.append('files',img)
    }

    //do the form upload call on successfull completion of fileupload
    this.partnerServices.invoiceFileUpload(formdata)
    .subscribe((res) => {
      this.multipleInput.nativeElement.value = ""
      console.log(res.path)
      this.displayMultipleInvoices=true
    })

    console.log(this.invoiceData);
    this.partnerServices.invoiceFormUpload(this.invoiceData)
      .subscribe({
        next: (succ: any)=> {
          if(succ.success) {
            console.log('success')
          }
        },
        error: (err)=> {
          console.log('Error', err);
        }
      })
  }
}
