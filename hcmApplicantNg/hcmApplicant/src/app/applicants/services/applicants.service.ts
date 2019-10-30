import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AtApplicants} from '../models/applicant.model';
import {LocalStorageService} from 'ngx-webstorage';
import {tap} from 'rxjs/operators';

@Injectable()
export class ApplicantsService {

    private resourceUrl = SERVER_API_URL + 'api/at-applicants';

    constructor(private http: HttpClient,
                private localStorage: LocalStorageService
    ) {
    }

    create(applicant: AtApplicants): Observable<AtApplicants> {
        const copy: AtApplicants = Object.assign({}, applicant);
        return this.http.post<AtApplicants>(this.resourceUrl, copy);
    }

    update(applicant: AtApplicants): Observable<AtApplicants> {
        const copy: AtApplicants = Object.assign({}, applicant);
        return this.http.put<AtApplicants>(this.resourceUrl, copy);
    }

    findByUserId(): Observable<AtApplicants> {
        const userId = +this.localStorage.retrieve('userId');
        if (userId) {
            return this.http.get<AtApplicants>(this.resourceUrl + '/user/' + userId)
                .pipe(tap(item => this.localStorage.store('applicantId', item.id)));
        } else {
            return of(null);
        }
    }
}
