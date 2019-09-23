import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GenericModalComponent} from '../../components/generic-modal/generic-modal.component';
import {AtApplicantsContacts} from '../../models/applicant-contact.model';
import {RegistersService} from '../../services/registers.service';
import {Observable} from 'rxjs';
import {AtApplicantsContactsService} from '../../services/applicant-contacts.service';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../../services/logger.service';
import {LocalStorageService} from 'ngx-webstorage';
import {JhiEventManager} from '../../../services/event-manager.service';

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
})
export class AddContactComponent implements OnInit {
    @ViewChild('modal', {static: true}) modal: GenericModalComponent;
    contact = new AtApplicantsContacts();

    contactTypes$: Observable<any>;

    constructor(private service: RegistersService,
                private toastr: ToastrService,
                private logger: LoggerService,
                private localStorage: LocalStorageService,
                private eventManager: JhiEventManager,
                private contactService: AtApplicantsContactsService) {
    }

    ngOnInit() {
        this.contactTypes$ = this.service.getContactTypes();
    }

    save() {
        this.contact.idApllicantId = +this.localStorage.retrieve('applicantId');
        this.contactService.create(this.contact)
            .subscribe(
                () => {
                    this.toastr.success('Kontakt uspješno dodan.');
                    this.eventManager.broadcast({name: 'atApplicantsContactsListModification'});
                },
                        (error) => this.logger.onError(error),
                () => this.modal.onClose()
            );
    }


}

@Component({
    template: ''
})
export class AddContactPopupComponent {

    constructor(
        private modalService: ModalService,
    ) {

        this.modalService.open(
            AddContactComponent as Component,
            {size: 'lg'}
        );
    }
}
