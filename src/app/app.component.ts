import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // user: Observable<firebase.User>;
  // //items: FirebaseListObservable<any[]>;
  // msgVal: string = '';

  // customers: FirebaseListObservable<Customer[]>;

  // constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
  //   // this.items = af.list('/messages', {
  //   //   query: {
  //   //     limitToLast: 50
  //   //   }
  //   // });

  //   this.customers = af.list('/customers', {
  //     query: {
  //       limitToLast: 50
  //     }
  //   });

  //   this.user = this.afAuth.authState;
  //   this.user.subscribe(u => console.log(`${u.uid} - ${u.displayName}`));
  // }

  // login() {
  //   this.afAuth.auth.signInAnonymously();
  // }

  // logout() {
  //   this.afAuth.auth.signOut();
  // }

  // Send(desc: string) {
  //   //this.items.push({ message: desc});
  //   //let customer = new Customer('Supakit', 'Thanomboonchareon');
  //   // customer.age = 33;
  //   // customer.telephoneNo = '0815347979';
  //   // customer.address = 'Bangkok';

  //   const customer = Customer.SampleData();
  //   this.customers.push(customer);

  //   this.msgVal = '';
  // }

}
