import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GenericModalComponent} from '../../components/generic-modal/generic-modal.component';
import {Observable} from 'rxjs';
import {RegistersService} from '../../services/registers.service';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../../services/logger.service';
import {LocalStorageService} from 'ngx-webstorage';
import {JhiEventManager} from '../../../services/event-manager.service';
import {AtApplicantsSchools} from '../../models/applicant-school.model';
import {AtApplicantsSchoolsService} from '../../services/applicant-schools.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
})
export class AddEducationComponent implements OnInit {
  @ViewChild('modal', {static: true}) modal: GenericModalComponent;
  school = new AtApplicantsSchools();

  schools$: Observable<any>;
  qualifications$: Observable<any>;

  constructor(private service: RegistersService,
              private toastr: ToastrService,
              private logger: LoggerService,
              private localStorage: LocalStorageService,
              private eventManager: JhiEventManager,
              private schoolsService: AtApplicantsSchoolsService) {
  }

  ngOnInit() {
    this.schools$ = this.service.getSchools();
    this.qualifications$ = this.service.getQualifications();
  }

  save() {
    this.school.idApplicantId = +this.localStorage.retrieve('applicantId');
    this.schoolsService.create(this.school)
        .subscribe(
            () => {
              this.toastr.success('Edukacija uspješno dodana.');
              this.eventManager.broadcast({name: 'atApplicantsSchoolsListModification'});
            },
            (error) => this.logger.onError(error),
            () => this.modal.onClose()
        );
  }


}

@Component({
  template: ''
})
export class AddEducationPopupComponent {

  constructor(
      private modalService: ModalService,
  ) {

    this.modalService.open(
        AddEducationComponent as Component,
        {size: 'lg'}
    );
  }
}
