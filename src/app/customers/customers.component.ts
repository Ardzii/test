import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  newCustomer: string;

  constructor() { }

  ngOnInit() {
  }

  onAddCustomer() {
    // alert('Clicked!');
    this.newCustomer = 'The user\'s new customer';
  }

}
