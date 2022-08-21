import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NewEnquiryComponent } from './admin/new-enquiry/new-enquiry.component';
import { InvoicesComponent } from './admin/invoices/invoices.component';
import { WorkOrdersComponent } from './admin/work-orders/work-orders.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { PartnerTemplateComponent } from './partner/partner-template/partner-template.component';
import { MessagepageComponent } from './messagepage/messagepage.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AdminTemplateComponent,
    DashboardComponent,
    NewEnquiryComponent,
    InvoicesComponent,
    WorkOrdersComponent,
    SignupComponent,
    PartnerTemplateComponent,
    MessagepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
