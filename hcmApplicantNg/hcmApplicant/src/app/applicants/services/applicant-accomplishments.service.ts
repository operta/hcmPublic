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

  // create(atApplicantAcc: AtApplicantAcc): Observable<AtApplicantAcc> {
  //   const copy = this.convert(atApplicantAcc);
  //   return this.http.post<AtApplicantAcc>(this.resourceUrl, copy)
  //     .map((item) => this.convertItemFromServer(item));
  // }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  // private convertResponse(res: HttpResponse<AtApplicantAcc[]>): ResponseWrapper {
  //   const jsonResponse: AtApplicantAcc[] = res.body;
  //   const body: AtApplicantAcc[] = [];
  //   for (let i = 0; i < jsonResponse.length; i++) {
  //     body.push(this.convertItemFromServer(jsonResponse[i]));
  //   }
  //   return new ResponseWrapper(res.headers, body, res.status);
  // }
  //
  // /**
  //  * Convert a returned JSON object to AtApplicantAcc.
  //  */
  // private convertItemFromServer(json: any): AtApplicantAcc {
  //   const entity: AtApplicantAcc = Object.assign(new AtApplicantAcc(), json);
  //   entity.dateFrom = this.dateUtils
  //     .convertLocalDateFromServer(json.dateFrom);
  //   entity.dateTo = this.dateUtils
  //     .convertLocalDateFromServer(json.dateTo);
  //   return entity;
  // }
  //
  // /**
  //  * Convert a AtApplicantAcc to a JSON which can be sent to the server.
  //  */
  // private convert(atApplicantAcc: AtApplicantAcc): AtApplicantAcc {
  //   const copy: AtApplicantAcc = Object.assign({}, atApplicantAcc);
  //   copy.dateFrom = this.dateUtils
  //     .convertLocalDateToServer(atApplicantAcc.dateFrom);
  //   copy.dateTo = this.dateUtils
  //     .convertLocalDateToServer(atApplicantAcc.dateTo);
  //   return copy;
  // }
}
