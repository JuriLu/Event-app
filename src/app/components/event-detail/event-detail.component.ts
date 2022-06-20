import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventModel} from "../../Model/event.model";
import {CalendarService} from "../../Services/calendar.service";
import {UserModel} from "../../Model/user.model";
import {OnEdit} from "../../Model/on-edit";
import {finalize, tap} from "rxjs";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit,OnEdit {
  eventForm: FormGroup;
  id?: number;
  editMode: boolean = false
  isDirty: boolean = false
  //
  // userModels: UserModel[] = []

  constructor(
    private activatedRoute:ActivatedRoute,
    private calendarService: CalendarService,
    private router :Router
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      startTime: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      endTime: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    const calendarEvent: EventModel | null = this.activatedRoute.snapshot.data.calendarEvent;
    //
    // this.userModels = calendarEvent.bookings

    if (calendarEvent){
      this.populateForm(calendarEvent);
    }
    else {
      const startDate = new Date(this.calendarService.selectedDate);
      const startTime = this.calendarService.selectedDate.split('T')[1].split('.')[0].substr(0, 5);

      this.eventForm.patchValue({ startDate, startTime });
    }
    this.eventForm.valueChanges.pipe(tap(()=>{
      if (this.eventForm.dirty) this.isDirty = true
    })).subscribe()
  }

  private populateForm(eventModel: EventModel): void {
    const { id, title, start, end } = eventModel;

    const startDate = new Date(start);
    const startTime = start.split('T')[1].split('.')[0].substr(0, 5);

    const endDate = new Date(end);
    const endTime = end.split('T')[1].split('.')[0].substr(0, 5);

    this.eventForm.patchValue({
      title,
      startDate,
      startTime,
      endDate,
      endTime
    });

    this.id = id;

    if (this.id){
      this.editMode = true
    }else {
      this.editMode = false
    }
  }

  static toISOStringConverter(date: Date, time?: string): string {
    if (time) {
     const hours = +time.split(':')[0];
     const minutes = +time.split(':')[1];

      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes).toISOString();
    }

    return date.toISOString();
  };


  sendForm(){
    const { title, startDate, startTime, endDate, endTime } = this.eventForm.getRawValue();

    const start = EventDetailComponent.toISOStringConverter(startDate, startTime);
    const end = EventDetailComponent.toISOStringConverter(endDate, endTime);

    const eventModel: Omit<EventModel, 'id'> = {
      title,
      start,
      end
    };

    (this.id ? this.calendarService.update(this.id, eventModel)  : this.calendarService.create(eventModel)
    )
      .pipe(
        finalize(()=>this.isDirty=false)
      )
      .subscribe(event => {this.populateForm(event);this.router.navigate(['calendar'])});

  }

  deleteForm(){
    this.calendarService.delete(this.id).subscribe();
    this.router.navigate(['calendar'])
  }
}


