import { Component, Input, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { Customer } from '../customers/customer.model';
import { CustomerService } from '../customers/customer.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
  //providers: [CustomerService]
})
export class CustomerDetailComponent implements OnInit {

  //@Input() customer: Customer;
  private customer: Customer;

  constructor(private customerService: CustomerService) { 
    this.customer = customerService.customer;
  }

  ngOnInit() {
  }

}
