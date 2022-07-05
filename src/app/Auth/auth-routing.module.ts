import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

const routes : Routes = [
  {
    path:'',
    children:[
      {
        path:'signin',
        component:LoginComponent
      },
      {
        path:'signup',
        component:SignUpComponent
      },
    ]},

]

@NgModule({
imports:[
  RouterModule.forChild(routes)
],
  exports:[RouterModule]
})
export class AuthRoutingModule{}
