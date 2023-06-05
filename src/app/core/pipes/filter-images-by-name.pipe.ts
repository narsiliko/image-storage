import { Pipe, PipeTransform } from '@angular/core';
import { StoredImageRecord } from '../api/localStorage/local-storage';

@Pipe({
  name: 'filterImagesByName'
})
export class FilterImagesByNamePipe implements PipeTransform {

  transform(value: StoredImageRecord[], query: string): StoredImageRecord[] {
    if (!!query) {
      return value.filter(item => item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    }

    return value;
  }

}
