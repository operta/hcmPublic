import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {GenericModalComponent} from '../../components/generic-modal/generic-modal.component';

@Component({
    selector: 'app-add-accomplishment',
    templateUrl: './add-accomplishment.component.html',
})
export class AddAccomplishmentComponent implements OnInit {
    @ViewChild('modal',  {static: true}) modal: GenericModalComponent;

    constructor() {
    }

    ngOnInit() {
    }

}

@Component({
    template: ''
})
export class AddAccomplishmentPopupComponent {

    constructor(
        private modalService: ModalService,
    ) {

        this.modalService.open(
            AddAccomplishmentComponent as Component,
            {size: 'lg'}
        );
    }
}
