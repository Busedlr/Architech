import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
	selector: 'event-modal',
	templateUrl: './event-modal.page.html',
	styleUrls: ['./event-modal.page.scss']
})
export class EventModal implements OnInit {
	events: any;
	date: any;
	constructor() {}

	ngOnInit() {}

	setTime(ev, item, period) {
		const hours = ev.split(':')[0];
		const minutes = ev.split(':')[1];
		item[period].setHours(hours);
		item[period].setMinutes(minutes);
		item[period].setSeconds(0);
		item.allDay = false;
		const timePeriod = period + 'Time';
		item[timePeriod] = ev;

		console.log(item);
	}

	addEvent() {
		const newEvent = {
			start: this.date,
			end: this.date,
			title: '',
			color: 'blue',
			allDay: true,
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true,
			startId: Date.now(),
			endId: Date.now() + 1,
			startTime: null,
			endTime: null
		};

		console.log('ev', newEvent);
		this.events.push(newEvent);
	}

	allDayChanged(item) {
		item.startTime = null;
		item.endTime = null;
	}
}
