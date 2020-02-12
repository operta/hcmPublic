import {CommonModule} from '@angular/common';
import {ApplicantsRoutingModule} from './applicants-routing.module';
import {ApplicantProfilePageComponent} from './pages/applicant-profile-page/applicant-profile-page.component';
import {ApplicantDocumentsComponent} from './components/applicant/applicant-documents/applicant-documents.component';
import {ApplicantExperienceComponent} from './components/applicant/applicant-experience/applicant-experience.component';
import {ApplicantContactsComponent} from './components/applicant/applicant-contacts/applicant-contacts.component';
import {NavbarComponent} from './components/other/navbar/navbar.components';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ImagePresentComponent} from './components/other/image-present.component';
import {ApplicantPersonalInfoComponent} from './components/applicant/applicant-personal-info/applicant-personal-info.component';
import {ApplicantProfileDetailComponent} from './components/applicant/applicant-profile-detail/applicant-profile-detail.component';
import {MaritalStatusDisplayComponent} from './components/other/marital-status-display/marital-status-display.component';
import {ApplicantEducationComponent} from './components/applicant/applicant-education/applicant-education.component';
import {ApplicantExperienceItemComponent} from './components/applicant/applicant-experience-item/applicant-experience-item.component';
import {ApplicantAccomplishmentsComponent} from './components/applicant/applicant-accomplishments/applicant-accomplishments.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NgbCollapseModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {AtApplicantsExperienceService} from './services/applicant-experience.service';
import {ApplicantEducationItemComponent} from './components/applicant/applicant-education-item/applicant-education-item.component';
import {ApplicantContactsItemComponent} from './components/applicant/applicant-contacts-item/applicant-contacts-item.component';
import {ApplicantAccomplishmentsItemComponent} from './components/applicant/applicant-accomplishments-item/applicant-accomplishments-item.component';
import {AtApplicantsSchoolsService} from './services/applicant-schools.service';
import {AtApplicantsDocumentsService} from './services/applicant-documents.service';
import {AtApplicantsContactsService} from './services/applicant-contacts.service';
import {AtApplicantAccService} from './services/applicant-accomplishments.service';
import {ApplicantAccomplishmentsByTypeComponent} from './components/applicant/applicant-accomplishments-by-type/applicant-accomplishments-by-type.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {VacanciesPageComponent} from './pages/vacancies-page/vacancies-page.component';
import {JobApplicationsPageComponent} from './pages/job-applications-page/job-applications-page.component';
import {VacancyService} from './services/vacancy.service';
import {VacancyDetailComponent} from './components/applicant/vacancy-detail/vacancy-detail.component';
import {VacancyOverviewComponent} from './components/applicant/vacancy-overview/vacancy-overview.component';
import {VacancyDetailPageComponent} from './pages/vacancy-detail-page/vacancy-detail-page.component';
import {AtJobApplicationsService} from './services/job-application.service';
import {NotificationsPreviewComponent} from './components/other/notifications-preview/notifications-preview.component';
import {UserNotificationsPageComponent} from './pages/user-notifications-page/user-notifications-page.component';
import {UserNotificationsService} from './services/user-notifications.service';
import {AddAccomplishmentComponent, AddAccomplishmentPopupComponent} from './modals/add-accomplishment/add-accomplishment.component';
import {AddExperienceComponent, AddExperiencePopupComponent} from './modals/add-experience/add-experience.component';
import {AddContactComponent, AddContactPopupComponent} from './modals/add-contact/add-contact.component';
import {AddDocumentComponent, AddDocumentPopupComponent} from './modals/add-document/add-document.component';
import {AddEducationComponent, AddEducationPopupComponent} from './modals/add-education/add-education.component';
import {EditApplicantComponent, EditApplicantPopupComponent} from './modals/edit-applicant/edit-applicant.component';
import {GenericModalComponent} from './components/other/generic-modal/generic-modal.component';
import {ModalService} from './services/modal.service';
import {FormsModule} from '@angular/forms';
import {DocumentBlobInputComponent} from './components/other/document-blob-input/document-blob-input.component';
import {DmDocumentLinksService} from './services/document-links.service';
import {RegionSelectComponent} from './components/other/region-select/region-select.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {RegistersService} from './services/registers.service';
import {ApplicantsService} from './services/applicants.service';
import {SettingsComponent} from './components/account/settings/settings.component';
import {PasswordComponent} from './components/account/password/password.component';
import {PasswordService} from './services/password.service';
import {ApplicantConstantsService} from './services/applicant-constants.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ApplicantsRoutingModule,
        NgbCollapseModule,
        NgbModalModule,
        NgSelectModule,
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
        EditApplicantPopupComponent,
        DocumentBlobInputComponent,
        SettingsComponent,
        PasswordComponent
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
        DmDocumentLinksService,
        RegistersService,
        PasswordService,
        ApplicantConstantsService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicantsModule {
}
