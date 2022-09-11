import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-finance-template',
  templateUrl: './finance-template.component.html',
  styleUrls: ['./finance-template.component.css']
})
export class FinanceTemplateComponent implements OnInit {
  @ViewChild('viewChildHook', {static: true}) sideBar!: ElementRef;
  
  loggedInUser: any = {};

  constructor(
    private router: Router,
    private authServices: AuthService,
    private title: Title
    ) { }

  ngOnInit(): void {
    this.title.setTitle('Finance Administrator: ICT-PPP ')

    let userId = localStorage.getItem('userid');
    this.authServices.getUserProfile(userId)
      .subscribe({
        next: (data)=> {
          this.loggedInUser =JSON.parse(JSON.stringify(data));
        },
        error: (err)=> {
          console.log(`Can't find user`, err.message);
        }
      });

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
    if(confirm('Are you sure to sign out?')) {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['']);
    }
  }

}
