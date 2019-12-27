import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'parseTime'
})
export class ParseTimePipe implements PipeTransform {

  transform(value: string): any {
    return moment(value).local().format('YYYY-MM-DD HH:mm:ss');
  }

}
