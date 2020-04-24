import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'event-modal',
	templateUrl: './event-modal.page.html',
	styleUrls: ['./event-modal.page.scss']
})
export class EventModal implements OnInit {
	events: any;
	constructor() {}

	ngOnInit() {
		console.log(this.events);
	}

	setTime(ev, item, period) {
		const hours = ev.split(':')[0];
		const minutes = ev.split(':')[1];
		item[period].setHours(hours);
		item[period].setMinutes(minutes);
		item[period].setSeconds(0);

		item.allDay = false;
		console.log('item', item);
	}
}
