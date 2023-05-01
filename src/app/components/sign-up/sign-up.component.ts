import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(public _AuthService: AuthService,private _Router:Router) {}
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      Validators.required,
    ]),
    rePassword: new FormControl(null, [
      Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      Validators.required,
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[01215][0-9]{8}/),
    ]),
  },{validators:this.repasswordMatch});

  isLoading:boolean=false;
  apiError:string=''
  repasswordMatch(registerForm:any)
  {
    let passwordControl=registerForm.get('password')
    let rePasswordControl=registerForm.get('rePassword')
    if(passwordControl.value===rePasswordControl.value)
    {
      return null
    }
    else
    {
      rePasswordControl.setErrors({passwordMatch:'password and repassword doesnot match'})
      return {passwordMatch:'password and repassword doesnot match'}
    }
  }

  handleRegister(registerForm: FormGroup): void {
    if (registerForm.valid) {
      //register
      this.isLoading=true;
      this._AuthService.register(registerForm.value).subscribe({
        next: (res) => {
          if(res && res.message=='success')
          {
            //router to login without clicking
            this._Router.navigate(['/login'])
            this.isLoading=false;
          }
        },
        error: (err) => {
          this.isLoading=false
          this.apiError=err.error.message
          // console.log(err.error.message);
          
        },
      });
    }
    // console.log(registerForm.value);
  }


}
