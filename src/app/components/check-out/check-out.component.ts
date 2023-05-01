import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
CartService
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent {
  constructor(private _CartService:CartService){}
  shippingAddress:FormGroup=new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })
  // "6448eb8b4c08050033e85315"

  navigateToURL(url:string)
  {
    window.location.href=url
  }
  HandleSubmit(shippingAddress:FormGroup)
  {
    this._CartService.onlinePayment(shippingAddress.value,"644939cc4c08050033e9e71c").subscribe({
      next:(res:any)=>{
        this.navigateToURL(res.session.url)
        console.log(res.session.url);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    console.log(shippingAddress.value);
    
  }
}
