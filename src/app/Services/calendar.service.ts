import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {ListOf} from "../Model/list-of.model";
import {EventModel} from "../Model/event.model";
import {ResponseModel} from "../Model/response.model";
import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

export const LOCAL_STORAGE_SELECTED_DATE = 'event:selected-date';

interface CalendarFilter {
  start: string;
  end: string;
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly _url: string;
  private _selectedDate: string;

  get selectedDate(): string {
    if (!this._selectedDate) {
      this._selectedDate = localStorage.getItem(LOCAL_STORAGE_SELECTED_DATE);
    }
    return this._selectedDate;
  }

  set selectedDate(date: string) {
    if (date) {
      this._selectedDate = date;
      localStorage.setItem(LOCAL_STORAGE_SELECTED_DATE, this._selectedDate);
    }
  }

  constructor(private httpClient: HttpClient) {
    this._url = environment.baseApi + '/event';
  }

  getEvents(filters: CalendarFilter): Observable<EventModel[]> {
    const params = new HttpParams({
      fromObject: {...filters}
    });
    console.log('PARAMS:', params);
    return this.httpClient
      .get<ResponseModel<ListOf<EventModel>>>(this._url, {params})
      .pipe(
        map(res => res.data),
        map(listOf => listOf.list)
      );
  }

  getEvent(id: number): Observable<EventModel> {
    return this.httpClient
      .get<ResponseModel<EventModel>>(`${this._url}/${id}`)
      .pipe(map(res => res.data))
  }

  create(event: Partial<EventModel>): Observable<EventModel> {
    return this.httpClient.post<ResponseModel<EventModel>>(`${this._url}`, event).pipe(map(res => res.data))
  }

  update(id: number, event: Partial<EventModel>): Observable<EventModel> {
    return this.httpClient
      .put<ResponseModel<EventModel>>(`${this._url}/${id}`, {...event, id})
      .pipe(map(res => res.data));
  }

  delete(id: number): Observable<EventModel> {
    return this.httpClient
      .delete<ResponseModel<EventModel>>(`${this._url}/${id}`)
      .pipe(map(res => res.data));
  }
}


