import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin/admin-template/admin-template.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { InvoicesComponent } from './admin/invoices/invoices.component';
import { NewEnquiryComponent } from './admin/new-enquiry/new-enquiry.component';
import { WorkOrdersComponent } from './admin/work-orders/work-orders.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

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
    path: 'admin',
    component: AdminTemplateComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'newenquiry',
        component: NewEnquiryComponent
      },
      {
        path: 'workorders',
        component: WorkOrdersComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
