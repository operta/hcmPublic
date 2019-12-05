import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent  {

  constructor(router: Router) {
    router.navigate(['/dashboard/vacancies']);
  }


}
