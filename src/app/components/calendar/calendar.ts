import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

@Component({
	selector: 'calendar',
	templateUrl: './calendar.html',
	styleUrls: ['./calendar.scss']
})
export class Calendar implements OnInit {
	constructor(public modalController: ModalController) {}
	ngOnInit() {}

	async openModal() {
		const modal = await this.modalController.create({
			component: CalendarPage,
			/* componentProps: {
				items: this.items
			}, */
			cssClass: 'large-modal',
			backdropDismiss: false
		});
		modal.onDidDismiss().then(() => {});
		return await modal.present();
	}
}
