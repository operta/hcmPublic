import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AtApplicants} from '../models/applicant.model';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class ApplicantsService {

  private resourceUrl = SERVER_API_URL + 'hcmcoremicroservice/api/at-applicants';

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService
              // private dateUtils: JhiDateUtils
  ) {
  }

  // create(atApplicants: AtApplicants): Observable<AtApplicants> {
  //   const copy = this.convert(atApplicants);
  //   return this.http.post<AtApplicants>(this.resourceUrl, copy)
  //     .map((item) => this.convertItemFromServer(item));
  // }
  //
  //

  update(applicant: AtApplicants): Observable<AtApplicants> {
    const copy: AtApplicants = Object.assign({}, applicant);
    return this.http.put<AtApplicants>(this.resourceUrl, copy);
  }

  findByUserId(): Observable<AtApplicants> {
    const userId = +this.localStorage.retrieve('userId');
    if (userId) {
      return this.http.get<AtApplicants>(this.resourceUrl + '/user/' + userId);
    } else {
      return of(null);
    }
  }

  // delete(id: number): Observable<any> {
  //   return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
  // }

  //
  // /**
  //  * Convert a returned JSON object to AtApplicants.
  //  */
  // private convertItemFromServer(json: any): AtApplicants {
  //   const entity: AtApplicants = Object.assign(new AtApplicants(), json);
  //   entity.birthdate = this.dateUtils
  //     .convertLocalDateFromServer(json.birthdate);
  //   return entity;
  // }
  //
  // /**
  //  * Convert a AtApplicants to a JSON which can be sent to the server.
  //  */
  // private convert(atApplicants: AtApplicants): AtApplicants {
  //   const copy: AtApplicants = Object.assign({}, atApplicants);
  //   copy.birthdate = this.dateUtils
  //     .convertLocalDateToServer(atApplicants.birthdate);
  //   return copy;
  // }
}
