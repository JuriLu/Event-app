
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MaterialModule} from "../shared/material/material.module";
import {FullCalendarModule} from "@fullcalendar/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {CalendarGridComponent} from "./calendar-grid/calendar-grid.component";
import {ComponentsRoutingModule} from "./components-routing.module";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {MatSelectModule} from "@angular/material/select";

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
        SharedModule,
        CommonModule,
        MaterialModule,
        DragDropModule,
        FullCalendarModule,
        ReactiveFormsModule,
        ComponentsRoutingModule,
        MatSelectModule,
    ],
  exports: [
    CalendarGridComponent,
    EventDetailComponent,
  ]
})
export class ComponentsModule {
}
