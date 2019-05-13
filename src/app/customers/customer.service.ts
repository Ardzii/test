import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from './customer-model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  constructor(private http: HttpClient) { }

  getCustomers() {
    this.http.get<{message: string, customers: any}>(
      'http://localhost:3000/api/customers'
      )
      .pipe(map(customerData => {
        return customerData.customers.map(customer => {
          return {
            name: customer.name,
            vat: customer.vat,
            id: customer._id
          };
        });
      }))
      .subscribe((resCustomers) => {
        this.customers = resCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  getCustomer(id: string) {
    return this.http.get<Customer>('http://localhost:3000/api/customers/' + id);
  }

  getCustomersUpdate() {
    return this.customersUpdated.asObservable();
  }

  addCustomer(info, docsData) {
    const customerData = new FormData();
    customerData.append('name', info.name);
    customerData.append('vat', info.vat);
    customerData.append('docs', docsData);
    console.log(docsData);
    this.http.post<{message: string, customerId: string}>(
      'http://localhost:3000/api/customers',
      customerData
      )
      .subscribe((res) => {
        const customer: Customer = {
          id: res.customerId,
          name: info.name,
          vat: info.vat
        };
        this.customers.push(customer);
        this.customersUpdated.next([...this.customers]);
      });
  }

  updateCustomer(id: string, customer: Customer) {
    this.http.put('http://localhost:3000/api/customers/' + id, customer)
      .subscribe(res => {
        const updatedCustomers = [...this.customers];
        const oldCustomerIndex = updatedCustomers.findIndex(c => c.id === customer.id);
        updatedCustomers[oldCustomerIndex] = customer;
        this.customers = updatedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  deleteCustomer(id: string) {
    this.http.delete('http://localhost:3000/api/customers/' + id)
      .subscribe(() => {
        const updatedCustomers = this.customers.filter(customer => customer.id !== id);
        this.customers = updatedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }
}
