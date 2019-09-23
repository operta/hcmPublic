import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../../environments/constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AtVacancies} from '../models/vacancy.model';
import {tap} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class VacancyService {
  private _loadedVacancies: AtVacancies[];
  private userId: number;
  private resourceUrl = SERVER_API_URL + 'hcmcoremicroservice/api/at-vacancies';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.userId = +this.localStorage.retrieve('userId');
  }

  get loadedVacancies(): AtVacancies[] {
    return this._loadedVacancies;
  }

  getVacanciesVisibleToApplicant(): Observable<AtVacancies[]> {
    // TODO change when endpoint added
    // return this.http.get<AtVacancies[]>(`${this.resourceUrl}/applicants`);
    return this.http.get<AtVacancies[]>(`${this.resourceUrl}`)
      .pipe(tap(items => this._loadedVacancies = items));
  }

  getVacanciesWhereApplicantApplied(): Observable<AtVacancies[]> {
    // TODO change when endpoint added
    // return this.http.get<AtVacancies[]>(`${this.resourceUrl}/job-applications/user/${this.userId}`)
    return this.http.get<AtVacancies[]>(`${this.resourceUrl}`)
        .pipe(tap(items => this._loadedVacancies = items));
  }
}
