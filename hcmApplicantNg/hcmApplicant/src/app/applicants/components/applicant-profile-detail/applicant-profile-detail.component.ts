import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AtApplicants} from '../../models/applicant.model';
import {ToastrService} from 'ngx-toastr';
import {JhiDataUtils} from '../../../services/data-utils.service';
import {ApplicantsService} from '../../services/applicants.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LoggerService} from '../../../services/logger.service';

@Component({
  selector: 'app-applicant-profile-detail',
  templateUrl: './applicant-profile-detail.component.html',
  styleUrls: ['./applicant-profile-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicantProfileDetailComponent implements OnInit, OnDestroy {
  @Input() applicant: AtApplicants;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private toastrService: ToastrService,
              private dataUtils: JhiDataUtils,
              private logger: LoggerService,
              private applicantsService: ApplicantsService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setFileData(event, entity, field, isImage) {
    if (event['srcElement'].files && event['srcElement'].files[0] && event['srcElement'].files[0].size && event['srcElement'].files[0].size < 1024000) {
      this.dataUtils.setFileData(event, entity, field, isImage);
      setTimeout(() => {
        this.save();
      }, 1000);
    } else {
      this.toastrService.warning('Datoteka prevelika');
    }
  }

  save() {
    this.applicantsService.update(this.applicant)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: AtApplicants) => {
          this.applicant = data;
          this.toastrService.success('Fotografija uspješno postavljena');
        },
        (error) => this.logger.onError(error)
      );
  }


}
