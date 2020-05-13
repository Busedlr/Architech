import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ProjectData } from './project-data';

@Injectable({
	providedIn: 'root'
})
export class CalendarData {
	currentMonthEvents: any[] = [];
	monthlyEvents: any[] = [];
	viewedDate: string;
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
				return true;
			});
	}

	deleteEvent(event) {
		return this.projectData.projectsRef
			.doc(this.projectData.currentProject.id)
			.collection('events')
			.doc(event.id)
			.delete()
			.then(res => {
				return res;
			});
	}

	createEvent(event) {
		this.projectData.projectsRef
			.doc(this.projectData.currentProject.id)
			.collection('events')
			.add(event)
			.then(doc => {
				return doc;
			})
			.catch(error => {
				console.log(error);
			});
	}

	async replaceEvent(event) {
		await this.deleteEvent(event);
		await this.createEvent(event);
	}

	getMonthlyEvents() {
		this.monthlyEvents = [];
		console.log('viewedDate', this.viewedDate);
		return this.projectData.projectsRef
			.doc(this.projectData.currentProject.id)
			.collection('events')
			.where('monthsSpan', 'array-contains', this.viewedDate)
			.get()
			.then(result => {
				console.log('res', result);
				result.docs.forEach(doc => {
					let event = doc.data();
					event.start = new Date(event.start.seconds * 1000);
					event.end = new Date(event.end.seconds * 1000);
					event.id = doc.id;
					this.monthlyEvents.push(event);
				});
				return this.monthlyEvents;
			});
	}
}
