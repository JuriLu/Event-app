import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MaterialModule} from "../shared/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    LoginComponent,
    SignUpComponent,
  ]
})
export class AuthModule { }
