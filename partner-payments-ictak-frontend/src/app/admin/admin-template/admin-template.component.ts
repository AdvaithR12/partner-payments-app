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

  sideBarVisibility: string = 'block'
  mainContentMarginLeft: string = "250px"
  showHamburger: string = 'none'

  toggleSideBar() {
    this.sideBarVisibility == 'block' ? this.hideSideBar() : this.showSideBar() ;
  }

  hideSideBar() {
    this.sideBarVisibility = 'none';
    this.mainContentMarginLeft = '0px';
    this.showHamburger = 'inline';
  }

  showSideBar() {
    this.sideBarVisibility = 'block';
    this.mainContentMarginLeft = "250px";
    this.showHamburger = 'none';
  }

}
