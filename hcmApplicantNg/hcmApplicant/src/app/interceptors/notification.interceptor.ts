import {ToastrService} from 'ngx-toastr';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class NotificationInterceptor implements HttpInterceptor {

  private toastrService: ToastrService;

  // tslint:disable-next-line: no-unused-variable
  constructor(private injector: Injector) {
    setTimeout(() => this.toastrService = injector.get(ToastrService));
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const arr = event.headers.keys();
        let alert = null;
        let params = null;
        arr.forEach((entry) => {
          if (entry.endsWith('app-alert')) {
            alert = event.headers.get(entry);
          }
          if (entry.endsWith('app-params')) {
            params = event.headers.get(entry);
          }
        });
        if (alert) {
          if (typeof alert === 'string') {
              this.toastrService.success(alert);
          }
        }
      }
    }, (err: any) => {
    }));
  }
}
