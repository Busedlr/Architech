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
	timeline: string;
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
	}

	setStartTime(ev, item) {
		const hours = ev.split(':')[0];
		const minutes = ev.split(':')[1];
		item.start.setHours(hours);
		item.start.setMinutes(minutes);
		item.start.setSeconds(0);
		item.allDay = false;
		item.startTime = ev;
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

	setTime(ev, item) {
		console.log('timeline', JSON.stringify(this.timeline));
		const time = this.timeline + 'Time';
		const hours = ev.split(':')[0];
		const minutes = ev.split(':')[1];
		item[this.timeline].setHours(hours);
		item[this.timeline].setMinutes(minutes);
		item[this.timeline].setSeconds(0);
		item.allDay = false;
		item[time] = ev;
	}

	setTimeline(timeline) {
		this.timeline = timeline;
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
			timeId: Date.now()
		};

		/* setTimeout(() => {
			this.focusNewInput(newEvent.timeId);
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
				await this.calendarData.createEvent(event);
			} else {
				await this.calendarData.replaceEvent(event);
			}
		}
		const monthlyEvents = await this.calendarData.getMonthlyEvents();
		this.modalController.dismiss(monthlyEvents);
	}
	closeNoSaving() {
		this.modalController.dismiss();
	}

	focusNewInput(inputId) {
		const input = document.getElementById(inputId) as HTMLInputElement;
		input.focus();
	}

	allDayChanged(item) {
		item.startTime = null;
		item.endTime = null;
	}

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
}
