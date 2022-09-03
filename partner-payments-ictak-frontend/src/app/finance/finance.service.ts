import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  server: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getInvoices(invoiceType:any) {
    return this.http.get(`${this.server}/finance/getinvoices`,  { params: { 'invoiceType': invoiceType} });
  }
/*
approveuser(id:any){
    return this.http.put(`${this.server}/admin/approveuser/`,{
      id: id
    });
  }
*/
/*
approveInvoice(invoiceId: any, dueDate: any) {
    return this.http.put(`${this.server}/admin/approveinvoice`, { 
      invoiceId: invoiceId, 
      dueDate: dueDate 
    });
  }

*/
  setworkorder(id:any, approve: boolean){
    return this.http.put(`${this.server}/finance/setworkorder`,{
      id: id,
      financeApproved:approve
    });
  }

  
}
