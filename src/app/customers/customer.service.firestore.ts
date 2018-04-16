import { Injectable } from '@angular/core';
import { Customer } from './customer.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AngularFirestoreModule, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomerServiceFirestore {

  private selectedCustomer = new BehaviorSubject<Customer>(null);
  customerObservable = this.selectedCustomer.asObservable();

  select(customer: Customer) {
    this.selectedCustomer.next(customer);
  }

  private basePath = 'customers';
  customerRef: AngularFirestoreCollection<Customer>; //  list of objects
  customer$: Observable<Customer[]>; //   single object

  constructor(private db: AngularFirestore) {
    this.customerRef = db.collection<Customer>(this.basePath);
    this.customer$ = this.customerRef.valueChanges();
  }

  getCustomerList(): Observable<Customer[]> {
    return this.customer$;
  }

  // getCustomers(orderBy: string, start, end): Observable<Customer[]> {
  //   return this.db.list(this.basePath, {
  //     query: {
  //       orderByChild: orderBy,
  //       limitToLast: 30,
  //       startAt: start,
  //       endAt: end
  //     }
  //   });

  //   //return this.customers;
  // }

  // // Return a single observable item
  // getCustomer(key: string): FirebaseObjectObservable<Customer> {
  //   const itemPath =  `${this.basePath}/${key}`;
  //   this.customer = this.db.object(itemPath);

  //   return this.customer;
  // }

  // createCustomer(customer: Customer): void  {
  //   this.customers.push(customer)
  //     .then(res => customer.$key = res.key)
  //     .catch(error => this.handleError(error));
  // }
  // // Update an existing item
  // updateCustomer(key: string, value: any): void {
  //   // have to delete the key of 2nd argument due to firebase update function using 1st argument already.
  //   delete value.$key;
  //   this.customers.update(key, value)
  //     // set back the key for disable ui buttons.
  //     .then(() => value.$key = key)
  //     .catch(error => this.handleError(error));
  // }
  // // Deletes a single item
  // deleteCustomer(key: string): void {
  //     this.customers.remove(key)
  //       .catch(error => this.handleError(error));
  // }
  // // Deletes the entire list of items
  // // deleteAll(): void {
  // //     this.customers.remove()
  // //       .catch(error => this.handleError(error))
  // // }
  // // Default error handling for all actions
  // private handleError(error) {
  //   console.log(error);
  // }



}
