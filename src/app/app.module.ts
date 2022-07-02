import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./shared/material/material.module";

import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin from '@fullcalendar/interaction';

import { AppComponent } from './app.component';
import { CalendarGridComponent } from './components/calendar-grid/calendar-grid.component';
import {EventDetailComponent} from "./components/event-detail/event-detail.component";
import { HeaderComponent } from './shared/header/header.component';
import { Error404Component } from './shared/error404/error404.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';


import {AuthService} from "./Services/auth.service";
import {AuthGuard} from "./Guards/auth-guard";
import {TokenInterceptor} from "./Services/token.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import { InformDialogComponent } from './shared/inform-dialog/inform-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';


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
    LoginComponent,
    SignUpComponent,
    EventDetailComponent,
    InformDialogComponent,
    ConfirmDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    DragDropModule
  ],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true },
    AuthService,
    AuthGuard,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
