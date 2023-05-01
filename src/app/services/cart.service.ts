import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, count } from 'rxjs';
import { Headers } from '../modules/headers.module';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  numOfCartItems=new BehaviorSubject(0)

  constructor( private _HttpClient:HttpClient) {
    this.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.numOfCartItems.next(res.numOfCartItems)
        console.log(this.numOfCartItems);
        
        console.log("response",res);
      },
      error:(err)=>console.log(err)
      
    })
   }
 
  addToCart(productId:string):Observable<any>
  {
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{
      productId:productId
    }
    )
  }
  getLoggedUserCart():Observable<any>
  {
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
    )
  }
  removeCartItem(productId:string):Observable<any>
  {
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
    )
  }
  updateCartQuantity(productId:string,count:number):Observable<any>
  {
    return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
    {
      count:count
    }
    )
  }
  onlinePayment(shippingAddress:any,cartId:string){
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress:shippingAddress
    }
    )
  }
}
