import {
	Component,
	ChangeDetectionStrategy,
	ViewChild,
	TemplateRef
} from '@angular/core';

import {
	startOfDay,
	endOfDay,
	subDays,
	addDays,
	endOfMonth,
	isSameDay,
	isSameMonth,
	addHours
} from 'date-fns';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
	CalendarEvent,
	CalendarEventAction,
	CalendarEventTimesChangedEvent,
	CalendarView
} from 'angular-calendar';
import * as moment from 'moment';

const colors: any = {
	red: {
		primary: '#ad2121',
		secondary: '#FAE3E3'
	},
	blue: {
		primary: '#1e90ff',
		secondary: '#D1E8FF'
	},
	yellow: {
		primary: '#e3bc08',
		secondary: '#FDF1BA'
	}
};

@Component({
	selector: 'calendar-modal',
	templateUrl: './calendar.page.html',
	styleUrls: ['./calendar.page.scss']
})
export class CalendarPage {
	@ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
	addingEvent: boolean;

	view: CalendarView = CalendarView.Month;

	CalendarView = CalendarView;

	viewDate: Date = new Date();

	modalData: {
		action: string;
		event: CalendarEvent;
	};

	actions: CalendarEventAction[] = [
		{
			label:
				'<i class="test">Edit</i>',
			a11yLabel: 'Edit',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.handleEvent('Edited', event);
			}
		},
		{
			label:
				'<i class="test">Delete</i>',
			a11yLabel: 'Delete',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.events = this.events.filter(iEvent => iEvent !== event);
				this.handleEvent('Deleted', event);
			}
		}
	];

	refresh: Subject<any> = new Subject();

	events: CalendarEvent[] = [
		{
			start: subDays(startOfDay(new Date()), 1),
			end: addDays(new Date(), 1),
			title: 'A 3 day event',
			color: colors.red,
			actions: this.actions,
			allDay: true,
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true
		},
		{
			start: startOfDay(new Date()),
			title: 'An event with no end date',
			color: colors.yellow,
			actions: this.actions
		},
		{
			start: subDays(endOfMonth(new Date()), 3),
			end: addDays(endOfMonth(new Date()), 3),
			title: 'A long event that spans 2 months',
			color: colors.blue,
			allDay: true
		},
		{
			start: addHours(startOfDay(new Date()), 2),
			end: addHours(new Date(), 2),
			title: 'A draggable and resizable event',
			color: colors.yellow,
			actions: this.actions,
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true
		}
	];

	activeDayIsOpen: boolean = true;

	constructor(private modal: NgbModal) {}

	createEvent() {
		this.addingEvent = true;
	}

	dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		console.log('event', events);
		if (this.addingEvent) {
			this.addEvent(date);
		} else {
			if (isSameMonth(date, this.viewDate)) {
				if (
					(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
					events.length === 0
				) {
					this.activeDayIsOpen = false;
				} else {
					this.activeDayIsOpen = true;
				}
				this.viewDate = date;
			}
		}
	}

	addEvent(date): void {
		this.events = [
			...this.events,
			{
				title: 'two',
				start: startOfDay(date),
				end: endOfDay(date),
				color: colors.red,
				draggable: true,
				actions: this.actions,
				resizable: {
					beforeStart: true,
					afterEnd: true
				}
			}
		];
		this.addingEvent = false;
		console.log('events', this.events);
	}

	/* dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		console.log(date);
		if (isSameMonth(date, this.viewDate)) {
			if (
				(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
				events.length === 0
			) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = true;
			}
			this.viewDate = date;
		}
	} */

	eventTimesChanged({
		event,
		newStart,
		newEnd
	}: CalendarEventTimesChangedEvent): void {
		this.events = this.events.map(iEvent => {
			if (iEvent === event) {
				return {
					...event,
					start: newStart,
					end: newEnd
				};
			}
			return iEvent;
		});
		this.handleEvent('Dropped or resized', event);
	}

	handleEvent(action: string, event: CalendarEvent): void {
		this.modalData = { event, action };
		this.modal.open(this.modalContent, { size: 'lg' });
	}

	deleteEvent(eventToDelete: CalendarEvent) {
		this.events = this.events.filter(event => event !== eventToDelete);
	}

	setView(view: CalendarView) {
		this.view = view;
	}

	closeOpenMonthViewDay() {
		this.activeDayIsOpen = false;
	}
}
