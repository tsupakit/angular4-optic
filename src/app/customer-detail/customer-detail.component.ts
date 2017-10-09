import { Component, Input, OnInit } from '@angular/core';
//import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Customer } from '../customers/customer.model';
import { CustomerService } from '../customers/customer.service';
import { DisableControlDirective } from '../directives/disable-control.directive';

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
  isEnabled: boolean;

  user: Observable<firebase.User>;
  //items: FirebaseListObservable<any[]>;

  genders: string[] = [
    'Male',
    'Female'
  ];

  //constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private customerService: CustomerService, private fb: FormBuilder) { 
  constructor(public afAuth: AngularFireAuth, private customerService: CustomerService, private fb: FormBuilder) {
    // setup user information
    this.user = this.afAuth.authState;
    //this.user.subscribe(u => console.log(`${u.uid} - ${u.displayName}`));

    this.customer = customerService.selectedCustomer;

    this.initialize();
  }

  ngOnInit() {
  }

  private initialize() {

    if (!this.customer) {
      this.isEnabled = true;
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

    if (this.customer.$key) {
      this.isEnabled = false;
    }
  }

  saveCustomer(formValue: any) {
    const customerToSave = this.setCustomerValue(formValue);

    if (customerToSave.$key) {
      this.editCustomer(customerToSave);
    } else {
      this.addCustomer(customerToSave);
    }

    this.isEnabled = false;
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

  private addCustomer(customer: Customer) {
    this.customerService.createCustomer(customer);
  }

  private editCustomer(customer: Customer) {
    this.customerService.updateCustomer(this.customer.$key, customer);
  }

}
