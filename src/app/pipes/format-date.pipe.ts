import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
	transform(val: any, ...args: any[]): any {
		val = moment(val).format('dddd, MMMM Do YYYY');
		return val;
	}
}
