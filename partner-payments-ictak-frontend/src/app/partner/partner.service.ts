import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from "../globals";

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor( private http: HttpClient ) { }

  invoiceFormUpload(data: any) {
    return this.http.post(`${server}/partner/invoice`, data);
  }

  invoiceFileUpload(data: any) {
    return this.http.post<any>(`${server}/partner/multipleFiles`, data)
  }

  getWorkOrders(userId: any) {
    return this.http.get(`${server}/partner/getworkorders`, { params: { userId: userId } });

  }

  fetchWorkOrderData(workOrderNumber: any) {
    return this.http.get<any>(`${server}/partner/workorder`, { params: { workOrderNumber: workOrderNumber } });
  }
}
