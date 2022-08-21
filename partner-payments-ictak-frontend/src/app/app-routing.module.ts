import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminInvoicesComponent } from './admin/admin-invoices/admin-invoices.component';
import { AdminNewEnquiryComponent } from './admin/admin-new-enquiry/admin-new-enquiry.component';
import { AdminWorkOrdersComponent } from './admin/admin-work-orders/admin-work-orders.component';
import { MessagepageComponent } from './messagepage/messagepage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FinanceDashboardComponent } from './finance/finance-dashboard/finance-dashboard.component';
import { PartnerDashboardComponent } from './partner/partner-dashboard/partner-dashboard.component';
import { FinanceTemplateComponent } from './finance/finance-template/finance-template.component';
import { PartnerTemplateComponent } from './partner/partner-template/partner-template.component';

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
        component: AdminNewEnquiryComponent
      },
      {
        path: 'workorders',
        component: AdminWorkOrdersComponent
      },
      {
        path: 'invoices',
        component: AdminInvoicesComponent
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
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
