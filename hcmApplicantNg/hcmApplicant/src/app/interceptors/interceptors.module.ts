import {Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JhiEventManager} from '../services/event-manager.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {NotificationInterceptor} from './notification.interceptor';
import {ErrorHandlerInterceptor} from './error-handler.interceptor';
import {AuthInterceptor} from './auth.interceptor';

@NgModule({})
export class InterceptorsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InterceptorsModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
          deps: [
            LocalStorageService,
            SessionStorageService
          ]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true,
          deps: [
            JhiEventManager
          ]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NotificationInterceptor,
          multi: true,
          deps: [
            Injector
          ]
        }
      ]
    };


  }

}
