import {AuthService} from "../../Services/auth.service";
import {CalendarOptions} from "@fullcalendar/angular";
import {CalendarService} from "../../Services/calendar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {UserModel} from "../../Model/user.model";
import {EventModel} from "../../Model/event.model";
import {map} from "rxjs";

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss']
})
export class CalendarGridComponent implements OnInit, AfterViewChecked {
  public height = 917;
  public listEvent = [];
  public userLoggedIn: UserModel;
  public userId;
  public openEv:boolean = false


  ngOnInit() {
    this.userLoggedIn = JSON.parse(localStorage.getItem('event:user'));
    this.userId = this.userLoggedIn.id;
  }

  ngAfterViewChecked() {
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService,
    private authService: AuthService,
  ) {
  }

  getPublicEvent(){

  }

  calendarOptions: CalendarOptions = {

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


    // height: this.theHeight,
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
      // this.openEv = true
    },
    eventClick: (data) => {
      this.router.navigate([data.event.id], {relativeTo: this.activatedRoute})
      // this.openEv = true
    },

    //Called after the calendar’s date range has been initially set or changed in some way and the DOM has been updated.
    // The calendar’s dates can change any time the user does the following: click the prev/next buttons,
    // change the view, click a navlink. The dates can also change when the current-date is manipulated
    // via the API, such as when gotoDate is called.

    datesSet: ({start, end}) => {
      const s = start.toISOString();
      const e = end.toISOString();

      // Get Events by status and user ID
      if (this.authService.loggedUser){
        this.calendarService
          .getEvents({start: s, end: e})
          .subscribe((events: EventModel[]) => {
            events.forEach((value, index, array) => {
              if (value.user.id === this.userLoggedIn.id) {
                // console.log(value);
                this.listEvent.push(value)
                this.calendarOptions.events = this.listEvent;
                console.log(this.calendarOptions.events);
              }
            })
          });
      }else if (!this.authService.loggedUser){
        this.calendarService
          .getEvents({start: s, end: e})
          .pipe(
            map( (event) => event.filter(ev => ev.status === 'public' ))
          )
          .subscribe((events: any) => this.calendarOptions = {...this.calendarOptions, events});
        // console.log(this.calendarOptions)
      }
    }
  };

}
