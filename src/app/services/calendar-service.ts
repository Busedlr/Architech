import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ProjectData } from './project-data';

@Injectable({
	providedIn: 'root'
})
export class CalendarData {
	currentMonthEvents: any[] = [];
	monthlyEvents: any[] = [];
	constructor(public projectData: ProjectData) {}

	async getCurrentMonthEvents() {
		const currentMonth = moment().month() + 1;
		const currentDate = currentMonth.toString() + moment().year().toString();
		this.currentMonthEvents = [];
		return this.projectData.projectsRef
			.doc(this.projectData.currentProject.id)
			.collection('events')
			.where('monthsSpan', 'array-contains', currentDate)
			.get()
			.then(result => {
				result.docs.forEach(doc => {
					let event = doc.data();
					event.start = new Date(event.start.seconds * 1000);
					event.end = new Date(event.end.seconds * 1000);
					event.id = doc.id;
					this.currentMonthEvents.push(event);
					this.monthlyEvents.push(event);
				});
				console.log('currentMonthsEvents', this.currentMonthEvents);
				console.log('monthlyEvents', this.monthlyEvents);
				return true;
			});
	}

	/* getMonthlyEvents(viewedDate) {
		this.monthlyEvents = [];
		return this.projectsRef
			.doc(this.currentProject.id)
			.collection('events')
			.where('monthsSpan', 'array-contains', viewedDate)
			.get()
			.then(result => {
				result.docs.forEach(doc => {
					let event = doc.data();
					event.start = new Date(event.start.seconds * 1000);
					event.end = new Date(event.end.seconds * 1000);
					event.id = doc.id;
					this.monthlyEvents.push(event);
				});
				return true;
			});
	} */
}
