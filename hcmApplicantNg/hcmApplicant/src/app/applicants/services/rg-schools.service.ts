import {SERVER_API_URL} from '../../../environments/constants';
import {AtApplicantAcc} from '../models/applicant-accomplishment.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RgSchools} from '../models/rg-schools.model';

@Injectable()
export class RgSchoolsService {

    private resourceUrl = SERVER_API_URL + 'api/rg-schools';

    constructor(private http: HttpClient) {
    }

    create(rgSchool: RgSchools): Observable<RgSchools> {
        const copy = Object.assign({}, rgSchool);
        return this.http.post<RgSchools>(this.resourceUrl, copy);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}
