import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarEvent } from 'angular-calendar';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'event-modal',
	templateUrl: './event-modal.page.html',
	styleUrls: ['./event-modal.page.scss']
})
export class EventModal implements OnInit {
	events: any;
	date: any;
	constructor(public modalController: ModalController) {}

	ngOnInit() {}

	setStartTime(ev, item) {
		let start;
		start = item.start;
		const hours = ev.split(':')[0];
		const minutes = ev.split(':')[1];
		start.setHours(hours);
		start.setMinutes(minutes);
		start.setSeconds(0);
		item.allDay = false;
		item.startTime = ev;
		item.start = start;

		console.log(item);
	}

	setEndTime(ev, item) {
		const hours = ev.split(':')[0];
		const minutes = ev.split(':')[1];
		item.end.setHours(hours);
		item.end.setMinutes(minutes);
		item.end.setSeconds(0);
		item.allDay = false;
		item.endTime = ev;
	}

	addEvent() {
		const newEvent = {
			start: moment(this.date).startOf('day').toDate(),
			end: moment(this.date).endOf('day').toDate(),
			title: '',
			color: 'red',
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

		this.events.push(newEvent);
	}

	allDayChanged(item) {
		item.startTime = null;
		item.endTime = null;
	}

	deleteEvent(eventToDelete: CalendarEvent) {
		this.events = this.events.filter(event => event !== eventToDelete);
	}

	close() {
		this.events.forEach(item => {
			const check = moment(item.start).isSameOrBefore(item.end);
			console.log('dates are in the right order', check);
		});

		this.modalController.dismiss(this.events);
	}
}
