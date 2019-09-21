import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {AtApplicantsDocuments} from '../models/applicant-document.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AtApplicantsDocumentsService {

  private resourceUrl = SERVER_API_URL + 'hcmcoremicroservice/api/at-applicants-documents';

  constructor(private http: HttpClient) {
  }

  // create(atApplicantsDocuments: AtApplicantsDocuments): Observable<AtApplicantsDocuments> {
  //   const copy = this.convert(atApplicantsDocuments);
  //   return this.http.post<AtApplicantsDocuments>(this.resourceUrl, copy)
  //     .map((item) => this.convertItemFromServer(item));
  // }
  //

  findByApplicantId(id: number): Observable<AtApplicantsDocuments[]> {
    return this.http.get<AtApplicantsDocuments[]>(`${this.resourceUrl}/applicant/${id}`);

  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  // private convertResponse(res: HttpResponse<AtApplicantsDocuments[]>): ResponseWrapper {
  //   const jsonResponse: AtApplicantsDocuments[] = res.body;
  //   const body: AtApplicantsDocuments[] = [];
  //   for (let i = 0; i < jsonResponse.length; i++) {
  //     body.push(this.convertItemFromServer(jsonResponse[i]));
  //   }
  //   return new ResponseWrapper(res.headers, body, res.status);
  // }
  //
  // /**
  //  * Convert a returned JSON object to AtApplicantsDocuments.
  //  */
  // private convertItemFromServer(json: any): AtApplicantsDocuments {
  //   const entity: AtApplicantsDocuments = Object.assign(new AtApplicantsDocuments(), json);
  //   entity.dateCreated = this.dateUtils
  //     .convertLocalDateFromServer(json.dateCreated);
  //   entity.validFrom = this.dateUtils
  //     .convertLocalDateFromServer(json.validFrom);
  //   entity.validTo = this.dateUtils
  //     .convertLocalDateFromServer(json.validTo);
  //   return entity;
  // }
  //
  // /**
  //  * Convert a AtApplicantsDocuments to a JSON which can be sent to the server.
  //  */
  // private convert(atApplicantsDocuments: AtApplicantsDocuments): AtApplicantsDocuments {
  //   const copy: AtApplicantsDocuments = Object.assign({}, atApplicantsDocuments);
  //   copy.dateCreated = this.dateUtils
  //     .convertLocalDateToServer(atApplicantsDocuments.dateCreated);
  //   copy.validFrom = this.dateUtils
  //     .convertLocalDateToServer(atApplicantsDocuments.validFrom);
  //   copy.validTo = this.dateUtils
  //     .convertLocalDateToServer(atApplicantsDocuments.validTo);
  //   return copy;
  // }
}
