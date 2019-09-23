import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {AddAccomplishmentComponent} from '../add-accomplishment/add-accomplishment.component';
import {GenericModalComponent} from '../../components/generic-modal/generic-modal.component';

@Component({
  selector: 'app-edit-applicant',
  templateUrl: './edit-applicant.component.html',
  styles: []
})
export class EditApplicantComponent implements OnInit {
  @ViewChild('modal',  {static: true}) modal: GenericModalComponent;

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  template: ''
})
export class EditApplicantPopupComponent {

  constructor(
      private modalService: ModalService,
  ) {

    this.modalService.open(
        EditApplicantComponent as Component,
        {size: 'lg'}
    );
  }
}
