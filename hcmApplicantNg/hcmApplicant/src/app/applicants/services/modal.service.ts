import {Component, Injectable} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Injectable()
export class ModalService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private ngbModalService: NgbModal,
        private router: Router
    ) {
    }

    open(component: Component, options = {}, properties?: { name: string, value: any }[]): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            setTimeout(() => {
                this.ngbModalRef = this.createModalRef(component, options, properties);
                resolve(this.ngbModalRef);
            }, 0);
        });
    }

    createModalRef(component: Component, options = {}, properties?: { name: string, value: any }[]): NgbModalRef {
        const modalRef = this.ngbModalService.open(component, {size: 'sm', backdrop: 'static', ...options});
        if (properties && properties.length > 0) {
            properties.forEach((property) => {
                modalRef.componentInstance[property.name] = property.value;
            });
        }
        modalRef.result.then(
            (result) => {
                this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
                this.ngbModalRef = null;
            },
            (reason) => {
                this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
                this.ngbModalRef = null;
            },
        );
        return modalRef;
    }

}
