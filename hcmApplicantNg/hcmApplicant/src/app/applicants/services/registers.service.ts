import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../../environments/constants';
import {Observable} from 'rxjs';

@Injectable()
export class RegistersService {
    private resourceUrl = SERVER_API_URL + 'hcmcoremicroservice/api';

    constructor(private http: HttpClient) {
    }

    getContactTypes(): Observable<any> {
        return this.http.get(`${this.resourceUrl}/rg-contact-types`);
    }

    getSchools(): Observable<any> {
        return this.http.get(`${this.resourceUrl}/rg-schools`);
    }

    getQualifications(): Observable<any> {
        return this.http.get(`${this.resourceUrl}/rg-qualifications`);
    }
}