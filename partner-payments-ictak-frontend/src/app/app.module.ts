import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNewEnquiryComponent } from './admin/admin-new-enquiry/admin-new-enquiry.component';
import { AdminInvoicesComponent } from './admin/admin-invoices/admin-invoices.component';
import { AdminWorkOrdersComponent } from './admin/admin-work-orders/admin-work-orders.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { PartnerTemplateComponent } from './partner/partner-template/partner-template.component';
import { MessagepageComponent } from './messagepage/messagepage.component';
import { FinanceTemplateComponent } from './finance/finance-template/finance-template.component';
import { FinanceDashboardComponent } from './finance/finance-dashboard/finance-dashboard.component';
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
import { FinanceWorkOrdersComponent } from './finance/finance-work-orders/finance-work-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AdminTemplateComponent,
    AdminDashboardComponent,
    AdminNewEnquiryComponent,
    AdminInvoicesComponent,
    AdminWorkOrdersComponent,
    SignupComponent,
    PartnerTemplateComponent,
    MessagepageComponent,
    FinanceTemplateComponent,
    FinanceDashboardComponent,
    PartnerDashboardComponent,
    FinanceWorkOrdersComponent
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
