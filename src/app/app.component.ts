import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './authentications/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, public auth: AuthService) { }

  signOut(): void {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
}
