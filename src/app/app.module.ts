import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

import {AuthService} from "./Services/auth.service";
import {AuthGuard} from "./Guards/auth-guard";
import {TokenInterceptor} from "./Services/token.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MAT_DATE_LOCALE} from "@angular/material/core";

import {AuthModule} from "./Auth/auth.module";
import {ComponentsModule} from "./components/components.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./shared/core/core.module";



@NgModule({
  declarations: [
    AppComponent,
    // CalendarGridComponent,         //Component Module
    // EventDetailComponent,          //Component Module
    // LoginComponent,                //Auth Module
    // SignUpComponent,               //Auth Module
    // HeaderComponent,               //Shared Module
    // Error404Component,             //Shared Module
    // InformDialogComponent,         //Shared Module
    // ConfirmDialogComponent,        //Shared Module
    // DeleteDialogComponent          //Shared Module
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    AuthModule,         //Custom
    ComponentsModule,   //Custom
    SharedModule,       //Custom
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
