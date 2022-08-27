import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor( private http: HttpClient ) { }

  invoiceUpload(data: any) {
    return this.http.post("http://localhost:8080/partner/invoice", data);
  }
}
