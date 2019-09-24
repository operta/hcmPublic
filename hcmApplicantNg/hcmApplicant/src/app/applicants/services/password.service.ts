import {SERVER_API_URL} from '../../../environments/constants';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PasswordService {

    constructor(private http: HttpClient) {}

    save(newPassword: string): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/account/change-password', newPassword);
    }
}
