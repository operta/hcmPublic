import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../../environments/constants';
import {Observable} from 'rxjs';
import {createRequestOption} from '../../services/request-util';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class RegistersService {
    private resourceUrl = SERVER_API_URL + 'api';

    constructor(private http: HttpClient) {
    }

    getContactTypes(): Observable<any> {
        return this.http.get(`${this.resourceUrl}/rg-contact-types`);
    }

    getSchools(): Observable<any> {
        return this.http.get<any[]>(`${this.resourceUrl}/rg-schools`);
    }

    getQualifications(): Observable<any> {
        return this.http.get(`${this.resourceUrl}/rg-qualifications`);
    }

    getAccomplishmentTypes(): Observable<any> {
        return this.http.get(`${this.resourceUrl}/at-accomplishment-types`);
    }

    getRegions(): Observable<any> {
        const req = createRequestOption();
        return this.http.get(`${this.resourceUrl}/rg-regions`, {params: req});
    }
}
