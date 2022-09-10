import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {

  public workOrderUrl: SafeResourceUrl = '';

  constructor(
    private sanitizer: DomSanitizer 
  ) { }

  ngOnInit(): void {
    let goToUrl = sessionStorage.getItem('goToUrl');
    this.workOrderUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(`${goToUrl}`);
    console.log(this.workOrderUrl);
    
  }


}
