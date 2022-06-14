import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import timeGridPlugin from '@fullcalendar/timeGrid';
import { CalendarGridComponent } from './calendar-grid/calendar-grid.component';

import { HeaderComponent } from './header/header.component';
import { Error404Component } from './error404/error404.component';
import { FooterComponent } from './footer/footer.component'
import {AuthService} from "./Services/auth.service";
import {AuthGuard} from "./Guards/auth-guard";
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { LostPasswordComponent } from './Auth/lost-password/lost-password.component';
import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {TokenInterceptor} from "./Services/token.interceptor";


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarGridComponent,
    HeaderComponent,
    Error404Component,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    LostPasswordComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleCredentials.clientId
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true },
    AuthService,
    AuthGuard,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
