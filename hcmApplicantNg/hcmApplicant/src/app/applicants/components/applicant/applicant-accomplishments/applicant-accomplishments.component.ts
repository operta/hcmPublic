import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AtApplicantAcc} from '../../../models/applicant-accomplishment.model';
import {AtApplicantAccService} from '../../../services/applicant-accomplishments.service';
import {JhiEventManager} from '../../../../services/event-manager.service';

@Component({
    selector: 'app-applicant-accomplishments',
    templateUrl: './applicant-accomplishments.component.html',
})
export class ApplicantAccomplishmentsComponent implements OnInit, OnChanges, OnDestroy {
    @Input() applicantId: number;

    items$: Observable<AtApplicantAcc[]>;

    private eventSubscriber: Subscription;

    constructor(private service: AtApplicantAccService, private eventManager: JhiEventManager) {
    }

    ngOnInit(): void {
        this.registerChangeInAtApplicantsAcc();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.applicantId) {
            this.items$ = this.service.findByApplicantId(this.applicantId);
        }
    }

    ngOnDestroy(): void {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }

    private registerChangeInAtApplicantsAcc() {
        this.eventSubscriber = this.eventManager.subscribe('atApplicantAccListModification', (response) =>
            this.items$ = this.service.findByApplicantId(this.applicantId));
    }

}
