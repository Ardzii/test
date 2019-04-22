import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CustomerEditComponent } from './customers/customer-edit/customer-edit.component';

const routes: Routes = [
  { path: 'customers', component: CustomersListComponent },
  { path: 'customers/new-customer', component: CustomerEditComponent },
  { path: 'customers/edit/:id', component: CustomerEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
