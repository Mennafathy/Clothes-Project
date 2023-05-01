import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public _AuthService: AuthService,private _Router:Router) {}
  loginForm: FormGroup = new FormGroup({
    
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      // Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      Validators.required,
    ]),
    
   
  });

  isLoading:boolean=false;
  apiError:string=''
  handleLogin(loginForm: FormGroup): void {
    if (this.loginForm.valid) {
      //register
      this.isLoading=true;
      this._AuthService.login(loginForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if(res.message=='success')
          {
            localStorage.setItem("userToken",res.token)
            this._AuthService.decodeUserData()
            this._AuthService.NavData.next(true)

            //router to login without clicking
            this._Router.navigate(['/home'])
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
