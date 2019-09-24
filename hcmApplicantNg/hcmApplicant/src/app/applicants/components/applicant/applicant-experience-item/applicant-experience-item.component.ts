import {Component, Input} from '@angular/core';
import {AtApplicantsExperience} from '../../../models/applicant-experience.model';
import Swal from 'sweetalert2';
import {AtApplicantsExperienceService} from '../../../services/applicant-experience.service';
import {takeUntil} from 'rxjs/operators';
import {JhiEventManager} from '../../../../services/event-manager.service';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../../../services/logger.service';

@Component({
  selector: 'app-applicant-experience-item',
  templateUrl: './applicant-experience-item.component.html',
})
export class ApplicantExperienceItemComponent {
  @Input() experience: AtApplicantsExperience;
  isCollapsed = true;

  constructor(private service: AtApplicantsExperienceService,
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
        const id = this.experience.id;
        this.deleteExperience(id);
      }
    });
  }

  private deleteExperience(id: number) {
    this.service.delete(id).subscribe(() => {
      this.eventManager.broadcast({name: 'atApplicantsExperienceListModification'});
      this.toastrService.success('Iskustvo uspješno izbrisano');
    }, (error) => this.logger.onError(error));
  }


}
