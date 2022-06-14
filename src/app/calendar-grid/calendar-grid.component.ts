import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarService} from "../Services/calendar.service";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss']
})
export class CalendarGridComponent implements OnInit{
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService,
    private authService:AuthService
  ) {
  }

  calendarOptions: CalendarOptions = {

    initialView:'dayGridMonth',
    weekends: true,
    dayHeaders: true,

    slotDuration: '00:30:00',
    slotLabelInterval: '01:00',

    events: [],

    eventBackgroundColor: 'white',
    eventBorderColor: 'blue',
    eventTextColor: 'black',
    eventDisplay:'block',
    eventMinHeight:15,
    eventMinWidth:10,


    headerToolbar: {
      start:'',
      center:"title",
      end:"today prev,next"
    },
    titleFormat:{year: 'numeric', month: 'long', day: 'numeric'},
    titleRangeSeparator:'-',
    buttonText:{
      today: "Today",
      month: "month",
      week: "week",
      list: "list"
    },

    themeSystem: 'standard',

    height: 740,
    contentHeight:800,
    aspectRatio:4,
    expandRows: true,
    handleWindowResize: true,
    windowResizeDelay: 200,
    stickyHeaderDates: true,

    dateClick: (data) => {
      this.calendarService.selectedDate = data.date.toISOString()
      if (this.authService.isAuthenticated) this.router.navigate(['new'],{relativeTo:this.activatedRoute})
    },
    eventClick: (data) => {
      this.router.navigate([data.event.id],{relativeTo:this.activatedRoute})
    },
    datesSet: ({start, end}) => {
      const s = start.toISOString();
      const e = end.toISOString();

      this.calendarService
        .getEvents({ start: s, end: e })
        .subscribe((events: any) => this.calendarOptions = { ...this.calendarOptions, events });
    }
  };





  ngOnInit() {

  }

    toggleWeekends(){
    this.calendarOptions.weekends = !this.calendarOptions.weekends
    console.log(this.calendarOptions.weekends)
  }


}
