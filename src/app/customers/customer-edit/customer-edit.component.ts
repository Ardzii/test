import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer-model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/dialog/confirmation-dialog/confirmation-dialog.component';

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
  customerForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.customerForm = new FormGroup({
      name: new FormControl(null, {validators: Validators.required}),
      vat: new FormControl(null, {validators: Validators.required})
    });
    this.route.paramMap
      .subscribe(
        (paramMap: ParamMap) => {
          if (paramMap.has('id')) {
            this.editMode = true;
            this.id = paramMap.get('id');
            this.customerService.getCustomer(this.id)
              .subscribe(customerData => {
                this.customer = customerData as Customer;
                this.customerForm.setValue({
                  name: this.customer.name,
                  vat: this.customer.vat
                });
                this.isLoading = false;
              });
          } else {
            this.editMode = false;
            this.id = null;
            this.isLoading = false;
          }
      });
  }

  onSubmit() {
    if (!this.customerForm.valid) {
      return;
    }
    this.isLoading = true;
    if (!this.editMode) {
      const newCustomer: Customer = {
        id: null,
        name: this.customerForm.value.name,
        vat: this.customerForm.value.vat
      };
      this.customerService.addCustomer(newCustomer);
      this.customerForm.reset();
    } else {
      const updatedCustomer: Customer = {
        id: this.id,
        name: this.customerForm.value.name,
        vat: this.customerForm.value.vat
      };
      this.customerService.updateCustomer(this.id, updatedCustomer);
    }
    this.router.navigate(['/customers']);
  }

  onCancel() {
    if (this.customerForm.dirty) {
      this.openDialog();
    } else {
      this.router.navigate(['/customers']);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.router.navigate(['/customers']);
        } else {
          return;
        }
      }
    );
  }
}
