import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerProfileComponent } from './profile/customer-profile.component';
import { AuthGuardService } from '../authentications/auth-guard.service';

const customersRoutes: Routes = [
  //{ path: 'heroes', redirectTo: '/superheroes' },
  //{ path: 'hero/:id', redirectTo: '/superhero/:id' },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [AuthGuardService],
    // children: [
    //   {
    //     path: '',
    //     component: CustomersComponent,
    //     canActivate: [AuthGuardService],
    //     //  children: [
    //     //    {
    //     //     // path: ':id',
    //     //     // component: CustomerProfileComponent
    //     //     // canDeactivate: [CanDeactivateGuard],
    //     //     // resolve: {
    //     //     //   crisis: CustomerProfileResolver
    //     //     // }
    //     //    },
    //     //  ]
    //   },
    // ]
  },
  {
    path: 'customer/profile',
    component: CustomerProfileComponent,
    canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(customersRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class CustomerRoutingModule { }
