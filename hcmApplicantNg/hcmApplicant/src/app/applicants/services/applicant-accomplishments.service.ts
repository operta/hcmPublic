import {SERVER_API_URL} from '../../../environments/constants';
import {AtApplicantAcc} from '../models/applicant-accomplishment.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AtApplicantAccService {

  private resourceUrl = SERVER_API_URL + 'hcmcoremicroservice/api/at-applicant-accs';

  constructor(private http: HttpClient) {
  }

  findByApplicantId(id: number): Observable<AtApplicantAcc[]> {
    return this.http.get<AtApplicantAcc[]>(`${this.resourceUrl}/applicant/${id}`);
  }

  create(atApplicantAcc: AtApplicantAcc): Observable<AtApplicantAcc> {
    const copy = Object.assign({}, atApplicantAcc);
    return this.http.post<AtApplicantAcc>(this.resourceUrl, copy);
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

}
