import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import { Customer } from './customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  user: Observable<firebase.User>;
  //items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  customers: FirebaseListObservable<Customer[]>;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {

    this.customers = af.list('/customers', {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.afAuth.authState;
    this.user.subscribe(u => console.log(`${u.uid} - ${u.displayName}`));
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  Send(desc: string) {
    //this.items.push({ message: desc});
    //let customer = new Customer('Supakit', 'Thanomboonchareon');
    // customer.age = 33;
    // customer.telephoneNo = '0815347979';
    // customer.address = 'Bangkok';

    const customer = Customer.SampleData();
    this.customers.push(customer);

    this.msgVal = '';
  }

  ngOnInit() {
  }

}
