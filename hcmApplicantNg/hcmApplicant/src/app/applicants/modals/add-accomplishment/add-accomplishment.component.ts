import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GenericModalComponent} from '../../components/other/generic-modal/generic-modal.component';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../../services/logger.service';
import {LocalStorageService} from 'ngx-webstorage';
import {JhiEventManager} from '../../../services/event-manager.service';
import {AtApplicantAcc} from '../../models/applicant-accomplishment.model';
import {AtApplicantAccService} from '../../services/applicant-accomplishments.service';
import {Observable} from 'rxjs';
import {RegistersService} from '../../services/registers.service';

@Component({
    selector: 'app-add-accomplishment',
    templateUrl: './add-accomplishment.component.html',
})
export class AddAccomplishmentComponent implements OnInit {
    @ViewChild('modal',  {static: true}) modal: GenericModalComponent;
    accomplishment = new AtApplicantAcc();
    accomplishmentTypes$: Observable<any>;

    constructor(private toastr: ToastrService,
                private logger: LoggerService,
                private localStorage: LocalStorageService,
                private eventManager: JhiEventManager,
                private registersService: RegistersService,
                private accService: AtApplicantAccService) {
    }

    ngOnInit() {
        this.accomplishmentTypes$ = this.registersService.getAccomplishmentTypes();
    }

    save() {
        this.accomplishment.idApplicantId = +this.localStorage.retrieve('applicantId');
        this.accService.create(this.accomplishment)
            .subscribe(
                () => {
                    this.toastr.success('Postignuće uspješno dodano.');
                    this.eventManager.broadcast({name: 'atApplicantAccListModification'});
                },
                (error) => this.logger.onError(error),
                () => this.modal.onClose()
            );
    }


}

@Component({
    template: ''
})
export class AddAccomplishmentPopupComponent {

    constructor(
        private modalService: ModalService,
    ) {

        this.modalService.open(
            AddAccomplishmentComponent as Component,
            {size: 'lg'}
        );
    }
}
