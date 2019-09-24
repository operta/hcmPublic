import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './public/pages/login/login.component';
import {UserRouteAccessService} from './services/user-route-access-service';
import {RegisterComponent} from './public/pages/register/register.component';
import {NotFoundComponent} from './public/pages/not-found/not-found.component';
import {ActivateComponent} from './public/pages/activate/activate.component';
import {PasswordResetFinishComponent} from './public/pages/password-reset-finish/password-reset-finish.component';
import {PasswordResetInitComponent} from './public/pages/password-reset-init/password-reset-init.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate',
    component: ActivateComponent,
  },
  {
    path: 'reset/finish',
    component: PasswordResetFinishComponent,
  },
  {
    path: 'reset/request',
    component: PasswordResetInitComponent
  },
  {
    path: 'dashboard',
    loadChildren: './applicants/applicants.module#ApplicantsModule',
    canActivate: [UserRouteAccessService]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}