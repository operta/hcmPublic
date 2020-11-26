import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AtApplicantsSchools} from '../models/applicant-school.model';

@Injectable()
export class AtApplicantsSchoolsService {

    private resourceUrl = SERVER_API_URL + 'api/at-applicants-schools';

    constructor(private http: HttpClient) {
    }

    create(atApplicantsSchools: AtApplicantsSchools): Observable<AtApplicantsSchools> {
        const copy = Object.assign({}, atApplicantsSchools);
        return this.http.post<AtApplicantsSchools>(this.resourceUrl, copy);
    }

    createNewSchool(name: string): Observable<any> {
        return this.http.post(SERVER_API_URL + 'api/rg-schools', {name: name});
    }

    findByApplicantId(id: number): Observable<AtApplicantsSchools[]> {
        return this.http.get<AtApplicantsSchools[]>(`${this.resourceUrl}/applicant/${id}`);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

}
