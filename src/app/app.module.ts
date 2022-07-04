import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthModule} from "./Auth/auth.module";
import {ComponentsModule} from "./components/components.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./shared/core/core.module";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    CoreModule,
    SharedModule,
    ComponentsModule,

    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
