import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';

import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import { AuthService } from '../authentications/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {

  searchControl = new FormControl();
  orderBy: string = 'firstName';

  customers: FirebaseListObservable<Customer[]>;
  selectedCustomer: Customer;

  constructor(private router: Router, private customerService: CustomerService, public auth: AuthService) { //, public af: AngularFireDatabase) {    
    // this.customers = af.list('/customers', {
    //   query: {
    //     limitToLast: 50
    //   }
    // });

    // this.user = this.afAuth.authState;
    // this.user.subscribe(u => console.log(`${u.uid} - ${u.displayName}`));
  }

  //startAt = new Subject();
  //endAt = new Subject();
  startAt: string;
  endAt: string;
  //lastKeypress: number = 0;

  search() {
    const value = this.searchControl.value || '';
    //this.startAt.next(value);
    //this.endAt.next(value + '\uf8ff');
    this.startAt = value;
    this.endAt = value + '\uf8ff';

    this.customers = this.customerService.getCustomers(this.orderBy, this.startAt, this.endAt);
  }

  // setOrderBy(value: string): void {
  //   this.orderBy = value;
  //   this.search();
  // }

  createNew(): void {
    this.customerService.selectedCustomer = null;
    this.router.navigate(['/customer/profile']);
  }

  onSelect (customer: Customer): void {
    this.customerService.selectedCustomer = customer;
    this.router.navigate(['/customer/profile']);
  }

  ngOnInit() {
    this.customers = this.customerService.getCustomers(this.orderBy, this.startAt, this.endAt);
  }

}
