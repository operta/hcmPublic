import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AtApplicantsExperienceService} from '../../../services/applicant-experience.service';
import {Observable, Subscription} from 'rxjs';
import {AtApplicantsExperience} from '../../../models/applicant-experience.model';
import {JhiEventManager} from '../../../../services/event-manager.service';

@Component({
  selector: 'app-applicant-experience',
  templateUrl: './applicant-experience.component.html',
})
export class ApplicantExperienceComponent implements OnInit, OnChanges, OnDestroy {
  @Input() applicantId: number;

  experiences$: Observable<AtApplicantsExperience[]>;

  private eventSubscriber: Subscription;

  constructor(private applicantExperienceService: AtApplicantsExperienceService,
              private eventManager: JhiEventManager) {
  }

  ngOnInit(): void {
    this.registerChangeInAtApplicantsExperiences();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.applicantId) {
      this.experiences$ = this.applicantExperienceService.findByApplicantId(this.applicantId);
    }
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  registerChangeInAtApplicantsExperiences() {
    this.eventSubscriber = this.eventManager.subscribe('atApplicantsExperienceListModification', (response) =>
      this.experiences$ = this.applicantExperienceService.findByApplicantId(this.applicantId));
  }


}
