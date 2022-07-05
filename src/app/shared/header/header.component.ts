import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',]
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  name: string;

  ngOnInit(): void {
    if (this.authService.loggedUser) {
      this.name = this.authService.loggedUser.firstName
    }
  }

  onSignOut(): void {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/signin')
  }


}
