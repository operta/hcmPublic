import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AtApplicantsExperience} from '../models/applicant-experience.model';

@Injectable()
export class AtApplicantsExperienceService {

  private resourceUrl =  SERVER_API_URL + 'hcmcoremicroservice/api/at-applicants-experiences';

  constructor(private http: HttpClient) { }

  // create(atApplicantsExperience: AtApplicantsExperience): Observable<AtApplicantsExperience> {
  //   const copy = this.convert(atApplicantsExperience);
  //   return this.http.post<AtApplicantsExperience>(this.resourceUrl, copy)
  //     .map((item) => this.convertItemFromServer(item));
  // }
  //

  findByApplicantId(id: number): Observable<AtApplicantsExperience[]> {
    return this.http.get<AtApplicantsExperience[]>(`${this.resourceUrl}/applicant/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }


  // private convertResponse(res: HttpResponse<AtApplicantsExperience[]>): ResponseWrapper {
  //   const jsonResponse: AtApplicantsExperience[] = res.body;
  //   const body: AtApplicantsExperience[] = [];
  //   for (let i = 0; i < jsonResponse.length; i++) {
  //     body.push(this.convertItemFromServer(jsonResponse[i]));
  //   }
  //   return new ResponseWrapper(res.headers, body, res.status);
  // }
  //
  // /**
  //  * Convert a returned JSON object to AtApplicantsExperience.
  //  */
  // private convertItemFromServer(json: any): AtApplicantsExperience {
  //   const entity: AtApplicantsExperience = Object.assign(new AtApplicantsExperience(), json);
  //   entity.dateFrom = this.dateUtils
  //     .convertLocalDateFromServer(json.dateFrom);
  //   entity.dateTo = this.dateUtils
  //     .convertLocalDateFromServer(json.dateTo);
  //   return entity;
  // }
  //
  // /**
  //  * Convert a AtApplicantsExperience to a JSON which can be sent to the server.
  //  */
  // private convert(atApplicantsExperience: AtApplicantsExperience): AtApplicantsExperience {
  //   const copy: AtApplicantsExperience = Object.assign({}, atApplicantsExperience);
  //   copy.dateFrom = this.dateUtils
  //     .convertLocalDateToServer(atApplicantsExperience.dateFrom);
  //   copy.dateTo = this.dateUtils
  //     .convertLocalDateToServer(atApplicantsExperience.dateTo);
  //   return copy;
  // }
}
