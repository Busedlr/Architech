import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';
import { ProjectData } from 'src/app/services/project-data';
import { CalendarData } from 'src/app/services/calendar-service';
import { FormatDatePipe } from 'src/app/pipes/format-date.pipe';

@Component({
	selector: 'upcoming-events',
	templateUrl: './upcoming-events.html',
	styleUrls: ['./upcoming-events.scss']
})
export class UpcomingEvents implements OnInit {
	monthlyEvents: any[] = [];
	constructor(
		public modalController: ModalController,
		public projectData: ProjectData,
		public calendarData: CalendarData,
		public formatDate: FormatDatePipe
	) {}
	ngOnInit() {}

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
