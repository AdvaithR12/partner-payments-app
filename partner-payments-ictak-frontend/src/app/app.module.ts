import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNewRequestComponent } from './admin/admin-new-request/admin-new-request.component';
import { AdminInvoicesComponent } from './admin/admin-invoices/admin-invoices.component';
import { AdminViewFileComponent } from './admin/admin-view-file/admin-view-file.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { PartnerTemplateComponent } from './partner/partner-template/partner-template.component';
import { MessagepageComponent } from './messagepage/messagepage.component';
import { FinanceTemplateComponent } from './finance/finance-template/finance-template.component';
import { FinanceDashboardComponent } from './finance/finance-dashboard/finance-dashboard.component';
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
import { PartnerInvoiceComponent } from './partner/partner-invoice/partner-invoice.component';
import { FinanceWorkOrdersComponent } from './finance/finance-work-orders/finance-work-orders.component';
import { AdminRequestsComponent } from './admin/admin-requests/admin-requests.component';
import { ProfileComponent } from './profile/profile.component';
import { PartnerWorkordersComponent } from './partner/partner-workorders/partner-workorders.component';
import { FinanceInvoicesComponent } from './finance/finance-invoices/finance-invoices.component';
import { AdminModifyRequestComponent } from './admin/admin-modify-request/admin-modify-request.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AdminTemplateComponent,
    AdminDashboardComponent,
    AdminNewRequestComponent,
    AdminInvoicesComponent,
    AdminViewFileComponent,
    SignupComponent,
    PartnerTemplateComponent,
    MessagepageComponent,
    FinanceTemplateComponent,
    FinanceDashboardComponent,
    PartnerDashboardComponent,
    PartnerInvoiceComponent,
    FinanceWorkOrdersComponent,
    ProfileComponent,
    AdminRequestsComponent,
    PartnerWorkordersComponent,
    FinanceInvoicesComponent,
    AdminModifyRequestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
