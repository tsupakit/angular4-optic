import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { CustomerRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerProfileComponent } from './profile/customer-profile.component';
import { CustomerVisionComponent } from './vision/customer-vision.component';
import { CustomerService } from './customer.service';
import { DisableControlDirective } from '../directives/disable-control.directive';
import { AuthService } from '../authentications/auth.service';

import { OverlayModule } from 'angular-io-overlay';
import { DatePickerModule } from 'angular-io-datepicker';
import { AngularFireModule } from 'angularfire2';

@NgModule({
  imports: [
    //BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    DatePickerModule,
    AngularFireDatabaseModule,
    CustomerRoutingModule,
  ],
  declarations: [
    CustomersComponent,
    CustomerProfileComponent,
    CustomerVisionComponent,
    DisableControlDirective,
  ],
  providers: [CustomerService, AuthService],
})
export class CustomersModule {}
