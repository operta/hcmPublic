import {Injectable, NgModule} from '@angular/core';
import {Resolve, Router, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ApplicantProfilePageComponent} from './pages/applicant-profile-page/applicant-profile-page.component';
import {AtApplicants} from './models/applicant.model';
import {Observable, of} from 'rxjs';
import {ApplicantsService} from './services/applicants.service';
import {catchError, tap} from 'rxjs/operators';


@Injectable()
export class ApplicantResolver implements Resolve<AtApplicants> {
  constructor(private applicantsService: ApplicantsService,
              private router: Router) {
  }

  resolve(): Observable<AtApplicants> {
    return this.applicantsService.findByUserId()
      .pipe(
        tap((value) => {
            if (!value) {
              // this.router.navigate([{ outlets: { popup: ['at-applicants-new',id]}}], {relativeTo: this.activatedRoute});
              this.router.navigate(['/']);
              // TODO go to new profile
              return of(null);
            }
          }),
          catchError(
            (error) => {
              // this.router.navigate([{ outlets: { popup: ['at-applicants-new',id]}}], {relativeTo: this.activatedRoute});
              this.router.navigate(['/']);
              // TODO go to new profile
              return of(null);
            }
          ));

  }
}


const applicantRoutes: Routes = [{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: 'applicant-profile/:userId',
      component: ApplicantProfilePageComponent,
      resolve: {
        applicant: ApplicantResolver
      }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(applicantRoutes)],
  exports: [RouterModule],
  providers: [
    ApplicantResolver
  ]
})
export class ApplicantsRoutingModule {
}
