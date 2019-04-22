import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  // customers = [
  //   {name: 'Test', vat: 'BXXXXXX'},
  //   {name: 'Test2', vat: 'BXXXXXX'},
  //   {name: 'Test3', vat: 'BXXXXXX'},
  // ];
  customers = [];
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
    console.log(this.customers);
  }

}
