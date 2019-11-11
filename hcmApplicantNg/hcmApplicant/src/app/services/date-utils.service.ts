import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class JhiDateUtils {

  private pattern = 'yyyy-MM-dd';

  private datePipe: DatePipe;

  constructor() {
    this.datePipe = new DatePipe('en');
  }

  /**
   * Method to convert the date time from server into JS date object
   */
  convertDateTimeFromServer(date: any) {
    if (date) {
      return new Date(date);
    } else {
      return null;
    }
  }

  /**
   * Method to convert the date from server into JS date object
   */
  convertLocalDateFromServer(date: any) {
    if (date) {
      const dateString = date.split('-');
      return new Date(dateString[0], dateString[1] - 1, dateString[2]);
    }
    return null;
  }

  /**
   * Method to convert the JS date object into specified date pattern
   */
  convertLocalDateToServer(date: any, pattern = this.pattern) {
    if (date) {
      if (!this.isDateAlreadyInGoodFormat(date)) {
        if (date instanceof Date) {
          return this.datePipe.transform(date, pattern);
        }
        const newDate = new Date(date.year, date.month - 1, date.day);
        return this.datePipe.transform(newDate, pattern);
      } else {
        return date;
      }
      }
    } else {
      return null;
    }
  }

  private isDateAlreadyInGoodFormat(date: any) {
    if (date) {
      return date[4] === '-' && date[7] === '-';
    }
    return false;
  }

  /**
   * Method to get the default date pattern
   */
  dateformat() {
    return this.pattern;
  }

  // TODO Change this method when moving from datetime-local input to NgbDatePicker
  toDate(date: any): Date {
    if (date === undefined || date === null) {
      return null;
    }
    return new Date(date);
  }
}
