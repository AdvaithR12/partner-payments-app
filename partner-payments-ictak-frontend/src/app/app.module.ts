import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNewRequestComponent } from './admin/admin-new-request/admin-new-request.component';
import { AdminInvoicesComponent } from './admin/admin-invoices/admin-invoices.component';
import { SignupComponent } from './signup/signup.component';
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
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminModifyRequestComponent } from './admin/admin-modify-request/admin-modify-request.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { FinanceRemittanceComponent } from './finance/finance-remittance/finance-remittance.component';
import { AdminPaymentsComponent } from './admin/admin-payments/admin-payments.component';
import { TokenInterceptorService } from './token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AdminTemplateComponent,
    AdminDashboardComponent,
    AdminNewRequestComponent,
    AdminInvoicesComponent,
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
    AdminUsersComponent,
    AdminModifyRequestComponent,
    ViewFileComponent,
    FinanceRemittanceComponent,
    AdminPaymentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
