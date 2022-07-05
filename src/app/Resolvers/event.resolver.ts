import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {EventModel} from "../Model/event.model";
import {CalendarService} from "../Services/calendar.service";

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<EventModel | null> {

  constructor(private calendarService: CalendarService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EventModel> | null {
    if (route.paramMap.has('id')) {
      const eventId: string = route.paramMap.get('id');

      if (eventId === 'new') {
        return null;
      }
      return this.calendarService.getEvent(+eventId)
    }
  }
}
