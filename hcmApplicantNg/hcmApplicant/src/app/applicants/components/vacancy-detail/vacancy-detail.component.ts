import {Component, Input} from '@angular/core';
import {AtVacancies} from '../../models/vacancy.model';
import {AtJobApplicationsService} from '../../services/job-application.service';
import {LoggerService} from '../../../services/logger.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
})
export class VacancyDetailComponent {
  @Input() vacancy: AtVacancies;
  @Input() canApply: boolean;

  constructor(private service: AtJobApplicationsService,
              private logger: LoggerService,
              private toastr: ToastrService
  ) {
  }

  apply() {
    this.service.addJobApplication(this.vacancy.id)
      .subscribe(
        () => this.toastr.success(`Prijava na oglas ${this.vacancy.name} uspješna!`),
        (error) => this.logger.onError(error)
      );
  }

}
