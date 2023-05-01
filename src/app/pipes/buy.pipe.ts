import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buy'
})
export class BuyPipe implements PipeTransform {

  transform(categoryName:string): unknown {
    return ` buy ${categoryName}`;
  }

}
