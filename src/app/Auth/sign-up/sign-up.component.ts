import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {InformDialogComponent} from "../../shared/inform-dialog/inform-dialog.component";
import {UserCreatedDialogComponent} from "../../shared/user-created-dialog/user-created-dialog.component";

function ExactMatch(controlName: string): ValidatorFn {
  return (control: AbstractControl): { exactMatch: boolean } | null => {
    const checkedControl = control.parent?.get(controlName);

    if (control.value !== checkedControl?.value) {
      return {exactMatch: true};
    }

    return null;
  };
}

function PartialMatch(controlName: string, errorKey: string = 'partiallyMatch'): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const checkedControl = control.parent?.get(controlName);

    if (checkedControl?.value) {
      if (control.value?.toLowerCase()?.includes(checkedControl.value.toLowerCase())) {
        return {[errorKey]: true};
      }
    }

    return null;
  };
}


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup
  hide = 'visibility_off';
  type = 'password';

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
        PartialMatch('firstName', 'firstNameMatch'),
        PartialMatch('lastName', 'lastNameMatch'),
        PartialMatch('email', 'emailMatch'),
      ]),
      confirmPassword: new FormControl('',
        [Validators.required, ExactMatch('password')]
      ),
    });
  }

  onSignUp() {
    if (this.signupForm.valid) {
      const {firstName, lastName, email, password} = this.signupForm.getRawValue();

      this.authService
        .signUp(firstName, lastName, email, password)
        .subscribe(user => {
          this.dialog.open(UserCreatedDialogComponent, {
            data: {
              fName: firstName,
              lName: lastName,
              email: email,
            }
          })
          if (user) this.router.navigateByUrl('/auth/signin');
        });
    }
    console.log(this.signupForm)
  };

  emailErrMsg() {
    if (this.signupForm.get('email').hasError('email')) {
      return 'Not a valid email'
    } else {
      return 'Email Required'
    }
  }

  confPassErrMsg() {
    if (this.signupForm.get('confirmPassword').hasError('exactMatch')) {
      return 'Passwords Do Not Match'
    } else {
      return 'Confirm Password required'
    }
  };

  passErrMsg() {
    if (this.signupForm.get('password').invalid) {
      switch (Object.keys(this.signupForm.get('password').errors)[0]) { // this.signupForm.get('password').errors returns --> { required: true }
        case 'required':
          return 'Password required';
        case 'minlength':
          return 'Password length must be min 8 character long';
        case 'pattern':
          return 'Password must have 1 Uppercase 1 Number';
        case 'firstNameMatch':
          return 'Password Must not be the same as FirstName';
        case 'lastNameMatch':
          return 'Password Must not be the same as LastName';
        case 'emailMatch':
          return 'Password Must not be the same as Email';
      }
    }
  };

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
  };
}
