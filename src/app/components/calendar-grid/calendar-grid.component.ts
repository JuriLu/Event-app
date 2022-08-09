import {AuthService} from "../../Services/auth.service";
import {CalendarOptions, FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarService} from "../../Services/calendar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../../Model/user.model";
import {EventModel} from "../../Model/event.model";
import {map, tap} from "rxjs";

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss']
})
export class CalendarGridComponent implements OnInit {
  @ViewChild('calendar') calendarRef:FullCalendarComponent
  public start;
  public end;
  public height = 917;
  public userLoggedIn: UserModel;
  public userId;
  calendarOptions: CalendarOptions;


  ngOnInit() {
    this.userLoggedIn = JSON.parse(localStorage.getItem('event:user'));
    this.userId = this.userLoggedIn.id;
    this.authService.logoutSubject
      .pipe(
        tap(() => {
          this.onEvent(this.start,this.end)
        })
      ).subscribe()

  }


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService,
    private authService: AuthService,
  ) {
    this.declarecalendar()
  }


  declarecalendar() {

     this.calendarOptions = {

      initialView: 'dayGridMonth',
      weekends: true,
      dayHeaders: true,

      slotDuration: '00:30:00',
      slotLabelInterval: '01:00',

      events: [],

      themeSystem: 'default',

      eventBackgroundColor: 'white',
      eventTextColor: 'black',
      eventDisplay: 'block',
      eventShortHeight: 20,
      eventMinWidth: 10,


      headerToolbar: {
        start: '',
        center: "title",
        end: "today prev,next"
      },
      titleFormat: {month: 'long', year: 'numeric'},
      titleRangeSeparator: '-',
      buttonText: {
        today: "Today",
        month: "month",
        week: "week",
        list: "list"
      },

       height: 917,
      contentHeight: 800,
      aspectRatio: 4,
      expandRows: true,
      handleWindowResize: true,
      windowResizeDelay: 200,
      stickyHeaderDates: true,

      dateClick: (data) => {
        this.calendarService.selectedDate = data.date.toISOString()
        if (this.authService.isAuthenticated) this.router.navigate(['new'], {relativeTo: this.activatedRoute})
      },
      eventClick: (data) => {
        this.router.navigate([data.event.id], {relativeTo: this.activatedRoute})
      },

      //Called after the calendar’s date range has been initially set or changed in some way and the DOM has been updated.
      // The calendar’s dates can change any time the user does the following: click the prev/next buttons,
      // change the view, click a navlink. The dates can also change when the current-date is manipulated
      // via the API, such as when gotoDate is called.

      datesSet: ({start, end}) => {
        const s = start.toISOString();
        const e = end.toISOString();

          this.start = s;
          this.end = e;


        // console.log('test');
        if (this.authService.loggedUser) {
          this.calendarService
            .getEvents({start: s, end: e})
            .pipe(
              map((event) => event.filter(ev => ev.user.id === this.userLoggedIn.id))
            )
            .subscribe((events: any) =>
              this.calendarOptions = {...this.calendarOptions, events}
            );

        } else {
        this.onEvent(s,e)
        }
      }
    };
  }
  onEvent(start,end){
    this.calendarService
      .getEvents({start: start, end: end})
      .pipe(
        map((event) => event.filter(ev => ev.status === 'public'))
      )
      .subscribe((events: any) =>
        this.calendarOptions = {...this.calendarOptions, events}
      );
  }



}
