import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AtVacancies} from '../../models/vacancy.model';

@Component({
  selector: 'app-vacancy-detail-page',
  templateUrl: './vacancy-detail-page.component.html',
})
export class VacancyDetailPageComponent {
  vacancy: AtVacancies;
  canApply: boolean;
  noAuth: boolean;

  constructor(private activatedRoute: ActivatedRoute) {
    this.vacancy = this.activatedRoute.snapshot.data.vacancy;
    this.canApply = this.activatedRoute.snapshot.data.canApply;
    this.noAuth = this.activatedRoute.snapshot.data.noAuth;
  }

}
