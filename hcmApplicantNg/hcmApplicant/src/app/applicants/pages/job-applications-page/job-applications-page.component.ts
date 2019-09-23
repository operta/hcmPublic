import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AtVacancies} from '../../models/vacancy.model';

@Component({
  selector: 'app-job-applications-page',
  templateUrl: './job-applications-page.component.html',
})
export class JobApplicationsPageComponent {
  appliedVacancies: AtVacancies[];

  constructor(private activatedRoute: ActivatedRoute) {
    this.appliedVacancies = this.activatedRoute.snapshot.data.appliedVacancies;
  }


}
