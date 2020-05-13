import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CalendarEvent } from 'angular-calendar';
import { ModalController } from '@ionic/angular';
import { ProjectData } from 'src/app/services/project-data';
import { CalendarData } from 'src/app/services/calendar-data';

@Component({
	selector: 'event-modal',
	templateUrl: './event-modal.page.html',
	styleUrls: ['./event-modal.page.scss']
})
export class EventModal implements OnInit {
	events: any;
	dayEvents: any[] = [];
	date: any;
	loading: boolean = false;
	constructor(
		public modalController: ModalController,
		public projectData: ProjectData,
		public calendarData: CalendarData
	) {}

	ngOnInit() {
		this.events.map(event => {
			this.dayEvents.push(event);
		});

		console.log('dayEvents', this.dayEvents);
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

		this.isModified(item);
	}

	setEndTime(ev, item) {
		const hours = ev.split(':')[0];
		const minutes = ev.split(':')[1];
		item.end.setHours(hours);
		item.end.setMinutes(minutes);
		item.end.setSeconds(0);
		item.allDay = false;
		item.endTime = ev;

		this.isModified(item);
	}

	addEvent() {
		const newEvent = {
			start: moment(this.date).startOf('day').toDate(),
			end: moment(this.date).endOf('day').toDate(),
			monthsSpan: [] = [],
			title: '',
			color: 'red',
			allDay: true,
			startTime: null,
			endTime: null,
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true,
			startId: Date.now(),
			endId: Date.now() + 1
		};

		/* setTimeout(() => {
			this.focusNewInput(newEvent.startId);
		}, 200);
 */
		this.dayEvents.push(newEvent);
	}

	async saveAndClose() {
		this.loading = true;
		for (const event of this.dayEvents) {
			this.addMonthsSpan(event);
			if (event.delete && event.id) {
				await this.calendarData.deleteEvent(event);
			} else if (!event.id) {
				console.log('event to create', event);
				await this.calendarData.createEvent(event);
			}
			/* switch (event) {
				case event.delete && event.id:
					await this.calendarData.deleteEvent(event);
					break;
				case !event.id:
					console.log('event to create', event);
					await this.calendarData.createEvent(event);
					break;
			} */
		}
		const monthlyEvents = await this.calendarData.getMonthlyEvents();
		console.log('monthly events', monthlyEvents);
		this.modalController.dismiss(monthlyEvents);
	}
	closeNoSaving() {
		this.modalController.dismiss();
	}

	isModified(event) {
		if (event.id) {
			event.modified = true;
		}
	}

	focusNewInput(inputId) {
		const input = document.getElementById(inputId) as HTMLInputElement;
		input.focus();
	}

	allDayChanged(item) {
		item.startTime = null;
		item.endTime = null;
	}

	/* deleteEvent(eventToDelete) {
		if (eventToDelete.id) {
			this.projectData.deleteEvent(eventToDelete);
		}
		const index = this.events.findIndex(x => {
			x.title === eventToDelete.title;
		});
		this.events.splice(index, 1);
	} */

	flagDeleteEvent(eventToDelete) {
		eventToDelete.delete = true;
	}

	addMonthsSpan(event) {
		let startMonth = moment(event.start).month() + 1;
		let endMonth = moment(event.end).month() + 1;
		let startYear = moment(event.start).year();
		let endYear = moment(event.end).year();
		const difference = endYear - startYear;

		if (startYear === endYear) {
			if (startMonth === endMonth) {
				event.monthsSpan.push(startMonth.toString() + startYear.toString());
			} else {
				for (; startMonth <= endMonth; startMonth++) {
					event.monthsSpan.push(startMonth.toString() + startYear.toString());
				}
			}
		} else {
			if (difference > 1) {
				for (let i = 1; i <= difference; i++) {
					for (let x = 1; i <= 12; i++) {
						startYear = startYear + i;
						event.monthsSpan.push(x.toString() + startYear.toString());
					}
				}
			}
			for (; startMonth <= 12; startMonth++) {
				event.monthsSpan.push(startMonth.toString() + startYear.toString());
			}
			for (let z = 1; z <= endMonth; z++) {
				event.monthsSpan.push(z.toString() + endYear.toString());
			}
		}
	}

	close() {
		if (this.events.length) {
			this.events.forEach(event => {
				this.addMonthsSpan(event);
				if (!event.title) {
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
