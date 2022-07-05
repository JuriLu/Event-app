import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {AuthGuard} from "../../Guards/auth-guard";
import {AuthService} from "../../Services/auth.service";
import {CommonModule} from '@angular/common';
import {CalendarService} from "../../Services/calendar.service";
import {TokenInterceptor} from "../../Services/token.interceptor";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthService,
    AuthGuard,
    CalendarService
  ]
})
export class CoreModule {
}
