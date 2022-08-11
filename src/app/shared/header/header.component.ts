import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import {UserModel} from "../../Model/user.model";
import {map} from "rxjs";
import {CalendarService} from "../../Services/calendar.service";
import {CalendarGridComponent} from "../../components/calendar-grid/calendar-grid.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',]
})
export class HeaderComponent implements OnInit {
  user: UserModel

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  name: string;

  ngOnInit(): void {
    if (this.authService.loggedUser) {
      this.name = this.authService.loggedUser.firstName
    }
    this.user = this.authService.loggedUser
  }

  onSignOut(): void {
    this.authService.signOut();
    this.user = null
  }

  Login(){
    this.router.navigateByUrl('/auth/signin')
  }
  SignUp(){
    this.router.navigateByUrl('/auth/signup')
  }


}
