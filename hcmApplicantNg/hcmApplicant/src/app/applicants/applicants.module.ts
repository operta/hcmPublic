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
import {NgbCollapseModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
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
import {VacanciesPageComponent} from './pages/vacancies-page/vacancies-page.component';
import {JobApplicationsPageComponent} from './pages/job-applications-page/job-applications-page.component';
import {VacancyService} from './services/vacancy.service';
import {VacancyDetailComponent} from './components/vacancy-detail/vacancy-detail.component';
import {VacancyOverviewComponent} from './components/vacancy-overview/vacancy-overview.component';
import {VacancyDetailPageComponent} from './pages/vacancy-detail-page/vacancy-detail-page.component';
import {AtJobApplicationsService} from './services/job-application.service';
import {NotificationsPreviewComponent} from './components/notifications-preview/notifications-preview.component';
import {UserNotificationsPageComponent} from './pages/user-notifications-page/user-notifications-page.component';
import {UserNotificationsService} from './services/user-notifications.service';
import {AddAccomplishmentComponent, AddAccomplishmentPopupComponent} from './modals/add-accomplishment/add-accomplishment.component';
import {AddExperienceComponent, AddExperiencePopupComponent} from './modals/add-experience/add-experience.component';
import {AddContactComponent, AddContactPopupComponent} from './modals/add-contact/add-contact.component';
import {AddDocumentComponent, AddDocumentPopupComponent} from './modals/add-document/add-document.component';
import {AddEducationComponent, AddEducationPopupComponent} from './modals/add-education/add-education.component';
import {EditApplicantComponent, EditApplicantPopupComponent} from './modals/edit-applicant/edit-applicant.component';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import {ModalService} from './services/modal.service';
import {RegistersService} from './services/registers.service';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ApplicantsRoutingModule,
        NgbCollapseModule,
        NgbModalModule,
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
        VacanciesPageComponent,
        JobApplicationsPageComponent,
        VacancyDetailComponent,
        VacancyOverviewComponent,
        VacancyDetailPageComponent,
        NotificationsPreviewComponent,
        UserNotificationsPageComponent,
        AddAccomplishmentComponent,
        AddExperienceComponent,
        AddContactComponent,
        AddDocumentComponent,
        AddEducationComponent,
        EditApplicantComponent,
        GenericModalComponent,
        AddContactPopupComponent,
        AddAccomplishmentPopupComponent,
        AddExperiencePopupComponent,
        AddEducationPopupComponent,
        AddDocumentPopupComponent,
        EditApplicantPopupComponent
    ],
    entryComponents: [
        GenericModalComponent,
        AddAccomplishmentComponent,
        AddExperienceComponent,
        AddContactComponent,
        AddDocumentComponent,
        AddEducationComponent,
        EditApplicantComponent,
    ],
    providers: [
        ApplicantsService,
        AtApplicantsExperienceService,
        AtApplicantsSchoolsService,
        AtApplicantsDocumentsService,
        AtApplicantsContactsService,
        AtApplicantAccService,
        VacancyService,
        AtJobApplicationsService,
        UserNotificationsService,
        ModalService,
        RegistersService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicantsModule {
}
