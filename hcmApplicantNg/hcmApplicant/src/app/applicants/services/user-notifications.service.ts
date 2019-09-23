import {UserNotifications} from '../models/user-notifications.model';
import {Observable} from 'rxjs';
import {createRequestOption} from '../../services/request-util';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../../environments/constants';
import {Injectable} from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class UserNotificationsService {
    private resourceUrl = SERVER_API_URL + 'hcmcoremicroservice/api/user-notifications';
    private userId: number;

    constructor(private http: HttpClient, private localStorage: LocalStorageService) {
        this.userId = +this.localStorage.retrieve('userId');
    }

    update(userNotifications: UserNotifications): Observable<UserNotifications> {
        return this.http.put<UserNotifications>(this.resourceUrl, userNotifications);
    }


    findByUser(req?: any): Observable<UserNotifications[]> {
        const options = createRequestOption(req);
        return this.http.get<UserNotifications[]>(`${this.resourceUrl}/user/${this.userId}`, {params: options});
    }

}
