import {Component, Input} from '@angular/core';
import {AtApplicantsContacts} from '../../../models/applicant-contact.model';
import {JhiEventManager} from '../../../../services/event-manager.service';
import {LoggerService} from '../../../../services/logger.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import {AtApplicantsContactsService} from '../../../services/applicant-contacts.service';

@Component({
  selector: 'app-applicant-contacts-item',
  templateUrl: './applicant-contacts-item.component.html',
})
export class ApplicantContactsItemComponent {
  @Input() contact: AtApplicantsContacts;

  constructor(private service: AtApplicantsContactsService,
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
        const id = this.contact.id;
        this.deleteContact(id);
      }
    });
  }

  private deleteContact(id: number) {
    this.service.delete(id).subscribe(() => {
      this.eventManager.broadcast({name: 'atApplicantsContactsListModification'});
      this.toastrService.success('Kontakt uspješno izbrisan');
    }, (error) => this.logger.onError(error));
  }

}
