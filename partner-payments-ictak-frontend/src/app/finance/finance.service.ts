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

}
