import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-work-order',
  templateUrl: './admin-work-order.component.html',
  styleUrls: ['./admin-work-order.component.css']
})
export class AdminWorkOrderComponent implements OnInit {

  public workOrderUrl: SafeResourceUrl = '';

  constructor(
    private adminServices: AdminService,
    private sanitizer: DomSanitizer 
  ) { }

  ngOnInit(): void {
    // let workOrderId = sessionStorage.getItem(`workOrderId`);
    // console.log(`http://localhost:8080/api/admin/getworkorder/${workOrderId}`);
    
    // this.workOrderUrl = `http://localhost:8080/workorder_630e8140e86b20c4dcbb215d.pdf`
    this.workOrderUrl =  this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:8080/workorder_630e8140e86b20c4dcbb215d.pdf');
  }

}
