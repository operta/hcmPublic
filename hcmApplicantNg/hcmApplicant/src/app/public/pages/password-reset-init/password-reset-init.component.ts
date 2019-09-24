import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {PasswordResetInitService} from '../../../services/password-reset-init.service';

@Component({
  selector: 'app-password-reset-init',
  templateUrl: './password-reset-init.component.html',
})
export class PasswordResetInitComponent implements OnInit, AfterViewInit {
  error: string;
  errorEmailNotExists: string;
  resetAccount: any;
  success: string;

  constructor(
      private passwordResetInitService: PasswordResetInitService,
      private elementRef: ElementRef,
      private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.resetAccount = {};
  }

  ngAfterViewInit() {
    this.renderer.selectRootElement(this.elementRef.nativeElement.querySelector('#email')).focus();
  }

  requestReset() {
    this.error = null;
    this.errorEmailNotExists = null;

    this.passwordResetInitService.save(this.resetAccount.email).subscribe(() => {
      this.success = 'OK';
    }, (response) => {
      this.success = null;
      if (response.status === 400 && response.error.type === 'http://www.jhipster.tech/problem/email-already-used') {
        this.errorEmailNotExists = 'ERROR';
      } else {
        this.error = 'ERROR';
      }
    });
  }
}
