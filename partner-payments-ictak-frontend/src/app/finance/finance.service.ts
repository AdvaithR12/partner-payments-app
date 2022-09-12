import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { server } from "../globals";

@Injectable({
  providedIn: 'root'
})

export class FinanceService {

  constructor(private http: HttpClient) { }

  getInvoices(invoiceType:any) {
    return this.http.get(`${server}/finance/getinvoices`,  { params: { 'invoiceType': invoiceType} });
  }

  getWorkOrders(approvalStatus: any) {
    return this.http.get(`${server}/finance/getworkorders`, { params: {'approvalStatus' : approvalStatus} });
  }

  approveuser(id:any){
    return this.http.put(`${server}/admin/approveuser/`,{
      id: id
    });
  }

  approveInvoice(invoiceId: any, dueDate: any) {
    return this.http.put(`${server}/admin/approveinvoice`, { 
      invoiceId: invoiceId, 
      dueDate: dueDate 
    });
  } 

  remittanceForm(data:any, invoiceId:any, workOrderId: any){
    return this.http.post<any>(`${server}/finance/remittance`, {
      data: data,
      invoiceId: invoiceId,
      workOrderId: workOrderId
    })
  }

  setworkorder(id:any, approve: boolean){
    return this.http.put(`${server}/finance/setworkorder`,{
      id: id,
      financeApproved:approve
    });
  }

}
