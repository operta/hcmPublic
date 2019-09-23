import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './public/pages/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {InterceptorsModule} from './interceptors/interceptors.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-'}),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    AppRoutingModule,
    InterceptorsModule.forRoot(),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
