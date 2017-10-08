import { Injectable } from '@angular/core';
import { Customer } from './customer.model';

import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CustomerService {

  selectedCustomer: Customer;

  private basePath: string = '/customers';
  customers: FirebaseListObservable<Customer[]> = null; //  list of objects
  customer: FirebaseObjectObservable<Customer> = null; //   single object
  
  constructor(private db: AngularFireDatabase) {     
  }

  getCustomersList(query={}): FirebaseListObservable<Customer[]> {
    this.customers = this.db.list(this.basePath, {
      query: query
      // query: {
      //   limitToLast: 50
      // }
    });
    return this.customers
  }
  // Return a single observable item
  getCustomer(key: string): FirebaseObjectObservable<Customer> {
    const itemPath =  `${this.basePath}/${key}`;
    this.customer = this.db.object(itemPath)
    
    return this.customer
  }

  createCustomer(customer: Customer): void  {
    this.customers.push(customer)
      .catch(error => this.handleError(error))
  }
  // Update an existing item
  updateCustomer(key: string, value: any): void {
    this.customers.update(key, value)
      .catch(error => this.handleError(error))
  }
  // Deletes a single item
  deleteCustomer(key: string): void {
      this.customers.remove(key)
        .catch(error => this.handleError(error))
  }
  // Deletes the entire list of items
  // deleteAll(): void {
  //     this.customers.remove()
  //       .catch(error => this.handleError(error))
  // }
  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }



}
