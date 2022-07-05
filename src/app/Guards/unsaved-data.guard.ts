import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

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
