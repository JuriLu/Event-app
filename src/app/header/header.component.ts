import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../Services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    '../../.././node_modules/bootstrap/dist/css/bootstrap.min.css',
    './header.component.scss',
  ]
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router, private authService: AuthService) {}

  ngOnInit(): void {
  }
  onSignOut(): void {
    this.authService.signOut();
  }





}
