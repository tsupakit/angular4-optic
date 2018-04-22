import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerService {

  private selectedCustomer = new BehaviorSubject<Customer>(null);
  customerObservable = this.selectedCustomer.asObservable();

  select(customer: Customer) {
    this.selectedCustomer.next(customer);
  }

  private basePath = '/customers';
  customers: AngularFireList<Customer[]> = null; //  list of objects
  customer: AngularFireObject<Customer> = null; //   single object

  constructor(private db: AngularFireDatabase) {
    this.customers = db.list(this.basePath);
  }

  getCustomers(orderBy: string, start, end): Observable<Customer[]> {
    this.customers = this.db.list(this.basePath, ref => ref
      .orderByChild(orderBy)
      .limitToLast(30)
      .startAt(start)
      .endAt(end)
    );

    return this.customers.snapshotChanges().map(actions => {
      return actions.map(action => ({ id: action.key, ...action.payload.val() }));
    });
  }

  // Return a single observable item
  getCustomer(key: string): AngularFireObject<Customer> {
    const itemPath =  `${this.basePath}/${key}`;
    this.customer = this.db.object(itemPath);

    return this.customer;
  }

  createCustomer(customer: Customer): void  {
    const list = this.db.list(this.basePath);
    list.push(customer)
    //this.customers.push(Object.assign({}, customer))
      .then(res => customer.id = res.key);
      //.catch(error => this.handleError(error));
  }
  // Update an existing item
  updateCustomer(key: string, value: any): void {
    // have to delete the key of 2nd argument due to firebase update function using 1st argument already.
    delete value.id;
    this.customers.update(key, value)
      // set back the key for disable ui buttons.
      .then(() => value.id = key)
      .catch(error => this.handleError(error));
  }
  // Deletes a single item
  deleteCustomer(key: string): void {
      this.customers.remove(key)
        .catch(error => this.handleError(error));
  }
  // Deletes the entire list of items
  // deleteAll(): void {
  //     this.customers.remove()
  //       .catch(error => this.handleError(error))
  // }
  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
  }

}
