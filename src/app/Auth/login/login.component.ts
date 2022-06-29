import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide:string = 'visibility_off';
  type:string = 'password';
  errMsg:string = ''

  constructor(private router: Router,private authService: AuthService,) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })


  }


  emailErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'Please Enter Your Email';
    }
    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  getType() {
    switch (this.type) {
      case 'password':
        this.type = 'text'
        this.hide = 'visibility'
        break;

      case 'text':
        this.type = 'password'
        this.hide = 'visibility_off'
        break;
    }
  }

  Login() {
    if (this.loginForm.valid) {
      const {email,password} = this.loginForm.getRawValue()
      this.authService.signIn(email,password).subscribe((user)=>{
        if (user) this.router.navigateByUrl('/calendar')
      },error =>{

        switch (error.status) {
          case (400):
            this.errMsg = "Wrong Email or Password"
            break;
        }

      })
    }
  }


}
