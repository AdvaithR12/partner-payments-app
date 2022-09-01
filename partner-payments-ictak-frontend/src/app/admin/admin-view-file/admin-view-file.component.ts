import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-view-file',
  templateUrl: './admin-view-file.component.html',
  styleUrls: ['./admin-view-file.component.css']
})
export class AdminViewFileComponent implements OnInit {

  public workOrderUrl: SafeResourceUrl = '';

  constructor(
    private adminServices: AdminService,
    private sanitizer: DomSanitizer 
  ) { }

  ngOnInit(): void {
    let goToUrl = sessionStorage.getItem('goToUrl');
    this.workOrderUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(`${goToUrl}`);
  }

}
