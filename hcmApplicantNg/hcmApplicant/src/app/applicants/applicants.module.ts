import {CommonModule} from '@angular/common';
import {ApplicantsRoutingModule} from './applicants-routing.module';
import {ApplicantProfilePageComponent} from './pages/applicant-profile-page/applicant-profile-page.component';
import {ApplicantDocumentsComponent} from './components/applicant-documents/applicant-documents.component';
import {ApplicantExperienceComponent} from './components/applicant-experience/applicant-experience.component';
import {ApplicantContactsComponent} from './components/applicant-contacts/applicant-contacts.component';
import {NavbarComponent} from './components/navbar/navbar.components';
import {ApplicantsService} from './services/applicants.service';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ImagePresentComponent} from './components/image-present.component';
import {ApplicantPersonalInfoComponent} from './components/applicant-personal-info/applicant-personal-info.component';
import {ApplicantProfileDetailComponent} from './components/applicant-profile-detail/applicant-profile-detail.component';
import {MaritalStatusDisplayComponent} from './components/marital-status-display/marital-status-display.component';
import {ApplicantEducationComponent} from './components/applicant-education/applicant-education.component';
import {ApplicantExperienceItemComponent} from './components/applicant-experience-item/applicant-experience-item.component';
import {ApplicantAccomplishmentsComponent} from './components/applicant-accomplishments/applicant-accomplishments.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {AtApplicantsExperienceService} from './services/applicant-experience.service';
import {ApplicantEducationItemComponent} from './components/applicant-education-item/applicant-education-item.component';
import {ApplicantContactsItemComponent} from './components/applicant-contacts-item/applicant-contacts-item.component';
import {ApplicantAccomplishmentsItemComponent} from './components/applicant-accomplishments-item/applicant-accomplishments-item.component';
import {AtApplicantsSchoolsService} from './services/applicant-schools.service';
import {AtApplicantsDocumentsService} from './services/applicant-documents.service';
import {AtApplicantsContactsService} from './services/applicant-contacts.service';
import {AtApplicantAccService} from './services/applicant-accomplishments.service';
import {ApplicantAccomplishmentsByTypeComponent} from './components/applicant-accomplishments-by-type/applicant-accomplishments-by-type.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    ApplicantsRoutingModule,
    NgbCollapseModule,
    SweetAlert2Module.forRoot()
  ],
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ApplicantProfilePageComponent,
    ApplicantProfileDetailComponent,
    ImagePresentComponent,
    ApplicantPersonalInfoComponent,
    MaritalStatusDisplayComponent,
    ApplicantExperienceComponent,
    ApplicantEducationComponent,
    ApplicantAccomplishmentsComponent,
    ApplicantDocumentsComponent,
    ApplicantContactsComponent,
    ApplicantExperienceItemComponent,
    ApplicantEducationItemComponent,
    ApplicantContactsItemComponent,
    ApplicantAccomplishmentsItemComponent,
    ApplicantAccomplishmentsByTypeComponent,
  ],
  providers: [
    ApplicantsService,
    AtApplicantsExperienceService,
    AtApplicantsSchoolsService,
    AtApplicantsDocumentsService,
    AtApplicantsContactsService,
    AtApplicantAccService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicantsModule {
}
