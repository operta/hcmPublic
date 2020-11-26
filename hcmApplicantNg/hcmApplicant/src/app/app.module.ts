import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './public/pages/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {InterceptorsModule} from './interceptors/interceptors.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {RegisterComponent} from './public/pages/register/register.component';
import {PasswordStrengthBarComponent} from './public/components/password-strength-bar/password-strenght-bar';
import {NotFoundComponent} from './public/pages/not-found/not-found.component';
import {ActivateComponent} from './public/pages/activate/activate.component';
import {PasswordResetFinishComponent} from './public/pages/password-reset-finish/password-reset-finish.component';
import {PasswordResetInitComponent} from './public/pages/password-reset-init/password-reset-init.component';
import {NoAuthApplyPageComponent} from './public/pages/no-auth-apply-page/no-auth-apply-page.component';
import {ApplicantsService} from './applicants/services/applicants.service';
import {RegistersService} from './applicants/services/registers.service';
import {RegionSelectComponent} from './applicants/components/other/region-select/region-select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {ApplicantConstantsService} from './applicants/services/applicant-constants.service';
import {AtApplicantsExperienceService} from './applicants/services/applicant-experience.service';
import {AtApplicantsSchoolsService} from './applicants/services/applicant-schools.service';
import { VacancyService } from './applicants/services/vacancy.service';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        PasswordStrengthBarComponent,
        NotFoundComponent,
        ActivateComponent,
        PasswordResetFinishComponent,
        PasswordResetInitComponent,
        NoAuthApplyPageComponent,
        RegionSelectComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot({prefix: 'app', separator: '-'}),
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
        }),
        AppRoutingModule,
        InterceptorsModule.forRoot(),
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        NgSelectModule,
        NgbProgressbarModule
    ],
    providers: [
        ApplicantsService,
        RegistersService,
        ApplicantConstantsService,
        AtApplicantsExperienceService,
        AtApplicantsSchoolsService,
        VacancyService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
