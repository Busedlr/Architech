import { Component, OnInit } from '@angular/core';

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
	selector: 'calendar-modal',
	templateUrl: './calendar.page.html',
	styleUrls: ['./calendar.page.scss']
})
export class CalendarPage implements OnInit {
	creatingEvent: boolean = true;

	ngOnInit() {
		var calendarEl = document.getElementById('calendar');
		console.log(this.creatingEvent);
		var calendar = new Calendar(calendarEl, {
			plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
			selectable: true,
			defaultView: 'dayGridMonth',
			header: {
				left: 'dayGridMonth,timeGridWeek,timeGridDay',
				center: 'title',
				right: 'prevYear,prev,next,nextYear'
			},
			editable: true,
			eventLimit: true,
			navLinks: true,
			dateClick() {
				this.creatingEvent = false;
				console.log(this.creatingEvent);
			},
			eventClick(event, element) {
				info.title = 'buse';
				alert('Event: ' + info.event.title);
				this.creatingEvent = true;
			}
			/* 		select(info) {
				const eventTitle = prompt('enter an event name ');
				if (eventTitle) {
					calendar.addEvent({
						title: eventTitle,
						start: info.startStr,
						end: info.endStr,
						allDay: true,
						id: new Date().toString()
					});
				}
			} */
		});

		calendar.render();
	}
}
