import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {MaterialModule} from "./material/material.module";
import {Error404Component} from "./error404/error404.component";
import {InformDialogComponent} from "./inform-dialog/inform-dialog.component";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HeaderComponent,
    Error404Component,
    InformDialogComponent,
    ConfirmDialogComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    // ReactiveFormsModule,
    // BrowserModule,
  ],
  exports:[
    HeaderComponent,
    Error404Component,
    InformDialogComponent,
    ConfirmDialogComponent,
    DeleteDialogComponent
  ]
})
export class SharedModule { }
