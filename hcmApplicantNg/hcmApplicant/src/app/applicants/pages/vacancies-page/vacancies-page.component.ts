import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AtVacancies} from '../../models/vacancy.model';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-vacancies-page',
  templateUrl: './vacancies-page.component.html'
})
export class VacanciesPageComponent implements OnInit {
  vacancies$: Observable<AtVacancies[]>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.vacancies$ = of(this.activatedRoute.snapshot.data.vacancies);
  }

  ngOnInit() {
  }

}
