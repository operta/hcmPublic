import {Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {LoginService} from '../../../../services/login.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.css'],
    animations: [
        trigger('slideIn', [
            transition(':enter', [
                style({transform: 'translateX(-100%)'}),
                animate('200ms ease-in', style({transform: 'translateX(0%)'}))
            ])
        ])
    ]
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('sidebar', {static: false}) sidebar: ElementRef;

    userId: number;
    username: string;
    screenWidth: number;
    isSideBarOpened: boolean;

    private unsubscribe$: Subject<any> = new Subject<any>();

    constructor(
        private loginService: LoginService,
        private router: Router,
        private localStorage: LocalStorageService,
    ) {

    }

    ngOnInit() {
        console.log('init')
        this.userId = this.localStorage.retrieve('userId');
        this.username = this.localStorage.retrieve('username');
        if (this.username) {
            this.username = this.username.toUpperCase();
        }
        this.screenWidth = (window.screen.width);
        this.isSideBarOpened = this.isDeviceLargerThanTablet();
    }

    ngOnChanges() {
        console.log('changes')
        this.userId = this.localStorage.retrieve('userId');
        this.username = this.localStorage.retrieve('username');
        if (this.username) {
            this.username = this.username.toUpperCase();
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    private isDeviceLargerThanTablet() {
        return this.screenWidth >= 768;
    }

    collapseMenuIfOnPhone() {
        if (!this.isDeviceLargerThanTablet()) {
            this.toggleLeftSidebarMenu();
        }
    }

    expandContentIfNotOnPhone() {
        if (this.isDeviceLargerThanTablet()) {
            const whiteBox = document.getElementsByClassName('white-box') as HTMLCollectionOf<HTMLElement>;
            if (whiteBox.length !== 0) {
                whiteBox[0].style.transition = 'margin 400ms';
                if (document.dir === 'rtl') {
                    if (this.isSideBarOpened) {
                        whiteBox[0].style.marginRight = '0';
                    } else {
                        whiteBox[0].style.marginRight = '220px';
                    }
                } else {
                    if (this.isSideBarOpened) {
                        whiteBox[0].style.marginLeft = '0';
                    } else {
                        whiteBox[0].style.marginLeft = '220px';
                    }
                }
                this.isSideBarOpened = !this.isSideBarOpened;
            }
        }
    }


    toggleLeftSidebarMenu() {
        this.sidebar.nativeElement.classList.toggle('active');
        this.expandContentIfNotOnPhone();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/login']);
    }

}
