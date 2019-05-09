import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer-model';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { mimeType } from './mime-type.validator';
import { AlertDialogComponent } from 'src/app/shared/dialog/alert-dialog/alert-dialog.component';

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
      info: new FormGroup({
        name: new FormControl(null, {validators: Validators.required}),
        vat: new FormControl(null, {validators: Validators.required}),
      }),
      docs: new FormGroup({
        fs: new FormControl(null, {asyncValidators: mimeType}),
        cd: new FormControl(null, {asyncValidators: mimeType}),
        id: new FormControl(null, {asyncValidators: mimeType}),
        ad: new FormControl(null, {asyncValidators: mimeType})
      })
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
                this.customerForm.get('info').patchValue({
                  name: this.customer.name,
                  vat: this.customer.vat,
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

  onDocPicked(event: Event, type: string) {
    const file = (event.target as HTMLInputElement).files[0];
    this.customerForm.get('docs').patchValue({
      [type]: file
    });
    this.customerForm.get('docs').get(type).updateValueAndValidity();
    this.customerForm.get('docs').get(type).markAsDirty();
    console.log(this.customerForm.get('docs').get(type));
    console.log(this.customerForm.get('docs').get(type).valid);
    // if (!this.customerForm.get('docs').get(type).valid) {
    //   this.openAlert();
    //   this.customerForm.get('docs').patchValue({
    //     [type]: null
    //   });
    // }
  }

  onSubmit() {
    if (!this.customerForm.valid) {
      return;
    }
    this.isLoading = true;
    if (!this.editMode) {
      // const newCustomer: Customer = {
      //   id: null,
      //   name: this.customerForm.get('info').value.name,
      //   vat: this.customerForm.get('info').value.vat
      // };
      this.customerService.addCustomer(this.customerForm.get('info').value, this.customerForm.get('docs').value);
      this.customerForm.reset();
    } else {
      const updatedCustomer: Customer = {
        id: this.id,
        name: this.customerForm.get('info').value.name,
        vat: this.customerForm.get('info').value.vat
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

  openAlert(): void {
    const dialogRef = this.dialog.open(AlertDialogComponent);
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
