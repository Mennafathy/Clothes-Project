import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Products[], searchWord?: string): any {
    if (searchWord == undefined) {
      return products;
    }
    return products.filter((product) => {
      let data = product.title.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase());
      return data;
    });
  }
}
