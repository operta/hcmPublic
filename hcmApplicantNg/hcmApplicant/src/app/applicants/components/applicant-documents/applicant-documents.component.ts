import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AtApplicantsDocuments} from '../../models/applicant-document.model';
import {AtApplicantsDocumentsService} from '../../services/applicant-documents.service';
import {JhiEventManager} from '../../../services/event-manager.service';
import {JhiDataUtils} from '../../../services/data-utils.service';
import {AtApplicantsContactsService} from '../../services/applicant-contacts.service';
import {LoggerService} from '../../../services/logger.service';
import {ToastrService} from 'ngx-toastr';
import Swal from "sweetalert2";

@Component({
  selector: 'app-applicant-documents',
  templateUrl: './applicant-documents.component.html',
})
export class ApplicantDocumentsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() applicantId: number;

  items$: Observable<AtApplicantsDocuments[]>;

  private eventSubscriber: Subscription;

  constructor(private service: AtApplicantsDocumentsService,
              private dataUtils: JhiDataUtils,
              private logger: LoggerService,
              private toastrService: ToastrService,
              private eventManager: JhiEventManager) {
  }

  ngOnInit() {
    this.registerChangeInAtApplicantsDocuments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.applicantId) {
      this.items$ = this.service.findByApplicantId(this.applicantId);
    }
  }

  ngOnDestroy() {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  private registerChangeInAtApplicantsDocuments() {
    this.eventSubscriber = this.eventManager.subscribe('atApplicantsDocumentsListModification', () => {
      this.items$ = this.service.findByApplicantId(this.applicantId);
    });
  }

  openFile(url: string){
    this.dataUtils.openFileByURL(url);
  }

  deleteItem(id: number) {
    Swal.fire({
      title: 'Da li ste sigurni ?',
      text: '(Ova akcija ne može biti vraćena)',
      type: 'warning',
      width: '45rem',
      showCancelButton: true,
      confirmButtonColor: '#69CBA6',
      cancelButtonColor: '#EBA68F',
      confirmButtonText: 'Izbriši',
      cancelButtonText: 'Zatvori',
    }).then((result) => {
      if (result.value) {
        this.deleteDocument(id);
      }
    });
  }

  private deleteDocument(id: number) {
    this.service.delete(id).subscribe(() => {
      this.eventManager.broadcast({name: 'atApplicantsDocumentsListModification'});
      this.toastrService.success('Dokument uspješno izbrisan');
    }, (error) => this.logger.onError(error));
  }


}
