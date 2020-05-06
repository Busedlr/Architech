import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';
import { ProjectData } from 'src/app/services/project-data';
import * as moment from 'moment';

@Component({
	selector: 'calendar',
	templateUrl: './calendar.html',
	styleUrls: ['./calendar.scss']
})
export class Calendar implements OnInit {
	@Input('project') project;
	currentMonthsEvents: any[] = [];
	monthlyEvents: any[] = [];
	constructor(
		public modalController: ModalController,
		public projectData: ProjectData
	) {}
	ngOnInit() {
		this.getCurrentMonthsEvents();
	}

	async getCurrentMonthsEvents() {
		const currentMonth = moment().month() + 1;
		this.projectData.currentDate =
			currentMonth.toString() + moment().year().toString();
		await this.projectData.getCurrentMonthsEvents();
		this.currentMonthsEvents = this.projectData.currentMonthsEvents;
		this.monthlyEvents = this.projectData.monthlyEvents;
	}

	async openModal() {
		const modal = await this.modalController.create({
			component: CalendarPage,
			componentProps: {
				events: this.monthlyEvents || []
			},
			cssClass: 'large-modal',
			backdropDismiss: false
		});

		modal.onDidDismiss().then(() => {
			this.monthlyEvents.forEach(event => {
				if (event.modified && event.id) {
					this.projectData.deleteEvent(event).then(() => {
						this.projectData.saveEvents(event);
					});
				}
				if (!event.id) {
					this.projectData.saveEvents(event);
				}
			});
		});

		/* 	this.projectData.updateProjectProp(
				this.project.id,
				'events',
				events.data
			);
			this.projectData.getProjectById(this.project.id).then(res => {
				this.project = res.data();
				this.monthlyEvents = this.project.events;
			}); */

		return await modal.present();
	}
}
