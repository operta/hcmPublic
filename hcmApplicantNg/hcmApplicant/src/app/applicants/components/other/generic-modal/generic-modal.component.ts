import {Component, Input, OnDestroy} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
})
export class GenericModalComponent implements OnDestroy{
  @Input() title = 'Naslov';
  @Input() clearPopup = true;

  constructor(private activeModal: NgbActiveModal,
              private router: Router) {
  }

  onCloseDefault() {
    if(this.clearPopup) {
      this.onClose();
    } else {
      this.onClose();
      this.destroyPopup();
    }
  }

  onClose() {
    this.activeModal.dismiss('cancel');
  }

  ngOnDestroy(): void {
    if(this.clearPopup){
      this.destroyPopup();
    }
  }

  navigateAway(route: string) {
    this.router.navigate([route, { outlets: { popup: null } }])
    this.onClose();

  }



  destroyPopup() {
    setTimeout(() => {
      this.router.navigate([{ outlets: { popup: null } }])
          .then(() => window.history.back());
    }, 0);
  }

}
