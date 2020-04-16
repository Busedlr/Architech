import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { TodoListPage } from 'src/app/modals/todo-list/todo-list.page';
import { ProjectData } from 'src/app/services/project-data';

@Component({
	selector: 'todo-list',
	templateUrl: './todo-list.html',
	styleUrls: ['./todo-list.scss']
})
export class ToDoList implements OnInit {
	@Input('project') project;
	items: any = [];
	constructor(
		public modalController: ModalController,
		public projectData: ProjectData,
		public events: Events
	) {}

	ngOnInit() {
		if (this.project.list) {
			this.items = this.project.list;
		}
	}

	async openModal() {
		const modal = await this.modalController.create({
			component: TodoListPage,
			componentProps: {
				items: this.items
			},
			cssClass: 'modal-container'
		});
		modal.onDidDismiss().then(list => {
			if (list.data !== undefined) {
				this.projectData.updateProjectProp(this.project.id, 'list', list.data);
			}
		});
		return await modal.present();
	}
}
