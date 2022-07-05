import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {MaterialModule} from "../shared/material/material.module";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthRoutingModule} from "./auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



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
export class AuthModule {
}
