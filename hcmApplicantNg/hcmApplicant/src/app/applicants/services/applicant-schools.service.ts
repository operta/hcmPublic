import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AtApplicantsSchools} from '../models/applicant-school.model';

@Injectable()
export class AtApplicantsSchoolsService {

  private resourceUrl = SERVER_API_URL + 'hcmcoremicroservice/api/at-applicants-schools';

  constructor(private http: HttpClient) {
  }

  // create(atApplicantsSchools: AtApplicantsSchools): Observable<AtApplicantsSchools> {
  //   const copy = this.convert(atApplicantsSchools);
  //   return this.http.post<AtApplicantsSchools>(this.resourceUrl, copy)
  //     .map((item) => this.convertItemFromServer(item));
  // }
  //
  //
  findByApplicantId(id: number): Observable<AtApplicantsSchools[]> {
    return this.http.get<AtApplicantsSchools[]>(`${this.resourceUrl}/applicant/${id}`);
  }

  //
  //
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  // private convertResponse(res: HttpResponse<AtApplicantsSchools[]>): ResponseWrapper {
  //   const jsonResponse: AtApplicantsSchools[] = res.body;
  //   const body: AtApplicantsSchools[] = [];
  //   for (let i = 0; i < jsonResponse.length; i++) {
  //     body.push(this.convertItemFromServer(jsonResponse[i]));
  //   }
  //   return new ResponseWrapper(res.headers, body, res.status);
  // }
  //
  // /**
  //  * Convert a returned JSON object to AtApplicantsSchools.
  //  */
  // private convertItemFromServer(json: any): AtApplicantsSchools {
  //   const entity: AtApplicantsSchools = Object.assign(new AtApplicantsSchools(), json);
  //   entity.dateFrom = this.dateUtils
  //     .convertLocalDateFromServer(json.dateFrom);
  //   entity.dateTo = this.dateUtils
  //     .convertLocalDateFromServer(json.dateTo);
  //   return entity;
  // }
  //
  // /**
  //  * Convert a AtApplicantsSchools to a JSON which can be sent to the server.
  //  */
  // private convert(atApplicantsSchools: AtApplicantsSchools): AtApplicantsSchools {
  //   const copy: AtApplicantsSchools = Object.assign({}, atApplicantsSchools);
  //   copy.dateFrom = this.dateUtils
  //     .convertLocalDateToServer(atApplicantsSchools.dateFrom);
  //   copy.dateTo = this.dateUtils
  //     .convertLocalDateToServer(atApplicantsSchools.dateTo);
  //   return copy;
  // }
}
