import { Pipe, PipeTransform } from '@angular/core';

import { StoredImage } from '../api/localStorage/local-storage';

@Pipe({
  name: 'filterImagesByName'
})
export class FilterImagesByNamePipe implements PipeTransform {

  transform(value: StoredImage[], query: string): StoredImage[] {
    if (!!query) {
      return value.filter(item => item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    }

    return value;
  }

}
