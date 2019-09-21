import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './public/pages/login/login.component';
import {UserRouteAccessService} from './services/user-route-access-service';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: './applicants/applicants.module#ApplicantsModule',
    canActivate: [UserRouteAccessService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
