import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../environments/constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PasswordResetInitService {

    constructor(private http: HttpClient) {}

    save(mail: string): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/account/reset-password/init', mail);
    }
}
