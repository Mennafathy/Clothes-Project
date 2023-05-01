import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import {Observable,BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData=new BehaviorSubject(null);
  NavData= new BehaviorSubject(false);

  isLogin = new BehaviorSubject(false)

  constructor(private _httpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem("userToken")!==null)
    {
      this.decodeUserData()
    }
   }

  register(userData:object):Observable<any>
  {
      return this._httpClient.post("https://route-ecommerce.onrender.com/api/v1/auth/signup",userData)
  }
  login(userData:object):Observable<any>
  {
    return this._httpClient.post("https://route-ecommerce.onrender.com/api/v1/auth/signin",userData)
  }
  decodeUserData()
  {
    let encodedToken=JSON.stringify(localStorage.getItem('userToken'))
    let decodedToken:any=jwtDecode(encodedToken)
    console.log(decodedToken);
    this.userData.next(decodedToken)
    console.log(this.userData);
    
  }
  logOut()
  {
    localStorage.removeItem('userToken')
    this.userData.next(null)
    this._Router.navigate(['/login'])

  }
}
