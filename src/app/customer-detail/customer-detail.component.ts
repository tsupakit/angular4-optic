import { Component, Input, OnInit } from '@angular/core';
//import { FormsModule }   from '@angular/forms';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Customer } from '../customers/customer.model';
import { CustomerService } from '../customers/customer.service';

@Component({
  selector: 'customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css'],
  //providers: [CustomerService]
})
export class CustomerDetailComponent implements OnInit {

  @Input() customer: Customer;
  //private customer: Customer;  
  isNew: boolean;
  customerForm: FormGroup;

  user: Observable<firebase.User>;
  //items: FirebaseListObservable<any[]>;
  customers: FirebaseListObservable<Customer[]>;

  //constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private customerService: CustomerService, private fb: FormBuilder) { 
  constructor(public afAuth: AngularFireAuth, private customerService: CustomerService, private fb: FormBuilder) {     
    // setup user information
    this.user = this.afAuth.authState;
    this.user.subscribe(u => console.log(`${u.uid} - ${u.displayName}`));

    //this.customer = customerService.customer;
    
    this.initialize();
  }

  ngOnInit() {
  }

  private initialize() {

    if (!this.customer) {
      this.isNew = true;
      //this.customerService.customer = new Customer("Pex", "Kid");
    }
    
    this.customerForm = this.fb.group({
      'firstName' : [this.customer.firstName, Validators.required],
      'lastName' : [this.customer.lastName, Validators.required], //Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'age' : [this.customer.age],
      'sex' : [this.customer.sex],
      'telephoneNo' : [this.customer.telephoneNo],
    });

  }

  saveCustomer(customer) {
    if (this.isNew) {
      this.addCustomer(customer);
    }
    else {
      this.editCustomer(customer);
    }    
  }

  private addCustomer(customer) {
    this.customers.push(customer);
  }

  private editCustomer(customer) {
    
  }

}
