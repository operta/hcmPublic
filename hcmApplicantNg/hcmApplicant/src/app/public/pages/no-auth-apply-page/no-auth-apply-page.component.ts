import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AtApplicants} from '../../../applicants/models/applicant.model';
import {ApplicantsService} from '../../../applicants/services/applicants.service';
import {ToastrService} from 'ngx-toastr';

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


    constructor(
        private route: ActivatedRoute,
        private applicantsService: ApplicantsService,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private toastr: ToastrService,
    ) {
        this.vacancyId = +this.route.snapshot.params.vacancyId;
    }

    ngOnInit() {
        this.success = false;
    }

    apply() {
        this.errorEmailExists = null;
        this.applicantsService.createNoAuth(this.applicant, this.vacancyId )
            .subscribe(
                () => {
                    this.toastr.success('Aplikacija uspjesna, mail za aktivaciju vaseg profila je poslan');
                },
                (error) => this.processError(error)
            );
    }

    private processError(response) {
        this.success = null;
        if (response.status === 400 && response.error.type === 'http://www.jhipster.tech/problem/email-already-used') {
            this.errorEmailExists = 'ERROR';
        }
    }

}
