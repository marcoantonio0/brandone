import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDate'
})
export class FilterDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    const sortedValues = value.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    return sortedValues;
  }

}
