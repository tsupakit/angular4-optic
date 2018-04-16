import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// New imports to update based on AngularFire2 version 4
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MenuTopComponent } from './menus/menu-top.component';
import { UserLoginComponent } from './users/user-login.component';
import { AuthService } from './authentications/auth.service';
import { CustomersModule } from './customers/customers.module';
// import { AuthGuardService } from './authentications/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    MenuTopComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
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
