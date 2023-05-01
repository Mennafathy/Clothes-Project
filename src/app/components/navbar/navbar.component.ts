import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLogin: boolean = false;
  cartNumbers:number=0
  NavData!:boolean
  constructor(private _AuthService: AuthService,private _CartService:CartService) {
    _CartService.numOfCartItems.subscribe({
      next:(result)=>
     {
      this.cartNumbers=result
      console.log("resss",result)
     },
      error:(err)=>console.log(err)
      
      
    })
    if (this._AuthService.userData.getValue()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  
     localStorage.getItem('userToken') ?  this._AuthService.NavData.next(true) :  this._AuthService.NavData.next(false)
     this._AuthService.NavData.subscribe(res=>{
      this.NavData = res
   })
  }
  LogOut()
  {
    this._AuthService.logOut();
    this._AuthService.NavData.next(false)
  }
}



function UserDeco(constructor:Function)
{
  constructor.prototype.endPoint='route/end'
  constructor.prototype.login=function()
  {
    console.log("hello");
    
  }
  console.log(constructor);
}
@UserDeco
class User
{

}
@UserDeco
class Student
{

}
let user1=new User()
//@ts-ignore
console.log(user1.endPoint);
//@ts-ignore
console.log(user1.login());
