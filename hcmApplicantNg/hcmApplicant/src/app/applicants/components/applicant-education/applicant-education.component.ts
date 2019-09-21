import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AtApplicantsSchools} from '../../models/applicant-school.model';
import {AtApplicantsSchoolsService} from '../../services/applicant-schools.service';
import {JhiEventManager} from '../../../services/event-manager.service';

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
})
export class ApplicantEducationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() applicantId: number;

  schools$: Observable<AtApplicantsSchools[]>;

  private eventSubscriber: Subscription;

  constructor(private service: AtApplicantsSchoolsService,
              private eventManager: JhiEventManager) {
  }

  ngOnInit() {
    this.registerChangeInAtApplicantsSchools();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.applicantId) {
      this.schools$ = this.service.findByApplicantId(this.applicantId);
    }
  }

  ngOnDestroy() {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }

  }

  private registerChangeInAtApplicantsSchools() {
    this.eventSubscriber = this.eventManager.subscribe('atApplicantsSchoolsListModification', () =>
      this.schools$ = this.service.findByApplicantId(this.applicantId));
  }


}
