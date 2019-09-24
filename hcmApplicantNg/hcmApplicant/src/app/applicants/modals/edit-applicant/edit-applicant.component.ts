import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GenericModalComponent} from '../../components/other/generic-modal/generic-modal.component';
import {AtApplicants} from '../../models/applicant.model';
import {ActivatedRoute} from '@angular/router';
import {RegistersService} from '../../services/registers.service';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../../services/logger.service';
import {LocalStorageService} from 'ngx-webstorage';
import {JhiEventManager} from '../../../services/event-manager.service';
import {ApplicantsService} from '../../services/applicants.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-edit-applicant',
    templateUrl: './edit-applicant.component.html',
    styles: []
})
export class EditApplicantComponent implements OnInit {
    @ViewChild('modal', {static: true}) modal: GenericModalComponent;
    applicant: AtApplicants;
    qualifications$: Observable<any>;

    constructor(private service: RegistersService,
                private toastr: ToastrService,
                private logger: LoggerService,
                private localStorage: LocalStorageService,
                private eventManager: JhiEventManager,
                private applicantService: ApplicantsService) {
    }

    ngOnInit() {
        this.qualifications$ = this.service.getQualifications();
    }

    onCitySelected(regionId: number) {
        this.applicant.idCity = regionId;
    }

    save() {
        this.applicantService.update(this.applicant)
            .subscribe(
                () => {
                    this.toastr.success('Profil uspješno uređen.');
                    this.eventManager.broadcast({name: 'atApplicantsListModification'});
                },
                (error) => this.logger.onError(error),
                () => this.modal.onClose()
            );
    }

}

@Component({
    template: ''
})
export class EditApplicantPopupComponent {

    constructor(
        private modalService: ModalService,
        private activatedRoute: ActivatedRoute
    ) {
        const applicant: AtApplicants = this.activatedRoute.snapshot.data.applicant;
        this.modalService.open(
            EditApplicantComponent as Component,
            {size: 'lg'},
            [{name: 'applicant', value: applicant}]
        );
    }
}
