import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  //providers: [CustomerService]
})
export class CustomersComponent implements OnInit {

  user: Observable<firebase.User>;
  //items: FirebaseListObservable<any[]>;
  msgVal: string = '';
  seachControl = new FormControl();

  customers: FirebaseListObservable<Customer[]>;
  selectedCustomer: Customer;

  constructor(private router: Router, private customerService: CustomerService, public afAuth: AngularFireAuth) { //, public af: AngularFireDatabase) {

    // this.customers = af.list('/customers', {
    //   query: {
    //     limitToLast: 50
    //   }
    // });

    // this.user = this.afAuth.authState;
    // this.user.subscribe(u => console.log(`${u.uid} - ${u.displayName}`));
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  onSelect (customer: Customer) : void {
    //this.customerService.customer = customer;
    //alert(this.customerService.customer.firstName);
    //this.router.navigate(['/customer-detail']);
    console.log(customer);
    this.customerService.selectedCustomer = customer;
    this.router.navigate(['/customer-detail']);
  }

  Send(desc: string) {
    //this.items.push({ message: desc});
    //let customer = new Customer('Supakit', 'Thanomboonchareon');
    // customer.age = 33;
    // customer.telephoneNo = '0815347979';
    // customer.address = 'Bangkok';

    // const customer = Customer.SampleData();
    // this.customers.push(customer);

    // this.msgVal = '';
  }

  ngOnInit() {
    this.customers = this.customerService.getCustomersList({limitToLast: 50})
  }

}
