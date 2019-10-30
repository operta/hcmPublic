import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {AtApplicantsDocuments} from '../models/applicant-document.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AtApplicantsDocumentsService {

  private resourceUrl = SERVER_API_URL + 'api/at-applicants-documents';

  constructor(private http: HttpClient) {
  }

  create(atApplicantsDocuments: AtApplicantsDocuments): Observable<AtApplicantsDocuments> {
    const copy = Object.assign({}, atApplicantsDocuments);
    return this.http.post<AtApplicantsDocuments>(this.resourceUrl, copy);
  }


  findByApplicantId(id: number): Observable<AtApplicantsDocuments[]> {
    return this.http.get<AtApplicantsDocuments[]>(`${this.resourceUrl}/applicant/${id}`);

  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

}
