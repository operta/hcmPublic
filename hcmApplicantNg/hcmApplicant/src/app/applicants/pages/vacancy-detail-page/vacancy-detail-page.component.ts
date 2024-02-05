import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AtVacancies} from '../../models/vacancy.model';

@Component({
    selector: 'app-vacancy-detail-page',
    templateUrl: './vacancy-detail-page.component.html',
})
export class VacancyDetailPageComponent {
    isSaving = true;
    vacancy: AtVacancies;
    canApply: boolean;
    noAuth: boolean;

    constructor(private activatedRoute: ActivatedRoute) {
        if (this.activatedRoute.snapshot.data.vacancy) {
            this.vacancy = this.activatedRoute.snapshot.data.vacancy;
            this.canApply = this.activatedRoute.snapshot.data.canApply;
            this.noAuth = this.activatedRoute.snapshot.data.noAuth;
            this.isSaving = false;
        } else {
            this.activatedRoute.data.subscribe((data: { vacancy: AtVacancies, canApply: boolean, noAuth: boolean}) => {
                this.vacancy = data.vacancy;
                this.canApply = data.canApply;
                this.noAuth = data.noAuth;
                this.isSaving = false;
            });
        }
    }
}
