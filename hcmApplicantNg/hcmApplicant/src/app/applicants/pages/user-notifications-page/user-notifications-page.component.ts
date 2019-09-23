import {Component, OnInit} from '@angular/core';
import {UserNotificationsService} from '../../services/user-notifications.service';
import {Observable} from 'rxjs';
import {UserNotifications} from '../../models/user-notifications.model';
import {Router} from '@angular/router';
import {LoggerService} from '../../../services/logger.service';

@Component({
    selector: 'app-user-notifications-page',
    templateUrl: './user-notifications-page.component.html',
})
export class UserNotificationsPageComponent implements OnInit {
    userNotifications$: Observable<UserNotifications[]>;

    constructor(private service: UserNotificationsService,
                private logger: LoggerService,
                private router: Router) {
    }

    ngOnInit() {
        this.loadNotifications();
    }

    private loadNotifications() {
        this.userNotifications$ = this.service.findByUser({sort: ['createdAt,desc']});
    }

    onRead(item: UserNotifications) {
        item.is_read = 'T';
        this.service.update(item).subscribe(
            () => this.loadNotifications(),
            (error) => this.logger.onError(error)
        );
    }

    navigate(url: string) {
        this.router.navigateByUrl(url);
    }



}
