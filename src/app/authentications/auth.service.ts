import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
//import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
              //private db: AngularFireDatabase,
              private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.authState['displayName'] || 'User without a Name';
    }
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
    .then((user) => {
      this.authState = user;
      //this.updateUserData();
    })
    .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
  emailSignUp(email:string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        //this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  emailLogin(email:string, password: string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user;
         //this.updateUserData();
       })
       .catch(error => console.log(error));
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
          this.authState = credential.user;
          //this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  //// Helpers ////
  // private updateUserData(): void {
  // // Writes user name and email to realtime db
  // // useful if your app displays information about users or for admin features
  //   let path = `users/${this.currentUserId}`; // Endpoint on firebase
  //   let data = {
  //                 email: this.authState.email,
  //                 name: this.authState.displayName
  //               }

  //   this.db.object(path).update(data)
  //   .catch(error => console.log(error));

  // }

}
