import {Component, Input} from '@angular/core';
import {AtApplicantsSchools} from '../../../models/applicant-school.model';
import {AtApplicantsExperienceService} from '../../../services/applicant-experience.service';
import {JhiEventManager} from '../../../../services/event-manager.service';
import {LoggerService} from '../../../../services/logger.service';
import {ToastrService} from 'ngx-toastr';
import Swal from "sweetalert2";
import {AtApplicantsSchoolsService} from '../../../services/applicant-schools.service';

@Component({
  selector: 'app-applicant-education-item',
  templateUrl: './applicant-education-item.component.html',
})
export class ApplicantEducationItemComponent{
  @Input() education: AtApplicantsSchools;

  isCollapsed = true;

  constructor(private service: AtApplicantsSchoolsService,
              private eventManager: JhiEventManager,
              private logger: LoggerService,
              private toastrService: ToastrService) {
  }

  deleteItem() {
    Swal.fire({
      title: 'Da li ste sigurni ?',
      text: '(Ova akcija ne može biti vraćena)',
      type: 'warning',
      width: '45rem',
      showCancelButton: true,
      confirmButtonColor: '#69CBA6',
      cancelButtonColor: '#EBA68F',
      confirmButtonText: 'Izbriši',
      cancelButtonText: 'Zatvori',
    }).then((result) => {
      if (result.value) {
        const id = this.education.id;
        this.deleteEducation(id);
      }
    });
  }

  private deleteEducation(id: number) {
    this.service.delete(id).subscribe(() => {
      this.eventManager.broadcast({name: 'atApplicantsSchoolsListModification'});
      this.toastrService.success('Obrazovanje uspješno izbrisano');
    }, (error) => this.logger.onError(error));
  }

}
