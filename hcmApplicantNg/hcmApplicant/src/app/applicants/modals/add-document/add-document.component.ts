import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {AddAccomplishmentComponent} from '../add-accomplishment/add-accomplishment.component';
import {GenericModalComponent} from '../../components/generic-modal/generic-modal.component';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styles: []
})
export class AddDocumentComponent implements OnInit {
  @ViewChild('modal',  {static: true}) modal: GenericModalComponent;

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  template: ''
})
export class AddDocumentPopupComponent {

  constructor(
      private modalService: ModalService,
  ) {

    this.modalService.open(
        AddDocumentComponent as Component,
        {size: 'lg'}
    );
  }
}

