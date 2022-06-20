import {NgModule} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from '@angular/material/dialog';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatDividerModule,
  MatDialogModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {
}
