import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit, OnDestroy {
  customers: Customer[];
  private subscription: Subscription;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomers();
    this.subscription = this.customerService.getCustomersUpdate().subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
