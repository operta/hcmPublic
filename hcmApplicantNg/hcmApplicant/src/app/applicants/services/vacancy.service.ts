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
  private resourceUrl = SERVER_API_URL + 'api/at-vacancies';
  private _vacancyOnWhichUserIsApplying: string;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    this.userId = +this.localStorage.retrieve('userId');
  }

  get loadedVacancies(): AtVacancies[] {
    return this._loadedVacancies;
  }

  get vacancyOnWhichUserIsApplying(): string {
    return this._vacancyOnWhichUserIsApplying;
  }

  set vacancyOnWhichUserIsApplying(name: string) {
    this._vacancyOnWhichUserIsApplying = name;
  }

  getVacanciesVisibleToApplicant(): Observable<AtVacancies[]> {
    return this.http.get<AtVacancies[]>(`${this.resourceUrl}/applicants`)
      .pipe(tap(items => this._loadedVacancies = items));
  }

  getVacanciesWhereApplicantApplied(): Observable<AtVacancies[]> {
    return this.http.get<AtVacancies[]>(`${this.resourceUrl}/job-applications/user/${this.userId}`)
        .pipe(tap(items => this._loadedVacancies = items));
  }
}
