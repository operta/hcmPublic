import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AtApplicantsContacts} from '../../models/applicant-contact.model';
import {AtApplicantsContactsService} from '../../services/applicant-contacts.service';
import {JhiEventManager} from '../../../services/event-manager.service';

@Component({
  selector: 'app-applicant-contacts',
  templateUrl: './applicant-contacts.component.html',
})
export class ApplicantContactsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() applicantId: number;

  items$: Observable<AtApplicantsContacts[]>;

  private eventSubscriber: Subscription;

  constructor(private service: AtApplicantsContactsService,
              private eventManager: JhiEventManager) {
  }

  ngOnInit(): void {
    this.registerChangeInAtApplicantContacts();
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

  private registerChangeInAtApplicantContacts() {
    this.eventSubscriber = this.eventManager.subscribe('atApplicantsContactsListModification', (response) =>
      this.items$ = this.service.findByApplicantId(this.applicantId));
  }

}
