import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'
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
  searchControl = new FormControl();

  //customers: any[]; 
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

  startAt = new Subject();
  endAt = new Subject();
  //lastKeypress: number = 0;
  
  search() { //$event) {
    // if ($event.timeStamp - this.lastKeypress > 200) {     
    // }
    //this.lastKeypress = $event.timeStamp;
    const value = this.searchControl.value
    console.log(value);
    this.startAt.next(value);
    this.endAt.next(value + "\uf8ff");

    this.customers = this.customerService.getCustomers(this.startAt, this.endAt); //.subscribe(customers => this.customers = customers );
    console.log(this.customers);
  }

  createNew() : void {
    this.customerService.selectedCustomer = null;
    this.router.navigate(['/customer/profile']);
  }

  onSelect (customer: Customer) : void {
    this.customerService.selectedCustomer = customer;
    this.router.navigate(['/customer/profile']);
  }

  ngOnInit() {
    this.customers = this.customerService.getCustomerList({limitToLast: 50})

    // this.customerService.getCustomers(this.startAt, this.endAt)
    // .subscribe(customers => this.customers = customers );
  }

}
