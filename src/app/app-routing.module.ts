import {NgModule} from '@angular/core';
import {Error404Component} from "./shared/error404/error404.component";
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'calendar', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule)},
  {path: 'calendar', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)},
  {path: 'not-found', component: Error404Component},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
