import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DmDocumentLinks} from '../../../models/document-link.model';
import {JhiDataUtils} from '../../../../services/data-utils.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-document-blob-input',
    templateUrl: './document-blob-input.component.html',
})
export class DocumentBlobInputComponent implements OnInit {

    dmDocumentLinks: DmDocumentLinks = new DmDocumentLinks();
    @Output() documentLinksChanged = new EventEmitter();

    constructor(
        private dataUtils: JhiDataUtils,
        private toastrService: ToastrService,
    ) {
    }

    ngOnInit() {
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        if (event['srcElement'].files && event['srcElement'].files[0] && event['srcElement'].files[0].size !== undefined && event['srcElement'].files[0].size < 1024000) {
            if (event['srcElement'].files[0].size === 0) {
                this.toastrService.warning('Datoteka prazna');
            } else {
                const returnObject = {
                    event: event,
                    entity: entity,
                    field: field,
                    isImage: isImage,
                    dmDocumentLinks: this.dmDocumentLinks
                };
                this.documentLinksChanged.emit(returnObject);
            }
        } else {
            if (event['srcElement'].files[0]) {
                this.toastrService.warning('Datoteka prevelika');
            }
        }

    }

    resetBlob() {
        this.dmDocumentLinks = new DmDocumentLinks();
        (<HTMLInputElement>document.getElementById('file_documentBlob')).value = '';
        const returnObject = {
            event: null,
            entity: null,
            field: null,
            isImage: null,
            dmDocumentLinks: null
        };
        this.documentLinksChanged.emit(returnObject);
    }
}
