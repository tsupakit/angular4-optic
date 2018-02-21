import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// import {MdExpansionModule, MdInputModule, MdButtonModule} from '@angular/material';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { OverlayModule } from 'angular-io-overlay';
import { DatePickerModule } from 'angular-io-datepicker';
import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CustomerService } from './customers/customer.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomerProfileComponent } from './customers/profile/customer-profile.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { CustomerVisionComponent } from './customers/vision/customer-vision.component';
import { UserLoginComponent } from './users/user-login.component';
import { AuthService } from './authentications/auth.service';
import { AuthGuardService } from './authentications/auth-guard.service';

const ROUTES = [
  {
    path: '',
    redirectTo: 'customer/main',
    pathMatch: 'full'
  },
  {
    path: 'customer/main',
    component: CustomersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'customer/profile',
    component: CustomerProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: UserLoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DisableControlDirective,
    UserLoginComponent,
    CustomersComponent,
    CustomerProfileComponent,
    CustomerVisionComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // MdExpansionModule,
    // MdInputModule,
    // MdButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES), // Add routes to the app
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    OverlayModule,
    DatePickerModule
  ],
  providers: [CustomerService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
