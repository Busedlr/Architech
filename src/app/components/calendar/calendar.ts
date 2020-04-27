import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';
import { ProjectData } from 'src/app/services/project-data';

@Component({
	selector: 'calendar',
	templateUrl: './calendar.html',
	styleUrls: ['./calendar.scss']
})
export class Calendar implements OnInit {
	@Input('project') project;
	constructor(
		public modalController: ModalController,
		public projectData: ProjectData
	) {}
	ngOnInit() {}

	async openModal() {
		const modal = await this.modalController.create({
			component: CalendarPage,
			componentProps: {
				events: this.project.events || []
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

			console.log('eventsDataDismissed', events.data);
		});
		return await modal.present();
	}
}
