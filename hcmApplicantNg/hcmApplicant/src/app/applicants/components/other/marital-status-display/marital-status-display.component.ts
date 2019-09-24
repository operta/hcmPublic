import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-marital-status-display',
  templateUrl: './marital-status-display.component.html',
})
export class MaritalStatusDisplayComponent implements OnInit {

  @Input() maritalStatus: string;
  @Input() gender: string;

  constructor() { }

  ngOnInit() {
  }

}
