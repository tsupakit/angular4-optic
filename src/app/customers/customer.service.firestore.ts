import { Injectable } from '@angular/core';
import { Customer, VisionCheck } from './customer.model';
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

  constructor(private afs: AngularFirestore) {
    this.customerRef = afs.collection<Customer>(this.basePath);
    //this.customer$ = this.customerRef.valueChanges();
    this.customer$ = this.customerRef.snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Customer;
          const id = action.payload.doc.id;

          return { id, ...data };
        });
      });
  }

  getCustomers(): Observable<Customer[]> {
    return this.customer$;
  }

  // getVisions(id: string): Observable<VisionCheck[]> {
  //   const collection: AngularFirestoreCollection<VisionCheck> = this.afs.collection('customers/' + id + '/visions');

  //   return collection.snapshotChanges().map(actions => {
  //     return actions.map(a => {
  //       const data = a.payload.doc.data() as VisionCheck;
  //       const vid = a.payload.doc.id;
  //       return {vid, ...data};
  //     });
  //   });
  // }

  createCustomer(customer) {
    // var map = arrayOfArtical.map((obj)=> {return Object.assign({}, obj)});
    // Firestore only accepts a JavaScript object embedded within a document
    // https://stackoverflow.com/questions/47190803/firestore-adding-object-with-an-array?rq=1
    this.customerRef.add(Object.assign({}, customer));
  }
  
  // https://alligator.io/angular/cloud-firestore-angularfire/
  // https://coursetro.com/posts/code/94/Use-Angular-with-Google's-Cloud-Firestore---Tutorial

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
