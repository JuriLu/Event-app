import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";
import {SocialUser} from "angularx-social-login";

function ExactMatch(controlName: string): ValidatorFn {
  return (control:AbstractControl): { exactMatch : boolean } | null => {
    const checkedControl = control.parent?.get(controlName);

    if (control.value !== checkedControl?.value) {
      return  { exactMatch: true };
    }

    return null;
  };
}

function PartialMatch(controlName: string, errorKey: string = 'partiallyMatch'): ValidatorFn {
  return (control:AbstractControl): { [key: string]: boolean } | null => {
    const checkedControl = control.parent?.get(controlName);

    if (checkedControl?.value) {
      if (control.value?.toLowerCase()?.includes(checkedControl.value.toLowerCase())) {
        return  { [errorKey]: true };
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
  signupForm :FormGroup

  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
        PartialMatch('firstName','firstNameMatch'),
        PartialMatch('lastName','lastNameMatch'),
        PartialMatch('email','emailMatch'),
      ]),
      confirmPassword: new FormControl('',
        [Validators.required, ExactMatch('password')]
      ),
    });
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  onSignUp(){
    if (this.signupForm.valid){
      const { firstName, lastName, email, password } = this.signupForm.getRawValue();

      this.authService
        .signUp(firstName, lastName, email, password)
        .subscribe(user => {
          if (user) this.router.navigateByUrl('/signin');
        });
    }
  }

    // async gSignUp(){
    //   const socialUser: SocialUser = await this.authService.authWithGoogle();
    //   if (socialUser && socialUser.idToken) {
    //     const { idToken } = socialUser;
    //
    //     this.authService
    //       .googleSignUp(idToken)
    //       .subscribe(user => {
    //         if (user) this.router.navigateByUrl('/signin');
    //       });
    //   }
    // }


  confPassErrMsg(){
    if (this.signupForm.get('confirmPassword').hasError('exactMatch')){
      return 'Passwords Do Not Match'
    }else{
      return 'Field must be filled'
    }
  };

  passErrMsg(){
   if (this.signupForm.get('password').invalid) {
     switch (Object.keys(this.signupForm.get('password').errors)[0]) { // this.signupForm.get('password').errors returns --> { required: true }
       case 'required':
         return 'Field must not be empty';
       case 'minlength':
         return 'Password length must be min 8 character long';
       case 'pattern':
         return 'Password must have 1 Uppercase 1 Number and 1 Symbol';
       case 'firstNameMatch':
         return 'Password Must not be the same as FirstName';
       case 'lastNameMatch':
         return 'Password Must not be the same as LastName';
       case 'emailMatch':
         return 'Password Must not be the same as Email';
     }
   }
  }
}
