import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  constructor (private _ActivatedRoute:ActivatedRoute,private _ProductsService:ProductsService,
    private spinner: NgxSpinnerService,private _CartService:CartService,
    private _ToastrService:ToastrService){}

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  productId:any;
  productDetails:any;
  ngOnInit(): void {
    this.spinner.show()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ActivatedRoute.paramMap.subscribe((params)=>
    // console.log(params.get('id'))
    this.productId=params.get('id')
    )
    this._ProductsService.getProductDeatils(this.productId).subscribe({
      next:(res)=>{
        this.productDetails=res.data;
        this.spinner.hide()
      
      }
    })
  }
 addToCart(productId:string)
  {
    this._CartService.addToCart(productId).subscribe({
      next:(res)=>{
        this._ToastrService.info(res.message)
        console.log(res)},
      error:(err)=>console.log(err)
    });
    
  }

}
