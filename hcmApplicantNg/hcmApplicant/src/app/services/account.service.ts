import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../environments/constants';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AccountService {
    constructor(private http: HttpClient) {
    }

    get(): Observable<HttpResponse<Account>> {
        return this.http.get<Account>(SERVER_API_URL + 'api/account', {observe: 'response'});
    }

    save(account: any): Observable<HttpResponse<any>> {
        return this.http.post(SERVER_API_URL + 'api/account', account, {observe: 'response'});
    }

    activate(key: string): Observable<any> {
        let options: HttpParams = new HttpParams();
        options = options.append('key', key);
        return this.http.get(SERVER_API_URL + 'api/activate', {
            params: options
        });
    }

}

