import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
  orderBy = 'firstName';

  customers: Observable<Customer[]>;
  selectedCustomer: Customer;

  constructor(private router: Router, private customerService: CustomerService, public auth: AuthService) {
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
    this.customerService.select(null);
    this.router.navigate(['/customer/profile']);
  }

  onSelect (customer: Customer): void {
    this.customerService.select(customer);
    this.router.navigate(['/customer/profile']);
  }

  ngOnInit() {
    this.search();
  }

}
