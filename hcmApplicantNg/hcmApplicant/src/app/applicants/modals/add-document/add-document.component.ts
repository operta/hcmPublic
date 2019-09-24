import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GenericModalComponent} from '../../components/other/generic-modal/generic-modal.component';
import {AtApplicantsDocuments} from '../../models/applicant-document.model';
import {LocalStorageService} from 'ngx-webstorage';
import {AtApplicantsDocumentsService} from '../../services/applicant-documents.service';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../../services/logger.service';
import {JhiEventManager} from '../../../services/event-manager.service';
import {JhiDataUtils} from '../../../services/data-utils.service';
import {DmDocumentLinks} from '../../models/document-link.model';
import {DmDocumentLinksService} from '../../services/document-links.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-add-document',
    templateUrl: './add-document.component.html',
})
export class AddDocumentComponent implements OnInit {
    @ViewChild('modal', {static: true}) modal: GenericModalComponent;
    document = new AtApplicantsDocuments();
    dmDocumentLinks = new DmDocumentLinks();

    constructor(private localStorage: LocalStorageService,
                private toastr: ToastrService,
                private dataUtils: JhiDataUtils,
                private logger: LoggerService,
                private eventManager: JhiEventManager,
                private documentLinksService: DmDocumentLinksService,
                private documentsService: AtApplicantsDocumentsService) {
    }

    ngOnInit() {
    }

    save() {
        this.dmDocumentLinks.documentName = this.document.name;
        this.documentLinksService.createBlob(this.dmDocumentLinks)
            .pipe(
                switchMap((savedLink) => {
                    this.document.idApplicantId = +this.localStorage.retrieve('applicantId');
                    this.document.idDocumentLink = savedLink.id;
                    // TODO unstable
                    this.document.idDocumentType = 26051;
                    return this.documentsService.create(this.document);
                })
            ).subscribe(
            () => {
                this.toastr.success('Dokument uspješno dodan.');
                this.eventManager.broadcast({name: 'atApplicantsDocumentsListModification'});
            },
            (error) => this.logger.onError(error),
            () => this.modal.onClose()
        );

    }

    documentChangeEventHandler(documentObject) {
        this.dataUtils.setFileData(documentObject.event, documentObject.entity, documentObject.field, documentObject.isImage);
        this.dmDocumentLinks = documentObject.dmDocumentLinks;
    }

}

@Component({
    template: ''
})
export class AddDocumentPopupComponent {

    constructor(
        private modalService: ModalService,
    ) {

        this.modalService.open(
            AddDocumentComponent as Component,
            {size: 'lg'}
        );
    }
}

