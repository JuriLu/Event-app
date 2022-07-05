import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignUpComponent
      },
    ]
  },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
