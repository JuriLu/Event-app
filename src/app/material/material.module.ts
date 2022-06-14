import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatDividerModule
]

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
