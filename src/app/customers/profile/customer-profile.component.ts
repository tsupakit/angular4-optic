import { Component, Input, OnInit } from '@angular/core';
//import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Customer } from '..//customer.model';
import { CustomerService } from '../customer.service';
import { DisableControlDirective } from '../../directives/disable-control.directive';

@Component({
  selector: 'customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
  //providers: [CustomerService]
})
export class CustomerProfileComponent implements OnInit {

  //@Input() customer: Customer;
  private customer: Customer;
  customerForm: FormGroup;
  visionForm: FormGroup;
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

    this.visionForm = this.fb.group({
      'VASC_R' : [this.customer.VASC_R],
      'VASC_L' : [this.customer.VASC_L],
      'VASC' : [this.customer.VASC],
      'PinH_R' : [this.customer.PinH_R],
      'PinH_L' : [this.customer.PinH_L],
      'PD_Dist_R' : [this.customer.PD_Dist_R],
      'PD_Dist_L' : [this.customer.PD_Dist_L],
      'PD_Near_R' : [this.customer.PD_Near_R],
      'PD_Near_L' : [this.customer.PD_Near_L]
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
      this.createCustomer(customerToSave);
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

  private createCustomer(customer: Customer) {
    customer.createdAt = firebase.database.ServerValue.TIMESTAMP;
    this.customerService.createCustomer(customer);
  }

  private editCustomer(customer: Customer) {
    //test eye sight data
    // customer.VASC_R = "แสง";    
    // customer.VASC_L = "แสง";
    // customer.VASC = 0.04;
    // customer.PinH_R = 0.1;
    // customer.PinH_L = 0.06
    // customer.PD_Dist_R = 29.5;
    // customer.PD_Dist_L = 29.5;
    // customer.PD_Near_R = 27.5;
    // customer.PD_Near_L = 27.5;
    //
    customer.updatedAt = firebase.database.ServerValue.TIMESTAMP;
    this.customerService.updateCustomer(this.customer.$key, customer);
  }




  // VISIONs
  saveCustomerVision(formValue: any) {
  }

}
