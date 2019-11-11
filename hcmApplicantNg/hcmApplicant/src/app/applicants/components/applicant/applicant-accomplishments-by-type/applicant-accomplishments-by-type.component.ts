import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {AtApplicantAcc} from '../../../models/applicant-accomplishment.model';
import {ApplicantConstantsService} from '../../../services/applicant-constants.service';
import {LoggerService} from '../../../../services/logger.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-applicant-accomplishments-by-type',
    templateUrl: './applicant-accomplishments-by-type.component.html',
})
export class ApplicantAccomplishmentsByTypeComponent implements OnChanges, OnDestroy {
    @Input() accomplishments: AtApplicantAcc[];
    @Input() type: string;
    private unsubscribe: Subject<void> = new Subject<void>();

    filteredAccomplishments: AtApplicantAcc[] = [];
    isCollapsed = true;

    constructor(
        private apConstants: ApplicantConstantsService,
        private logger: LoggerService
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.loadFilter(this.type);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    loadFilter(type: string) {
        if (type === 'Certifications') {
            this.apConstants.findByKey('applicantAccomplishmentsByTypeCertifications')
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {
                    this.filterAccomplishmentsByType(+res.value);
                }, err => this.logger.onError(err));
        } else if (type === 'Courses') {
            this.apConstants.findByKey('applicantAccomplishmentsByTypeCourses')
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {
                    this.filterAccomplishmentsByType(+res.value);
                }, err => this.logger.onError(err));
        } else if (type === 'HonorsandAwards') {
            this.apConstants.findByKey('applicantAccomplishmentsByTypeHonorsandAwards')
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {
                    this.filterAccomplishmentsByType(+res.value);
                }, err => this.logger.onError(err));
        } else if (type === 'Languages') {
            this.apConstants.findByKey('applicantAccomplishmentsByTypeLanguages')
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {
                    this.filterAccomplishmentsByType(+res.value);
                }, err => this.logger.onError(err));
        } else if (type === 'Projects') {
            this.apConstants.findByKey('applicantAccomplishmentsByTypeProjects')
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {
                    this.filterAccomplishmentsByType(+res.value);
                }, err => this.logger.onError(err));
        } else if (type === 'Publications') {
            this.apConstants.findByKey('applicantAccomplishmentsByTypePublications')
                .pipe(takeUntil(this.unsubscribe))
                .subscribe(res => {
                    this.filterAccomplishmentsByType(+res.value);
                }, err => this.logger.onError(err));
        }
    }

    private filterAccomplishmentsByType(typeId: number) {
        if (this.accomplishments) {
            this.filteredAccomplishments = this.accomplishments.filter((item) => item.idAccomplishmentTypeId === typeId);
        }
    }
}
