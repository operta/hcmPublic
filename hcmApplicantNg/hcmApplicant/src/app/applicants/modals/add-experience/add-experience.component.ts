import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GenericModalComponent} from '../../components/other/generic-modal/generic-modal.component';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../../services/logger.service';
import {LocalStorageService} from 'ngx-webstorage';
import {JhiEventManager} from '../../../services/event-manager.service';
import {AtApplicantsExperienceService} from '../../services/applicant-experience.service';
import {AtApplicantsExperience} from '../../models/applicant-experience.model';

@Component({
    selector: 'app-add-experience',
    templateUrl: './add-experience.component.html'
})
export class AddExperienceComponent implements OnInit {
    @ViewChild('modal', {static: true}) modal: GenericModalComponent;
    experience = new AtApplicantsExperience();

    constructor(private toastr: ToastrService,
                private logger: LoggerService,
                private localStorage: LocalStorageService,
                private eventManager: JhiEventManager,
                private experienceService: AtApplicantsExperienceService) {
    }

    ngOnInit() {
    }

    save() {
        this.experience.idApplicantId = +this.localStorage.retrieve('applicantId');
        this.experienceService.create(this.experience)
            .subscribe(
                () => {
                    this.toastr.success('Iskustvo uspješno dodano.');
                    this.eventManager.broadcast({name: 'atApplicantsExperienceListModification'});
                },
                (error) => this.logger.onError(error),
                () => this.modal.onClose()
            );
    }


}

@Component({
    template: ''
})
export class AddExperiencePopupComponent {

    constructor(
        private modalService: ModalService,
    ) {

        this.modalService.open(
            AddExperienceComponent as Component,
            {size: 'lg'}
        );
    }
}
