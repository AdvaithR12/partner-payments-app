import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner-template',
  templateUrl: './partner-template.component.html',
  styleUrls: ['./partner-template.component.css']
})
export class PartnerTemplateComponent implements OnInit {
  @ViewChild('viewChildHook', {static: true}) sideBar!: ElementRef;
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  
  wrapper: string = 'wrapper';
  sideBarVisibility: string = 'block';
  mainContentMarginLeft: string = "250px";
  showHamburger: string = 'none';

  toggleSideBar() {
    const sideBarStatus = window.getComputedStyle(this.sideBar.nativeElement).display;
    console.log(sideBarStatus);
    
    sideBarStatus == 'block' ? this.hideSideBar() : this.showSideBar() ;
  }

  hideSideBar() {
    this.wrapper = 'wrapper';
    this.sideBarVisibility = 'none';
    this.mainContentMarginLeft = '0px';
    this.showHamburger = 'inline';
  }

  showSideBar() {
    this.wrapper = '';
    this.sideBarVisibility = 'block';
    this.mainContentMarginLeft = "250px";
    this.showHamburger = 'none';
  }

  signOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([''])
  }
}
