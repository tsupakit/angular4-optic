import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// import {MdExpansionModule, MdInputModule, MdButtonModule} from '@angular/material';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// New imports to update based on AngularFire2 version 4
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { UserLoginComponent } from './users/user-login.component';
import { AuthService } from './authentications/auth.service';
import { CustomersModule } from './customers/customers.module';
// import { AuthGuardService } from './authentications/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomersModule,
    AppRoutingModule,
    // OverlayModule,
    // DatePickerModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
