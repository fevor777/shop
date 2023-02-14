import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderByPipe',
    standalone: true
})
export class OrderByPipe<T> implements PipeTransform {
    transform(value: T[], key: keyof T, isAsc: boolean): T[] {
        if (!value || value.length === 0 || !key) {
            return value;
        }
        return value.sort((firstObj: T, secondObj: T) => {
            const firstField = firstObj[key];
            const secondField = secondObj[key];
            let result;
            if (firstField > secondField) {
              result = isAsc ? 1 : -1;
            } else if (firstField === secondField) {
              result = 0;
            } else {
              result = isAsc ? -1 : 1;
            }
            return result;
          })
    }

}