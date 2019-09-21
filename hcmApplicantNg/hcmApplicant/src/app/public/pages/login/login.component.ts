import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {Principal} from '../../../services/principal.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  username: string;
  credentials: any;
  whiteBoxSwingOut = 'slide-in-right';


  constructor(
    private loginService: LoginService,
    private router: Router,
    private principal: Principal,
  ) {

    this.credentials = {};
  }

  login() {
    this.loginService.login({
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    }).then(() => {
      this.authenticationError = false;
      this.principal.identity().then((account) => {
        if (account) {
          this.router.navigate(['/dashboard']);
        } else {
          this.authenticationError = true;
        }
      });
    }).catch(() => {
      this.authenticationError = true;
    });
  }

  onCloseError() {
    this.authenticationError = !this.authenticationError;
  }

  register() {
    this.router.navigate(['/register']);
  }

  requestResetPassword() {
    // TODO
    this.router.navigate(['/reset', 'request']);
  }


}
