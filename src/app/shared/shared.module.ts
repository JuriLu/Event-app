import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {HeaderComponent} from "./header/header.component";
import {Error404Component} from "./error404/error404.component";
import {InformDialogComponent} from "./inform-dialog/inform-dialog.component";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [
    HeaderComponent,
    Error404Component,
    DeleteDialogComponent,
    InformDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    HeaderComponent,
    Error404Component,
    DeleteDialogComponent,
    InformDialogComponent,
    ConfirmDialogComponent,
  ]
})
export class SharedModule {
}
