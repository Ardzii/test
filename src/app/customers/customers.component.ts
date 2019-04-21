import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  inputValue = '';
  newCustomer: string;

  constructor() { }

  ngOnInit() {
  }

  onAddCustomer(newCus: HTMLTextAreaElement) {
    this.newCustomer = this.inputValue;
  }

}
