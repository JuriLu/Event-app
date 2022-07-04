import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarGridComponent} from "./calendar-grid/calendar-grid.component";
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {MaterialModule} from "../shared/material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {SharedModule} from "../shared/shared.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);


@NgModule({
  declarations: [
    CalendarGridComponent,
    EventDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FullCalendarModule,
    SharedModule,
    DragDropModule,
  ],
  exports: [
    CalendarGridComponent,
    EventDetailComponent,
  ]
})
export class ComponentsModule { }
