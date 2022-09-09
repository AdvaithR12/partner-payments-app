import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from "../globals";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient) { }

  addNewRequest(trainingRequestData: any) {
    return this.http.post(`${server}/admin/newrequest`, { trainingRequest: trainingRequestData });
  }

  getTrainingRequests() {
    return this.http.get(`${server}/admin/trainingrequests`);
  }

  getTrainingRequest(requestId: any) {
    return this.http.get(`${server}/admin/trainingrequest`, {params: {requestId: requestId}});
  }

  createWorkOrder(requestId: any) {
    return this.http.post(`${server}/admin/createworkorder`, { requestId: requestId });
  }

  getPartnerList() {
    return this.http.get(`${server}/admin/getpartners`);
  }

  getWorkOrders(approvalStatus: any) {
    return this.http.get(`${server}/admin/getworkorders`, { params: approvalStatus });
  }

  getInvoices(approvalStatus: any) {
    return this.http.get(`${server}/admin/getinvoices`,  { params: approvalStatus } );
  }

  updateRequest(trainingRequestData: any) {
    return this.http.put(`${server}/admin/updaterequest`, { trainingRequest: trainingRequestData });
  }

  approveInvoice(invoiceId: any, dueDate: any) {
    return this.http.put(`${server}/admin/approveinvoice`, { 
      invoiceId: invoiceId, 
      dueDate: dueDate 
    });
  }
  
  getUserlist() { //List to approve users
    return this.http.get(`${server}/admin/getuserlist`);
  }
  approveuser(id:any){
    return this.http.put(`${server}/admin/approveuser/`,{
      id: id
    });
  }
}
