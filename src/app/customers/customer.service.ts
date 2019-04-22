import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  constructor() { }

  getCustomers() {
    if (this.customers) {
      return [...this.customers];
    }
  }

  getCustomersUpdate() {
    return this.customersUpdated.asObservable();
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    this.customersUpdated.next([...this.customers]);
  }
}
