import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient:HttpClient) { }
  baseURL:string=`https://route-ecommerce-app.vercel.app/`
  getProducts():Observable<any>
  {
    return this._httpClient.get('https://route-ecommerce.onrender.com/api/v1/products')
  }
  getProductDeatils(id:string):Observable<any>
  {
    return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
  }
  getCategories():Observable<any>
  {
    return this._httpClient.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
  }

}
