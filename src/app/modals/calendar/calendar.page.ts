import {
	Component,
	ChangeDetectionStrategy,
	ViewChild,
	TemplateRef,
	OnInit
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
import { ModalController } from '@ionic/angular';
import { EventModal } from '../event-modal/event-modal.page';
import { ProjectData } from 'src/app/services/project-data';

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

	view: CalendarView = CalendarView.Month;

	CalendarView = CalendarView;

	viewDate: Date = new Date();

	events: any[];

	actions: CalendarEventAction[] = [
		{
			label: '<i class="fa fa-fw fa-pencil"></i>',
			a11yLabel: 'Edit',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				/* this.handleEvent('Edited', event); */
			}
		},
		{
			label: '<i class="fa fa-fw fa-times"></i>',
			a11yLabel: 'Delete',
			onClick: ({ event }: { event: CalendarEvent }): void => {
				this.events = this.events.filter(iEvent => iEvent !== event);
				/* this.handleEvent('Deleted', event); */
			}
		}
	];

	refresh: Subject<any> = new Subject();

	activeDayIsOpen: boolean = false;

	constructor(
		public modalController: ModalController,
		public projectData: ProjectData
	) {}

	ngOnInit() {
		if (this.events.length) {
			this.events.map(item => {
				if (item.start.seconds) {
					item.end = new Date(item.end.seconds * 1000);
					item.start = new Date(item.start.seconds * 1000);
				}
			});
		}
	}

	dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
		this.openModal(events, date);

		/* if (isSameMonth(date, this.viewDate)) {
			if (
				(isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
				events.length === 0
			) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = false;
			}
			this.viewDate = date;
		} */
	}

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
		/* this.handleEvent('Dropped or resized', event); */
	}

	/* handleEvent(action: string, event: CalendarEvent): void {
		this.modalData = { event, action };
		this.modal.open(this.modalContent, { size: 'lg' });
	} */

	addEvent(): void {
		this.events = [
			...this.events,
			{
				title: 'New event',
				start: startOfDay(new Date()),
				end: endOfDay(new Date()),
				color: colors.red,
				draggable: true,
				resizable: {
					beforeStart: true,
					afterEnd: true
				}
			}
		];
	}

	deleteEvent(eventToDelete: CalendarEvent) {
		this.events = this.events.filter(event => event !== eventToDelete);
	}

	setView(view: CalendarView, events) {
		console.log('events', events);
		this.view = view;
		events.forEach(item => {
			const index = this.events.findIndex(x => x.startId === item.startId);
			if (index !== -1) {
				this.events.splice(index, 1);
			}
			this.events.push(item);
		});
	}

	closeOpenMonthViewDay() {
		this.activeDayIsOpen = false;
	}

	async openModal(events, date) {
		const modal = await this.modalController.create({
			component: EventModal,
			componentProps: {
				events: events,
				date: date
			},
			backdropDismiss: false,
			cssClass: 'event-modal-container'
		});
		modal.onDidDismiss().then(eventsArray => {
			eventsArray.data.forEach(item => {
				if (this.events) {
					const index = this.events.findIndex(x => x.startId === item.startId);
					if (index !== -1) {
						this.events.splice(index, 1);
					}
					this.events.push(item);
				} else {
					this.events.push(item);
				}
			});
			this.viewDate = date;
		});
		return await modal.present();
	}

	closeModal() {
		this.modalController.dismiss(this.events);
	}

	testStyleChange() {
		const eventClasses = document.querySelectorAll('.cal-event');
		console.log(eventClasses);

		eventClasses.forEach(element => {
			const event = element as HTMLElement;
			console.log('event', event);
		});

		const classAll = document.getElementsByClassName('cal-event');
		console.log('classAll', classAll);

		/* console.log(this.events);

		const eventClasses = document.querySelectorAll('.cal-event');
		console.log(eventClasses);
		const lastElement = eventClasses.length - 1;
	//	eventClasses.forEach(element => {
	//		console.log('element', element);
	//		element.classList.replace('cal-event', 'cal-event-new');
	//	});
		eventClasses[lastElement].classList.replace('cal-event', 'cal-event-new');
		console.log(eventClasses[lastElement]); */
	}
}
