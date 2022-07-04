import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {MaterialModule} from "../shared/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {AuthRoutingModule} from "./auth-routing.module";


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
    AuthRoutingModule
  ],
  exports: [
    LoginComponent,
    SignUpComponent,
  ]
})
export class AuthModule { }
