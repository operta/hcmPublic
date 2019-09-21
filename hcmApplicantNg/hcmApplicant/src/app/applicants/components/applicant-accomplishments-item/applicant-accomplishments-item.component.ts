import {Component, Input} from '@angular/core';
import {AtApplicantAcc} from '../../models/applicant-accomplishment.model';
import {JhiEventManager} from '../../../services/event-manager.service';
import {LoggerService} from '../../../services/logger.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {AtApplicantAccService} from '../../services/applicant-accomplishments.service';

@Component({
  selector: 'app-applicant-accomplishments-item',
  templateUrl: './applicant-accomplishments-item.component.html',
})
export class ApplicantAccomplishmentsItemComponent {

  @Input() accomplishment: AtApplicantAcc;

  constructor(private service: AtApplicantAccService,
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
        const id = this.accomplishment.id;
        this.deleteAcc(id);
      }
    });
  }

  private deleteAcc(id: number) {
    this.service.delete(id).subscribe(() => {
      this.eventManager.broadcast({name: 'atApplicantAccListModification'});
      this.toastrService.success('Postignuće uspješno izbrisano');
    }, (error) => this.logger.onError(error));
  }

}
