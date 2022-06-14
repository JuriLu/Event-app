import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import {SocialUser} from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = 'visibility_off';
  type = 'password';
  loginForm: FormGroup;

  // //GOOGLE


  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

    //GOOGLE
    // this.authService.gAuth()

  }

  async gLogin() {
    const socialUser: SocialUser = await this.authService.authWithGoogle();
    if (socialUser && socialUser.idToken) {
      const {idToken} = socialUser;

      this.authService.googleSignIn(idToken).subscribe(user=>{
        if (user) this.router.navigateByUrl('/calendar')

      });
    }
  }

  onSubmit() {
    console.log(this.loginForm)
    this.loginForm.reset()
    this.router.navigate(['/calendar/time'])
  }

  getErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'Please Enter An Email';
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
      })
    }
  }
}
