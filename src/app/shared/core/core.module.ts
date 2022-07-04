import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "../../Services/token.interceptor";
import {AuthService} from "../../Services/auth.service";
import {AuthGuard} from "../../Guards/auth-guard";
import {CalendarService} from "../../Services/calendar.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true },
    AuthService,
    AuthGuard,
    CalendarService
  ]
})
export class CoreModule { }
