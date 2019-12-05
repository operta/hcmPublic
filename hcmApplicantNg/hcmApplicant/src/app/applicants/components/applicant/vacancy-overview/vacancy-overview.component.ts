import {Component, Input} from '@angular/core';
import {AtVacancies} from '../../../models/vacancy.model';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
    selector: 'app-vacancy-overview',
    templateUrl: './vacancy-overview.component.html',
})
export class VacancyOverviewComponent {
    @Input() vacancy: AtVacancies;

    constructor(private router: Router, private localStorage: LocalStorageService) {
    }

    navigateToDetail() {
        const userId = +this.localStorage.retrieve('userId');
        if (userId && userId !== 0) {
            this.router.navigate(['/dashboard/vacancy-detail/' + this.vacancy.id]).catch(() => this.router.navigate(['/404']));
        } else {
            this.router.navigate(['/dashboard/vacancy-detail-no-auth/' + this.vacancy.id]);
        }
    }

}
