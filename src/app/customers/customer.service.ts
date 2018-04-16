// import { Injectable } from '@angular/core';
// import { Customer } from './customer.model';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

// @Injectable()
// export class CustomerService {

//   private selectedCustomer = new BehaviorSubject<Customer>(null);
//   customerObservable = this.selectedCustomer.asObservable();

//   select(customer: Customer) {
//     this.selectedCustomer.next(customer);
//   }

//   private basePath = '/customers';
//   customers: FirebaseListObservable<Customer[]> = null; //  list of objects
//   customer: FirebaseObjectObservable<Customer> = null; //   single object

//   constructor(private db: AngularFireDatabase) {
//     this.customers = db.list(this.basePath, {
//       query: { limitToLast : 1 }
//     });
//   }

//   getCustomerList(query={}): FirebaseListObservable<Customer[]> {
//     return this.db.list(this.basePath, {
//       query: query
//     });
//   }

//   getCustomers(orderBy: string, start, end): FirebaseListObservable<Customer[]> {
//     return this.db.list(this.basePath, {
//       query: {
//         orderByChild: orderBy,
//         limitToLast: 30,
//         startAt: start,
//         endAt: end
//       }
//     });

//     //return this.customers;
//   }

//   // Return a single observable item
//   getCustomer(key: string): FirebaseObjectObservable<Customer> {
//     const itemPath =  `${this.basePath}/${key}`;
//     this.customer = this.db.object(itemPath);

//     return this.customer;
//   }

//   createCustomer(customer: Customer): void  {
//     this.customers.push(customer)
//       .then(res => customer.$key = res.key)
//       .catch(error => this.handleError(error));
//   }
//   // Update an existing item
//   updateCustomer(key: string, value: any): void {
//     // have to delete the key of 2nd argument due to firebase update function using 1st argument already.
//     delete value.$key;
//     this.customers.update(key, value)
//       // set back the key for disable ui buttons.
//       .then(() => value.$key = key)
//       .catch(error => this.handleError(error));
//   }
//   // Deletes a single item
//   deleteCustomer(key: string): void {
//       this.customers.remove(key)
//         .catch(error => this.handleError(error));
//   }
//   // Deletes the entire list of items
//   // deleteAll(): void {
//   //     this.customers.remove()
//   //       .catch(error => this.handleError(error))
//   // }
//   // Default error handling for all actions
//   private handleError(error) {
//     console.log(error);
//   }



// }
