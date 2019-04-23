import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer-model';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  private id: string;

  isLoading = false;
  name: string;
  vat: string;
  editMode = false;
  customer: Customer;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(
        (paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.editMode = true;
            this.id = paramMap.get('id');
            this.isLoading = true;
            this.customerService.getCustomer(this.id)
              .subscribe(customerData => {
                this.isLoading = false;
                this.customer = customerData as Customer;
              });
          } else {
            this.editMode = false;
            this.id = null;
          }
      });
  }

  onSaveCustomer(cusForm: NgForm) {
    if (!cusForm.valid) {
      return;
    }
    this.isLoading = true;
    if (!this.editMode) {
      const newCustomer: Customer = {
        id: null,
        name: cusForm.value.name,
        vat: cusForm.value.vat
      };
      this.customerService.addCustomer(newCustomer);
      cusForm.resetForm();
    } else {
      const updatedCustomer: Customer = {
        id: this.id,
        name: cusForm.value.name,
        vat: cusForm.value.vat
      };
      this.customerService.updateCustomer(this.id, updatedCustomer);
    }
    this.router.navigate(['/customers']);
  }

  onUpdateCustomer(updatedCus: NgForm) {

  }

}
