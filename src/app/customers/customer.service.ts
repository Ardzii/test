import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[];
  constructor() { }

  getCustomers() {
    return this.customers.slice();
  }

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    console.log('Customer added...\n' + JSON.stringify(this.customers));
  }
}
