import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  server: string = 'http://localhost:8080/api'

  constructor( private http: HttpClient ) { }

  invoiceFormUpload(data: any) {
    return this.http.post("${this.server}/partner/invoice", data);
  }

  invoiceFileUpload(data: any) {
    return this.http.post<any>('${this.server}/partner/multipleFiles', data)
  }

  
  getPartnerList() {
    return this.http.get(`${this.server}/partner/getpartners`);
  }

  getWorkOrders(userId: any) {
    return this.http.get(`${this.server}/partner/getworkorders`, { params: { userId: userId } });
  }
}
