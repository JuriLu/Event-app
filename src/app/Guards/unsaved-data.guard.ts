import {OnEdit} from "../Model/on-edit";
import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnsavedDataGuard implements CanDeactivate<OnEdit> {
  canDeactivate(component: OnEdit): boolean {
    if (component.isDirty) {
      return confirm('Confirm leaving this page without saving your changes?');
    }
    return true;
  }

}
