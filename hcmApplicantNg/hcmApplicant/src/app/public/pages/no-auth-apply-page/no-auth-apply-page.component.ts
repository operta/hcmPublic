import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AtApplicants} from '../../../applicants/models/applicant.model';
import {ApplicantsService} from '../../../applicants/services/applicants.service';
import {ToastrService} from 'ngx-toastr';
import {RegistersService} from '../../../applicants/services/registers.service';
import {Observable} from 'rxjs';
import {AtApplicantsSchools} from '../../../applicants/models/applicant-school.model';
import {AtApplicantsExperience} from '../../../applicants/models/applicant-experience.model';
import {switchMap} from 'rxjs/operators';
import {AtApplicantsExperienceService} from '../../../applicants/services/applicant-experience.service';
import {AtApplicantsSchoolsService} from '../../../applicants/services/applicant-schools.service';

@Component({
    selector: 'app-no-auth-apply',
    templateUrl: './no-auth-apply-page.component.html',
    styleUrls: ['./no-auth-apply-page.component.css']
})
export class NoAuthApplyPageComponent implements OnInit {

    errorEmailExists: string;
    success: boolean;
    vacancyId: number;
    applicant: AtApplicants = new AtApplicants();
    school = new AtApplicantsSchools();
    qualifications$: Observable<any>;
    schools$: Observable<any>;
    experience = new AtApplicantsExperience();
    experience2 = new AtApplicantsExperience();

    constructor(
        private route: ActivatedRoute,
        private applicantsService: ApplicantsService,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private toastr: ToastrService,
        private registersService: RegistersService,
        private experienceService: AtApplicantsExperienceService,
        private schoolsService: AtApplicantsSchoolsService
    ) {
        this.vacancyId = +this.route.snapshot.params.vacancyId;
    }

    ngOnInit() {
        this.success = false;
        this.schools$ = this.registersService.getSchools();
        this.qualifications$ = this.registersService.getQualifications();
    }

    apply() {
        this.errorEmailExists = null;
        if (this.experience2 && this.experience2.company && this.experience2.position && this.experience2.dateFrom) {
            this.applicantsService.createNoAuth(this.applicant, this.vacancyId)
                .pipe(
                    switchMap((createdApplicant: AtApplicants) => {
                        this.experience.idApplicantId = createdApplicant.id;
                        this.experience2.idApplicantId = createdApplicant.id;
                        this.school.idApplicantId = createdApplicant.id;
                        return this.experienceService.create(this.experience);
                    }),
                    switchMap(() => this.schoolsService.create(this.school)),
                    switchMap(() => this.experienceService.create(this.experience2))
                )
                .subscribe(
                    () => {
                        this.toastr.success('Aplikacija uspjesna, mail za aktivaciju vaseg profila je poslan');
                    },
                    (error) => this.processError(error)
                );
        } else {

            this.applicantsService.createNoAuth(this.applicant, this.vacancyId)
                .pipe(
                    switchMap((createdApplicant: AtApplicants) => {
                        this.experience.idApplicantId = createdApplicant.id;
                        this.school.idApplicantId = createdApplicant.id;
                        return this.experienceService.create(this.experience);
                    }),
                    switchMap(() => this.schoolsService.create(this.school))
                )
                .subscribe(
                    () => {
                        this.toastr.success('Aplikacija uspješna, mail za prijavu na vaš profil je poslan');
                    },
                    (error) => this.processError(error)
                );
        }
    }


    onCitySelected(regionId: number) {
        this.applicant.idCity = regionId;
    }

    private processError(response) {
        this.success = null;
        if (response.status === 400) {
            this.errorEmailExists = 'ERROR';
        }
    }

}
