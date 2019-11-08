import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AtApplicantsContacts} from '../models/applicant-contact.model';
import {ApplicantConstantsModel} from '../models/applicant-constants.model';


@Injectable()
export class ApplicantConstantsService {

    private resourceUrl = SERVER_API_URL + 'api/ap-constants';

    constructor(private http: HttpClient) {
    }

    findByKey(key: string): Observable<ApplicantConstantsModel> {
        return this.http.get<ApplicantConstantsModel>(this.resourceUrl + '/key/' + key);
    }
}
