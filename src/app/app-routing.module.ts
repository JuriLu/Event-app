import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalendarGridComponent} from "./components/calendar-grid/calendar-grid.component";
import {Error404Component} from "./shared/error404/error404.component";
import {LoginComponent} from "./Auth/login/login.component";
import {SignUpComponent} from "./Auth/sign-up/sign-up.component";
import {EventResolver} from "./Resolvers/event.resolver";
import {EventDetailComponent} from "./components/event-detail/event-detail.component";
import {UnsavedDataGuard} from "./Guards/unsaved-data.guard";
import {AuthGuard} from "./Guards/auth-guard";

const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signin',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {
    path:'calendar',
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
  {path:'not-found',component:Error404Component},
  {path:'**',redirectTo:'/not-found',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
