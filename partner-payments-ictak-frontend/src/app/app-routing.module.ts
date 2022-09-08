import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminInvoicesComponent } from './admin/admin-invoices/admin-invoices.component';
import { AdminNewRequestComponent } from './admin/admin-new-request/admin-new-request.component';
import { MessagepageComponent } from './messagepage/messagepage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FinanceDashboardComponent } from './finance/finance-dashboard/finance-dashboard.component';
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
import { FinanceTemplateComponent } from './finance/finance-template/finance-template.component';
import { PartnerTemplateComponent } from './partner/partner-template/partner-template.component';
import { AdminRequestsComponent } from './admin/admin-requests/admin-requests.component';
import { ProfileComponent } from './profile/profile.component';
import { PartnerInvoiceComponent } from './partner/partner-invoice/partner-invoice.component';
import { PartnerWorkordersComponent } from './partner/partner-workorders/partner-workorders.component';
import { FinanceInvoicesComponent } from './finance/finance-invoices/finance-invoices.component';
import { FinanceWorkOrdersComponent } from './finance/finance-work-orders/finance-work-orders.component';
import { AdminModifyRequestComponent } from './admin/admin-modify-request/admin-modify-request.component';
import { ViewFileComponent } from './view-file/view-file.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { FinanceRemittanceComponent } from './finance/finance-remittance/finance-remittance.component'; 
import { AdminPaymentsComponent } from './admin/admin-payments/admin-payments.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "unauthorized",
    component: MessagepageComponent
  },
  
  {
    path: 'admin',
    component: AdminTemplateComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'newenquiry',
        component: AdminNewRequestComponent
      },
      {
        path: 'requests',
        component: AdminRequestsComponent
      },
      {
        path: 'requests/workorder',
        component: ViewFileComponent
      },
      {
        path: 'invoices',
        component: AdminInvoicesComponent
      },
      {
        path: 'payments',
        component: AdminPaymentsComponent
      },
      {
        path: 'invoices/getinvoice',
        component: ViewFileComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "modifyrequest",
        component: AdminModifyRequestComponent
      },
      {
        path: 'userlist',
        component: AdminUsersComponent
      }
    ]
  },
  {
    path: 'finance',
    component: FinanceTemplateComponent,
    children: [
        
      {
        path: 'dashboard',
        component: FinanceDashboardComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "invoices",
        component: FinanceInvoicesComponent
      },
      {
        path: 'payments',
        component: AdminPaymentsComponent
      },
      {
        path: 'invoices/getinvoice',
        component: ViewFileComponent
      },
      {
        path: "workorders",
        component: FinanceWorkOrdersComponent
      },
      {
        path: 'workorders/getworkorder',
        component: ViewFileComponent
      },
      {
        path: 'remittance',
        component: FinanceRemittanceComponent
      }
    ]
  },
  {
    path: 'partner',
    component: PartnerTemplateComponent,
    children: [
        
      {
        path: 'dashboard',
        component: PartnerDashboardComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "invoice",
        component: PartnerInvoiceComponent
      },
      {
        path: "workorders",
        component: PartnerWorkordersComponent
      },
      {
        path: 'workorders/getworkorder',
        component: ViewFileComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
