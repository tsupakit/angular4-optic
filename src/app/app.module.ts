import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CustomerService } from './customers/customer.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCs2NEgHP3U0JXaKnhRI7_2l80n9qiOFZU",
  authDomain: "ravipanich-optic.firebaseapp.com",
  databaseURL: "https://ravipanich-optic.firebaseio.com",
  projectId: "ravipanich-optic",
  storageBucket: "ravipanich-optic.appspot.com",
  messagingSenderId: "92362886527"
};

const ROUTES = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  },
  {
    path: 'customers',
    component: CustomersComponent
  }, 
  { 
    path: 'customer-detail', 
    component: CustomerDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(ROUTES), // Add routes to the app
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
