import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer-model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit, OnDestroy {

  customers: Customer[];
  isLoading = false;

  private subscription: Subscription;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.isLoading = true;
    this.customerService.getCustomers();
    this.subscription = this.customerService.getCustomersUpdate().subscribe(
      (customers: Customer[]) => {
        this.isLoading = false;
        this.customers = customers;
      }
    );
  }

  onDelete(id: string) {
    this.customerService.deleteCustomer(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
