import {Component, Input, OnInit} from '@angular/core';
import {AtApplicants} from '../../../models/applicant.model';

@Component({
  selector: 'app-applicant-personal-info',
  templateUrl: './applicant-personal-info.component.html'
})
export class ApplicantPersonalInfoComponent implements OnInit {
  @Input() applicant: AtApplicants;

  constructor() { }

  ngOnInit() {
  }

}
