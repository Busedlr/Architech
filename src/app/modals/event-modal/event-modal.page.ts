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
	emptyTitle: boolean = false;
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
		for (const item of this.dayEvents) {
			if (!item.title && !item.delete) {
				item.missingTitle = true;
				this.focusNewInput(item.inputId, item.missingTitle);
				return;
			}
		}

		let newEvent = {
			start: moment(this.date).startOf('day').toDate(),
			end: moment(this.date).endOf('day').toDate(),
			monthsSpan: [] = [],
			title: null,
			previousTitle: null,
			missingTitle: false,
			color: 'red',
			allDay: true,
			startTime: null,
			endTime: null,
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true,
			timeId: Date.now(),
			inputId: null
		};

		newEvent.inputId = newEvent.timeId.toString() + 'i';

		setTimeout(() => {
			this.focusNewInput(newEvent.inputId, newEvent.missingTitle);
		}, 200);

		this.dayEvents.push(newEvent);

		setTimeout(() => {
			this.emptyTitle = true;
		}, 200);
	}

	async saveAndClose() {
		this.loading = true;

		const toKeep = this.dayEvents.filter(x => !x.delete || (x.delete && x.id));
		this.dayEvents = toKeep;

		for (const ev of this.dayEvents) {
			this.addMonthsSpan(ev);

			if (ev.delete) {
				await this.calendarData.deleteEvent(ev);
			} else if (!ev.id) {
				await this.calendarData.createEvent(ev);
			} else {
				await this.calendarData.replaceEvent(ev);
			}
		}
		const monthlyEvents = await this.calendarData.getMonthlyEvents();
		this.modalController.dismiss(monthlyEvents);
	}

	checkTitle(event) {
		if (event.id) {
			if (!event.title.length) {
				event.title = event.previousTitle;
				event.missingTitle = false;
				this.emptyTitle = false;
			}
		}
	}

	closeNoSaving() {
		this.modalController.dismiss();
	}

	focusNewInput(inputId, missingTitle) {
		const input = document.getElementById(inputId) as HTMLInputElement;
		if (missingTitle) {
			input.placeholder = 'add a title to save your event!';
		}

		input.focus();
	}

	savePreviousTitle(event) {
		if (event.id) event.previousTitle = event.title;
	}

	resetTitleError(ev, event) {
		if (ev.target.value === '') {
			this.emptyTitle = true;
		} else {
			this.emptyTitle = false;
		}
		event.missingTitle = false;
	}

	allDayChanged(item) {
		item.startTime = null;
		item.endTime = null;
	}

	flagDeleteEvent(eventToDelete) {
		eventToDelete.delete = true;
		if (this.dayEvents.some(event => !event.delete && !event.title)) {
			this.emptyTitle = true;
		} else {
			this.emptyTitle = false;
		}
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
