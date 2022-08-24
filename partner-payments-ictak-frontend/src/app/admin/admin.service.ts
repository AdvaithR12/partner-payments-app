import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  server: string = 'http://localhost:8080/api';

  constructor( private http: HttpClient) { }

  addNewRequest(trainingRequestData: any) {
    return this.http.post(`${this.server}/admin/newrequest`, { trainingRequest: trainingRequestData });
  }

  getTrainingRequests() {
    return this.http.get(`${this.server}/admin/trainingrequests`);
  }
}
