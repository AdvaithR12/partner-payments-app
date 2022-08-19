import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  wrapperId: string = 'wrapperId';
  sideBarVisibility: string = 'block'
  mainContentMarginLeft: string = "250px"
  showHamburger: string = 'none'
  showXMark: string = 'inline'

  hideSideBar() {
    this.sideBarVisibility = 'none';
    this.mainContentMarginLeft = '0px';
    this.showHamburger = 'inline';
    this.showXMark = 'none';
    this.wrapperId = '';
  }

  showSideBar() {
    this.sideBarVisibility = 'block';
    this.mainContentMarginLeft = "250px";
    this.showHamburger = 'none';
    this.showXMark = 'inline';
    this.wrapperId= 'wrapperId'
  }

}
