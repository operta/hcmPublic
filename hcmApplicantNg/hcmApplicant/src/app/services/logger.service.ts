import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class LoggerService {
  constructor(private toastrService: ToastrService) {
  }

  onError(error) {
    if (error && error.status) {
      console.error('error.http.' + error.status);
    } else {
      console.error('error.' + error);
    }
    this.toastrService.error('Dogodila se greška');
  }

}
