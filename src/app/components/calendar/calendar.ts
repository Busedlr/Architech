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
	events: any;
	constructor(
		public modalController: ModalController,
		public projectData: ProjectData
	) {}
	ngOnInit() {
		this.getMonthlyEvents();
	}

	getMonthlyEvents() {
		const currentMonth = moment().month() + 1;
		const currentDate = currentMonth.toString() + moment().year().toString();
		console.log('currentDate', currentDate);
		this.projectData.getMonthlyEvents(currentDate);
	}

	async openModal() {
		const modal = await this.modalController.create({
			component: CalendarPage,
			componentProps: {
				events: this.events || []
			},
			cssClass: 'large-modal',
			backdropDismiss: false
		});
		modal.onDidDismiss().then(events => {
			this.projectData.updateProjectProp(
				this.project.id,
				'events',
				events.data
			);
			this.projectData.getProjectById(this.project.id).then(res => {
				this.project = res.data();
				this.events = this.project.events;
			});
		});
		return await modal.present();
	}
}
