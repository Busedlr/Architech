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

	ngOnInit() {
		/* if (!this.events.length) {
			this.addEvent();
		} */
	}

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

		setTimeout(() => {
			this.focusNewInput(newEvent.startId);
		}, 200);

		this.events.push(newEvent);
	}

	focusNewInput(inputId) {
		const input = document.getElementById(inputId) as HTMLInputElement;
		input.focus();
	}

	allDayChanged(item) {
		item.startTime = null;
		item.endTime = null;
	}

	deleteEvent(eventToDelete) {
		/* this.events = this.events.filter(event => event !== eventToDelete); */
		const index = this.events.findIndex(x => {
			x.title === eventToDelete.title;
		});
		this.events.splice(index, 1);
		eventToDelete['deleted'] = true;
	}

	close() {
		if (this.events.length > 0) {
			this.events.forEach(item => {
				if (!moment(item.start).isSameOrBefore(item.end)) {
					console.log('dates are not the right order');
				} else if (!item.title) {
					console.log('there is no title');
				} else {
					this.modalController.dismiss(this.events);
				}
			});
		} else {
			this.modalController.dismiss(this.events);
		}
	}
}
