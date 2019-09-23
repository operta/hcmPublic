import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {UserNotifications} from '../../models/user-notifications.model';
import {map} from 'rxjs/operators';
import {UserNotificationsService} from '../../services/user-notifications.service';
import {Observable} from 'rxjs';
import {LoggerService} from '../../../services/logger.service';

@Component({
    /* tslint:disable-next-line */
    selector: '[jhiNotifications]',
    templateUrl: './notifications-preview.component.html',
    styleUrls: ['./notifications-preview.component.css']
})
export class NotificationsPreviewComponent implements OnInit {

    userNotifications$: Observable<UserNotifications[]>;


    constructor(private localStorage: LocalStorageService,
                private logger: LoggerService,
                private service: UserNotificationsService) {
    }

    ngOnInit(): void {
        this.loadNotifications();
    }


    private loadNotifications() {
        this.userNotifications$ = this.service.findByUser()
            .pipe(
                map((userNotifications: UserNotifications[]) => userNotifications.filter((item) => item.is_read === 'F')),
            );
    }

    didRead(notification: UserNotifications) {
        notification.is_read = 'T';
        this.service.update(notification).subscribe(
            () => this.loadNotifications(),
            (error) => this.logger.onError(error)
        );
    }


}
