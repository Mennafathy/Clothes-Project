import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Products } from 'src/app/interfaces/products';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  prodcuts: Products[] = [];
  searchName: string = '';

  constructor(
    private _ProductsService: ProductsService,
    private _AuthService: AuthService,
    private spinner: NgxSpinnerService,
    private _CartService: CartService,
    private _ToastrService:ToastrService
  ) {
    // if (this._AuthService.userData.getValue()) {
    //   this.isLogin = true;
    // } else {
    //   this.isLogin = false;
    // }
  }
  addToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        this._CartService.numOfCartItems.next(res.numOfCartItems);
        this._ToastrService.info(res.message)
        console.log('add', res);
      },
      error: (err) => console.log(err),
    });
  }
  ngOnInit(): void {
    this.spinner.show();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.prodcuts = res.data;
        this.spinner.hide();
      },
      error: (err) => console.log(err),
    });
  }
}
