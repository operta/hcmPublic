import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AtApplicantsExperience} from '../models/applicant-experience.model';

@Injectable()
export class AtApplicantsExperienceService {

  private resourceUrl =  SERVER_API_URL + 'hcmcoremicroservice/api/at-applicants-experiences';

  constructor(private http: HttpClient) { }

   create(atApplicantsExperience: AtApplicantsExperience): Observable<AtApplicantsExperience> {
    const copy = Object.assign({}, atApplicantsExperience);
    return this.http.post<AtApplicantsExperience>(this.resourceUrl, copy);
  }


  findByApplicantId(id: number): Observable<AtApplicantsExperience[]> {
    return this.http.get<AtApplicantsExperience[]>(`${this.resourceUrl}/applicant/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

}
