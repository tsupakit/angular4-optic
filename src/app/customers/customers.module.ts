import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerProfileComponent } from './profile/customer-profile.component';
import { CustomerVisionComponent } from './vision/customer-vision.component';
import { CustomerService } from './customer.service';
import { DisableControlDirective } from '../directives/disable-control.directive';
import { AuthService } from '../authentications/auth.service';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    CustomerRoutingModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
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
