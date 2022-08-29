import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor( private http: HttpClient ) { }

  invoiceFormUpload(data: any) {
    return this.http.post("http://localhost:8080/partner/invoice", data);
  }

  invoiceFileUpload(data: any) {
    return this.http.post<any>('http://localhost:8080/partner/multipleFiles', data)
  }
}
