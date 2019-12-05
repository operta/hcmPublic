import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AtApplicants} from '../../models/applicant.model';
import {JhiEventManager} from '../../../services/event-manager.service';
import {ApplicantsService} from '../../services/applicants.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-applicant-profile-page',
  templateUrl: './applicant-profile-page.component.html',
})
export class ApplicantProfilePageComponent implements OnInit, OnDestroy {
  applicant$: Observable<AtApplicants>;

  private eventSubscriber;

  constructor(private activatedRoute: ActivatedRoute, private eventManager: JhiEventManager,
              private applicantsService: ApplicantsService) {
    console.log('in applicant')
    this.applicant$ = of(this.activatedRoute.snapshot.data.applicant);
  }

  ngOnInit() {
    console.log('in applicants')
    this.registerChangeInAtApplicants();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  private registerChangeInAtApplicants() {
    this.eventSubscriber = this.eventManager.subscribe('atApplicantsListModification', () => this.reloadApplicant());
  }

  private reloadApplicant() {
    this.applicant$ = this.applicantsService.findByUserId();
  }

}
