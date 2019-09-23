import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GenericModalComponent} from '../../components/generic-modal/generic-modal.component';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html'
})
export class AddExperienceComponent implements OnInit {
  @ViewChild('modal', {static: true}) modal: GenericModalComponent;

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  template: ''
})
export class AddExperiencePopupComponent {

  constructor(
      private modalService: ModalService,
  ) {

    this.modalService.open(
        AddExperienceComponent as Component,
        {size: 'lg'}
    );
  }
}
