import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance-template',
  templateUrl: './finance-template.component.html',
  styleUrls: ['./finance-template.component.css']
})
export class FinanceTemplateComponent implements OnInit {
  
  @ViewChild('viewChildHook', {static: true}) sideBar!: ElementRef;
  
  constructor(private router: Router) { }

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
    this.router.navigate([''])
  }

}
