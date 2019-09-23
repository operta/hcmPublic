import {Component, Input} from '@angular/core';
import {AtVacancies} from '../../models/vacancy.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vacancy-overview',
  templateUrl: './vacancy-overview.component.html',
})
export class VacancyOverviewComponent {
  @Input() vacancy: AtVacancies;

  constructor(private router: Router) {
  }

  navigateToDetail() {
    this.router.navigate(['/dashboard/vacancy-detail/' + this.vacancy.id]).catch(() => this.router.navigate(['/404']));
  }

}
