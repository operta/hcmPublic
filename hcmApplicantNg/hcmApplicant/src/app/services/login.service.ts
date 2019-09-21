import {AuthServerProvider} from './auth-jtw.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Principal} from './principal.service';
import {Injectable, OnDestroy} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoginService implements OnDestroy {
  intervalId: any;

  constructor(
    private principal: Principal,
    private localStorage: LocalStorageService,
    private authServerProvider: AuthServerProvider
  ) {
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  login(credentials, callback?) {
    const cb = callback || function () {
    };

    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe((data) => {
        this.principal.identity(true).then((account) => {
          this.localStorage.store('userId', account.id);
          console.log(account);
          this.localStorage.store('username', account.login);
          resolve(data);
        });
        return cb();
      }, (err) => {
        this.logout();
        reject(err);
        return cb(err);
      });
    });
  }

  logout() {
    this.localStorage.clear();
    this.authServerProvider.logout().subscribe();
    this.principal.authenticate(null);
  }
}
