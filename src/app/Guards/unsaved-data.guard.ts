import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {OnEdit} from "../Model/on-edit";

@Injectable({
  providedIn: 'root'
})
export class UnsavedDataGuard implements CanDeactivate<OnEdit> {
  canDeactivate(component: OnEdit):boolean  {
    if (component.isDirty){
      return confirm('Are you sure you want to leave this page without saving your changes?');
    }
    return true;
  }

}
