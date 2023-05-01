import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories:any[]=[];

  constructor(private _ProductsService:ProductsService){
    _ProductsService.getCategories().subscribe({
      next:(res)=>{
        this.categories=res.data
      }
      
      
    })
  }
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
        items: 7
      }
    },
    nav: true
  }
  

}
