import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { ComposeMessageComponent } from './compose-message.component';
//import { PageNotFoundComponent } from './not-found.component';

//import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { UserLoginComponent } from './users/user-login.component';
import { AuthGuardService } from './authentications/auth-guard.service';
//import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
	//   {
	//     path: 'compose',
	//     component: ComposeMessageComponent,
	//     outlet: 'popup'
	//   },
	{
		path: 'login',
		component: UserLoginComponent
	},
	{
		path: 'customers',
		loadChildren: 'app/customers/customers.module#CustomersModule',
		//canActivate: [AuthGuardService]
		//canLoad: [AuthGuardService]
	},
	// {
	// 	path: 'crisis-center',
	// 	loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
	// 	data: { preload: true }
	// },
	{ path: '', redirectTo: '/customers', pathMatch: 'full' },
	//{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes,
			{
				//enableTracing: true, // <-- debugging purposes only
				//preloadingStrategy: SelectivePreloadingStrategy,
			}
		)
	],
	exports: [
		RouterModule
	],
	providers: [
		//CanDeactivateGuard,
		//SelectivePreloadingStrategy
		AuthGuardService
	]
})

export class AppRoutingModule { }
