import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../Services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  firstName: string = this.authService.loggedUser.firstName;
  lastName: string = this.authService.loggedUser.lastName;
  email: string = this.authService.loggedUser.email;
  imgUrl: string = this.authService.loggedUser.imageUrl;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setImg()
  }

  setImg(){
    if (this.authService.loggedUser.imageUrl){
      this.imgUrl = this.authService.loggedUser.imageUrl
    } else {
      this.imgUrl = 'assets/CuUserLogo.png'
    }
  }

}
