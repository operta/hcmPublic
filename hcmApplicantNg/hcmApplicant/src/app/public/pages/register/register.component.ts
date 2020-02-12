import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {RegisterService} from '../../../services/register.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    isRegisteringWithEmail = false;


    constructor(
        private route: ActivatedRoute,
        private registerService: RegisterService,
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {
        this.isRegisteringWithEmail = this.route.snapshot.data.email;
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
    }

    ngAfterViewInit() {
        this.renderer.selectRootElement(this.elementRef.nativeElement.querySelector('#login')).focus();
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            if (!this.isRegisteringWithEmail) {
                this.registerService.save(this.registerAccount)
                    .subscribe((result) => {
                        this.success = true;
                    }, (response) => this.processError(response));
            } else {
                this.registerService.saveWithExistingApplicantAccount(this.registerAccount)
                    .subscribe((result) => {
                        this.success = true;
                    }, (response) => this.processError(response));
            }

        }
    }

    private processError(response) {
        this.success = null;
        if (response.status === 400 && response.error.type === 'http://www.jhipster.tech/problem/login-already-used') {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === 'http://www.jhipster.tech/problem/email-already-used') {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }

}
