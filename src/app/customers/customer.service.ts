import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from './customer-model';

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

  getCustomersUpdate() {
    return this.customersUpdated.asObservable();
  }

  addCustomer(customer: Customer) {
    this.http.post<{message: string, customerId: string}>('http://localhost:3000/api/customers', customer)
      .subscribe((res) => {
        const id = res.customerId;
        customer.id = id;
        this.customers.push(customer);
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
