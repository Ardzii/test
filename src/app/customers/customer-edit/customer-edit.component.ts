import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer-model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
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
      id: null,
      name: newCus.value.name,
      vat: newCus.value.vat
    };
    this.customerService.addCustomer(newCustomer);
    newCus.resetForm();
  }

}
