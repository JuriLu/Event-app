import {OnEdit} from "../../Model/on-edit";
import {MatDialog} from "@angular/material/dialog";
import {EventModel, Status} from "../../Model/event.model";
import {finalize, tap} from "rxjs";
import {CalendarService} from "../../Services/calendar.service";
import {Component, OnInit} from '@angular/core';
import {DeleteDialogComponent} from "../../shared/delete-dialog/delete-dialog.component";
import {InformDialogComponent} from "../../shared/inform-dialog/inform-dialog.component";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

//Custom Validator For End Date to be greater than Start Date
function GreaterThan(controlName: string): ValidatorFn {
  return (control: AbstractControl): { greater: boolean } | null => {
    const checkedControl = control.parent?.get(controlName);

    if (control.value < checkedControl?.value) {
      return {greater: true};
    }

    return null;
  };
}

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnEdit {
  eventForm: FormGroup;
  id?: number;
  editMode: boolean = false
  isDirty: boolean = false
  status: Status = 'public';

  idEvent: any;
  idParam: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private calendarService: CalendarService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required, GreaterThan('startDate')]),
      endTime: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
  }


  ngOnInit(): void {
    const calendarEvent: EventModel | null = this.activatedRoute.snapshot.data.calendarEvent;

    if (calendarEvent) {
      this.populateForm(calendarEvent);
    } else {
      const startDate = new Date(this.calendarService.selectedDate);
      const startTime = this.calendarService.selectedDate.split('T')[1].split('.')[0]
        .substr(0, 5);

      this.eventForm.patchValue({startDate, startTime});
    }
    this.eventForm.valueChanges.pipe(tap(() => {
      if (this.eventForm.dirty) this.isDirty = true
    })).subscribe()


  }

  private populateForm(eventModel: EventModel): void {
    const {id, title, start, end, status} = eventModel;

    const startDate = new Date(start);
    const startTime = start.split('T')[1].split('.')[0]
      .substr(0, 5);
    console.log(startTime);

    const endDate = new Date(end);
    const endTime = end.split('T')[1].split('.')[0]
      .substr(0, 5);
    console.log(endTime);

    this.eventForm.patchValue({
      title,
      startDate,
      startTime,
      endDate,
      endTime,
      status
    });

    this.id = id;

    //Simplified set of editMode
    this.editMode = !!this.id;
  }

  static toISOStringConverter(date: Date, time?: string): string {
    if (time) {
      const hours = +time.split(':')[0];
      const minutes = +time.split(':')[1];

      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes).toISOString();
    }

    return date.toISOString();
  };


  sendForm() {
    // console.log(this.eventForm.getRawValue());
    const {title, startDate, startTime, endDate, endTime, status} = this.eventForm.getRawValue();
    const start = EventDetailComponent.toISOStringConverter(startDate, startTime);
    const end = EventDetailComponent.toISOStringConverter(endDate, endTime);
    console.log(end > start);
    const eventModel: Omit<EventModel, 'id'> = {
      title,
      start,
      end,
      status
    };

    (this.id ? this.calendarService.update(this.id, eventModel) : this.calendarService.create(eventModel)
    )
      .pipe(
        finalize(() => this.isDirty = false),
      )
      .subscribe(event => {
        this.dialog.open(InformDialogComponent, {
          data: {
            title: event.title,
            startDate: event.start,
            endDate: event.end,
            status: event.status,
            editMode: this.editMode
          }
        })
        this.router.navigate(['calendar']);
      });


  }

  openDialog() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure to delete event: '${this.eventForm.get('title').value}'`
      }
    })
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.calendarService.delete(this.id).subscribe();
        this.router.navigate(['calendar'])
        this.dialog.open(DeleteDialogComponent, {panelClass: 'custom-dialog-container-delete',})
      }
    })
  }

}


