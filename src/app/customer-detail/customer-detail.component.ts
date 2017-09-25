import { Component, Input, OnInit } from '@angular/core';
//import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

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
  customerForm: FormGroup;

  constructor(private customerService: CustomerService, private fb: FormBuilder) { 
    this.customer = customerService.customer ? customerService.customer : new Customer("Pex", "Kid");

    this.customerForm = fb.group({
      'firstName' : [this.customer.firstName, Validators.required],
      'lastName' : [this.customer.lastName, Validators.required], //Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'age' : [this.customer.age],
      'sex' : [this.customer.sex],
      'telephoneNo' : [this.customer.telephoneNo],
    });
  }

  ngOnInit() {
  }

  saveCustomer(customer) {
    console.log(customer);
  }

}
