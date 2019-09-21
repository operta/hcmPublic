import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AtApplicantAcc} from '../../models/applicant-accomplishment.model';

@Component({
  selector: 'app-applicant-accomplishments-by-type',
  templateUrl: './applicant-accomplishments-by-type.component.html',
})
export class ApplicantAccomplishmentsByTypeComponent implements OnChanges {
  @Input() accomplishments: AtApplicantAcc[];
  @Input() type: string;

  filteredAccomplishments: AtApplicantAcc[] = [];
  isCollapsed = true;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterAccomplishmentsByType(this.type);
  }

  private filterAccomplishmentsByType(type: string) {
    // TODO unstable
    if (type == 'Certifications') {
      if (this.accomplishments) {
        this.filteredAccomplishments = this.accomplishments.filter((item) => item.idAccomplishmentTypeId == 1);
      }
    } else if (type == 'Courses') {
      if (this.accomplishments) {
        this.filteredAccomplishments = this.accomplishments.filter((item) => item.idAccomplishmentTypeId == 2);
      }
    } else if (type == 'HonorsandAwards') {
      if (this.accomplishments) {
        this.filteredAccomplishments = this.accomplishments.filter((item) => item.idAccomplishmentTypeId == 3);
      }
    } else if (type == 'Languages') {
      if (this.accomplishments) {
        this.filteredAccomplishments = this.accomplishments.filter((item) => item.idAccomplishmentTypeId == 4);
      }
    } else if (type == 'Projects') {
      if (this.accomplishments) {
        this.filteredAccomplishments = this.accomplishments.filter((item) => item.idAccomplishmentTypeId == 5);
      }
    } else if (type == 'Publications') {
      if (this.accomplishments) {
        this.filteredAccomplishments = this.accomplishments.filter((item) => item.idAccomplishmentTypeId == 6);
      }
    }
  }

}
