import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../../environments/constants';
import {AtJobApplications} from '../models/job-applications.model';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class AtJobApplicationsService {

  private userId: number;

  private resourceUrl =  SERVER_API_URL + 'api/at-job-applications';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.userId = +this.localStorage.retrieve('userId');
  }

  addJobApplication(vacancyId: number): Observable<AtJobApplications> {
    return this.http.post<AtJobApplications>(`${this.resourceUrl}/vacancy/${vacancyId}/user/${this.userId}`, null);
  }

  findByUser(): Observable<AtJobApplications[]> {
    return this.http.get<AtJobApplications[]>(`${this.resourceUrl}/user/${this.userId}`);
  }

  checkIfApplicantApplied(vacancyId?: number): Observable<any> {
    return this.http.get<any>(`${this.resourceUrl}/vacancy/${vacancyId}/user/${this.userId}`);
  }


}
