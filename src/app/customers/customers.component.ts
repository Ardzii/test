import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  name: string;
  vat: string;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  onAddCustomer(newCus: NgForm) {
    if (!newCus.valid) {
      return;
    }
    const newCustomer: Customer = {
      name: newCus.value.name,
      vat: newCus.value.vat
    };
    this.customerService.addCustomer(newCustomer);
    console.log('adding...');
  }
}
