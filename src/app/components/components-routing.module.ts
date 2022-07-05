import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../Guards/auth-guard";
import {CalendarGridComponent} from "./calendar-grid/calendar-grid.component";
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {UnsavedDataGuard} from "../Guards/unsaved-data.guard";
import {EventResolver} from "../Resolvers/event.resolver";

const routes:Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        canActivate:[AuthGuard],
        component:CalendarGridComponent
      },
      {
        path:':id',
        component: EventDetailComponent,
        canActivate:[AuthGuard],
        canDeactivate:[UnsavedDataGuard],
        resolve: { calendarEvent: EventResolver }
      }
    ]
  },
]

@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ComponentsRoutingModule{}
