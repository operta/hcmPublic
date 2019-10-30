import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AtApplicantsContacts} from '../models/applicant-contact.model';
import {Injectable} from '@angular/core';

@Injectable()
export class AtApplicantsContactsService {

  private resourceUrl =  SERVER_API_URL + 'api/at-applicants-contacts';

  constructor(private http: HttpClient) { }

  create(atApplicantsContacts: AtApplicantsContacts): Observable<AtApplicantsContacts> {
    const copy = Object.assign({}, atApplicantsContacts);
    return this.http.post<AtApplicantsContacts>(this.resourceUrl, copy);
  }


  findByApplicantId(id: number): Observable<AtApplicantsContacts[]> {
    return this.http.get<AtApplicantsContacts[]>(`${this.resourceUrl}/applicant/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

}
