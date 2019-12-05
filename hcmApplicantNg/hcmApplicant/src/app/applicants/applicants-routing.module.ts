import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ApplicantProfilePageComponent} from './pages/applicant-profile-page/applicant-profile-page.component';
import {AtApplicants} from './models/applicant.model';
import {Observable, of} from 'rxjs';
import {ApplicantsService} from './services/applicants.service';
import {catchError, map, tap} from 'rxjs/operators';
import {VacanciesPageComponent} from './pages/vacancies-page/vacancies-page.component';
import {AtVacancies} from './models/vacancy.model';
import {VacancyService} from './services/vacancy.service';
import {VacancyDetailPageComponent} from './pages/vacancy-detail-page/vacancy-detail-page.component';
import {AtJobApplicationsService} from './services/job-application.service';
import {JobApplicationsPageComponent} from './pages/job-applications-page/job-applications-page.component';
import {UserNotificationsPageComponent} from './pages/user-notifications-page/user-notifications-page.component';
import {AddContactPopupComponent} from './modals/add-contact/add-contact.component';
import {AddEducationPopupComponent} from './modals/add-education/add-education.component';
import {AddExperiencePopupComponent} from './modals/add-experience/add-experience.component';
import {AddAccomplishmentPopupComponent} from './modals/add-accomplishment/add-accomplishment.component';
import {EditApplicantPopupComponent} from './modals/edit-applicant/edit-applicant.component';
import {AddDocumentPopupComponent} from './modals/add-document/add-document.component';
import {SettingsComponent} from './components/account/settings/settings.component';
import {PasswordComponent} from './components/account/password/password.component';
import {UserRouteAccessService} from '../services/user-route-access-service';
import {NoAuthApplyPageComponent} from '../public/pages/no-auth-apply-page/no-auth-apply-page.component';


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
                        this.router.navigate(['/login']);
                        return of(null);
                    }
                }),
                catchError(
                    (error) => {
                        this.router.navigate(['/login']);
                        return of(null);
                    }
                ));

    }
}

@Injectable()
export class VacanciesResolver implements Resolve<AtVacancies[]> {
    constructor(private vacancyService: VacancyService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AtVacancies[]> | Promise<AtVacancies[]> | AtVacancies[] {
        return this.vacancyService.getVacanciesVisibleToApplicant()
            .pipe(
                catchError(
                    (error) => {
                        // this.router.navigate(['/404']);
                        return of(null);
                    }
                )
            );
    }


}

@Injectable()
export class AppliedVacanciesResolver implements Resolve<AtVacancies[]> {
    constructor(private vacancyService: VacancyService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AtVacancies[]> | Promise<AtVacancies[]> | AtVacancies[] {
        return this.vacancyService.getVacanciesWhereApplicantApplied()
            .pipe(
                catchError(
                    (error) => {
                        // this.router.navigate(['']);
                        return of(null);
                    }
                )
            );
    }


}

@Injectable()
export class VacancyResolver implements Resolve<AtVacancies> {
    constructor(private vacancyService: VacancyService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AtVacancies {
        if (this.vacancyService.loadedVacancies && this.vacancyService.loadedVacancies.length > 0) {
            if (this.vacancyService.loadedVacancies.some(item => item.id === +route.params.id)) {
                // console.log(this.vacancyService.loadedVacancies.find(item => item.id === +route.params.id));
                return this.vacancyService.loadedVacancies.find(item => item.id === +route.params.id);
            } else {
                // this.router.navigate(['/404']);
                return null;
            }
        } else {
            // this.router.navigate(['/404']);
            return null;
        }
    }


}


@Injectable()
export class CanApplicantApplyResolver implements Resolve<boolean> {
    constructor(private router: Router,
                private jApplicationsService: AtJobApplicationsService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
        const vacancyId = route.params.id;
        if (vacancyId) {
            return this.jApplicationsService.checkIfApplicantApplied(vacancyId).pipe(map(value => !value.applied));
        } else {
            // this.router.navigate(['/login']);
            return of(false);
        }
    }

}

const applicantRoutes: Routes = [{
    path: '',
    component: DashboardComponent,
    children: [
        {
            path: 'applicant-profile',
            component: ApplicantProfilePageComponent,
            resolve: {
                applicant: ApplicantResolver
            },
            children: [
                {
                    path: 'add-contact',
                    component: AddContactPopupComponent,
                    outlet: 'popup'
                }, {
                    path: 'add-education',
                    component: AddEducationPopupComponent,
                    outlet: 'popup'
                },
                {
                    path: 'add-experience',
                    component: AddExperiencePopupComponent,
                    outlet: 'popup'
                },
                {
                    path: 'add-document',
                    component: AddDocumentPopupComponent,
                    outlet: 'popup'
                },
                {
                    path: 'add-accomplishment',
                    component: AddAccomplishmentPopupComponent,
                    outlet: 'popup'
                },
                {
                    path: 'edit-applicant',
                    component: EditApplicantPopupComponent,
                    outlet: 'popup',
                    resolve: {
                        applicant: ApplicantResolver
                    }
                },
            ],
            canActivate: [UserRouteAccessService]
        }, {
            path: 'vacancies',
            component: VacanciesPageComponent,
            resolve: {
                vacancies: VacanciesResolver
            }
        }, {
            path: 'vacancy-detail/:id',
            component: VacancyDetailPageComponent,
            resolve: {
                vacancy: VacancyResolver,
                canApply: CanApplicantApplyResolver
            }
        },
        {
            path: 'vacancy-detail-no-auth/:id',
            component: VacancyDetailPageComponent,
            data: {
                noAuth: true
            },
            resolve: {
                vacancy: VacancyResolver
            }
        },
        {
            path: 'job-applications',
            component: JobApplicationsPageComponent,
            resolve: {
                appliedVacancies: AppliedVacanciesResolver
            },
            canActivate: [UserRouteAccessService]
        },
        {
            path: 'user-notifications',
            component: UserNotificationsPageComponent,
            canActivate: [UserRouteAccessService]
        },
        {
            path: 'settings',
            component: SettingsComponent,
            canActivate: [UserRouteAccessService]
        },
        {
            path: 'password',
            component: PasswordComponent,
            canActivate: [UserRouteAccessService]
        },
        {
            path: '**',
            redirectTo: 'vacancies'
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(applicantRoutes)],
    exports: [RouterModule],
    providers: [
        ApplicantResolver,
        VacanciesResolver,
        VacancyResolver,
        CanApplicantApplyResolver,
        AppliedVacanciesResolver
    ]
})
export class ApplicantsRoutingModule {
}
