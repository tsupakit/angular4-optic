import { Component, Input, OnInit } from '@angular/core';
//import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { Customer, VisionCheck } from '../customer.model';
import { CustomerService } from '../customer.service';
import { AuthService } from '../../authentications/auth.service';
import { DisableControlDirective } from '../../directives/disable-control.directive';
import * as _ from 'lodash';

@Component({
  selector: 'customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {

  customer: Customer;
  customerForm: FormGroup;
  isEditing: boolean;

  genders: string[] = [
    'Male',
    'Female'
  ];

  constructor(public auth: AuthService, private router: Router, private customerService: CustomerService, private fb: FormBuilder) {
    // setup user information
  }

  ngOnInit() {
    this.customerService.customerObservable.subscribe(customer => this.customer = customer);

    this.initialize();
  }

  private initialize() {
    // if selected is null
    if (!this.customer) {
      this.isEditing = true;
      this.customer = new Customer('', '');
    }

    this.customerForm = this.fb.group({
      'firstName' : [this.customer.firstName, Validators.required],
      'lastName' : [this.customer.lastName, Validators.required], //Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'age' : [this.customer.age],
      'sex' : [this.customer.sex],
      'telephoneNo' : [this.customer.telephoneNo],
      'address' : [this.customer.address],
      'cc' : [this.customer.cc],
      'remark' : [this.customer.remark]
    });
  }

  displayRequiredCss(control) {
    return {
      'is-danger': control.invalid && control.touched
    };
  }

  cancelEditing(): void {
    this.customerForm.reset({
      'firstName' : this.customer.firstName,
      'lastName' : this.customer.lastName,
      'age' : this.customer.age,
      'sex' : this.customer.sex,
      'telephoneNo' : this.customer.telephoneNo,
      'address' : this.customer.address,
      'cc' : this.customer.cc,
      'remark' : this.customer.remark
    });

    if (this.customer.id) {
      this.isEditing = false;
    }
  }

  saveCustomer(formValue: any) {

    if (!this.customerForm.valid) {
      this.customerForm.controls.firstName.markAsTouched({ onlySelf: true });
      this.customerForm.controls.lastName.markAsTouched({ onlySelf: true });
      return;
    }

    const customerToSave = this.setCustomerValue(formValue);

    if (customerToSave.id) {
      this.editCustomer(customerToSave);
    } else {
      this.createCustomer(customerToSave);
    }

    this.isEditing = false;
  }

  private setCustomerValue(formValue: any): Customer {
    this.customer.firstName = formValue.firstName;
    this.customer.lastName = formValue.lastName;
    this.customer.sex = formValue.sex;
    this.customer.age = formValue.age;
    this.customer.telephoneNo = formValue.telephoneNo;
    this.customer.address = formValue.address;
    this.customer.cc = formValue.cc;
    this.customer.remark = formValue.remark;

    return this.customer;
  }

  private createCustomer(customer: Customer) {
    customer.createdAt = new Date().getTime();
    this.customerService.createCustomer(customer);
  }

  private editCustomer(customer: Customer) {
    customer.updatedAt = new Date().getTime();
    this.customerService.updateCustomer(this.customer.id, customer);
  }

}
