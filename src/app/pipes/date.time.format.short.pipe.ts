import { ConfigService } from './../model/config.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateTimeFormatShort'
})
export class DateTimeFormatShortPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, ConfigService.DATE_TIME_FORMAT_SHORT);
  }
}