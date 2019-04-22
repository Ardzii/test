import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  constructor(private http: HttpClient) { }

  getCustomers() {
    this.http.get<{message: string, customers: Customer[]}>('http://localhost:3000/api/customers')
      .subscribe((customerData) => {
        this.customers = customerData.customers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  getCustomersUpdate() {
    return this.customersUpdated.asObservable();
  }

  addCustomer(customer: Customer) {
    this.http.post<{message: string}>('http://localhost:3000/api/customers', customer)
      .subscribe((res) => {
        console.log(res.message);
        this.customers.push(customer);
        this.customersUpdated.next([...this.customers]);
      });
  }
}
