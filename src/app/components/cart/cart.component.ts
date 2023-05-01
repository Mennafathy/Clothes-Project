import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  cartDetails: any = null;
  products: any[] = [];
  productTitle!: string;
  ngOnInit(): void {
    this.spinner.show();
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        // console.log("details",res.numOfCartItems);
        this.spinner.hide();
      },
      error: (err) => console.log(err),
    });
  }
  removeCartItem(product: any) {
    this.spinner.show()
    console.log(product, '3aaaaaaaa');
    const prodId = product.id;
    const prodName = product.title;
    this._CartService.removeCartItem(prodId).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this._CartService.numOfCartItems.next(res.numOfCartItems)
        console.log(res.data);
        this.spinner.hide()
        // this.products = res.data.products;
        // console.log('prod', this.products);
        this._ToastrService.success(
          ` ${prodName} has been removed successfully`
        );
      },
      error: (err) => console.log(err),
    });
  }
  updateCartQuantity(prodId:string,prodCount:number)
  {
    this.spinner.show()
    this._CartService.updateCartQuantity(prodId,prodCount).subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
        console.log(res.data)
        this.spinner.hide()
      },
      error:(err)=>console.log(err)
    })
  }
 
}
