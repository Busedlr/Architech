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
			cssClass: 'modal-container',
			backdropDismiss: false
		});
		modal.onDidDismiss().then(saveObject => {
			if (!saveObject.data.form.pristine) {
				this.saveForm(saveObject.data.form, saveObject.data.items);
			}
		});
		return await modal.present();
	}

	saveForm(form, items) {
		const todoList = [];
		items.forEach((item, i) => {
			const title = `title${i}`;
			const detail = `detail${i}`;

			const todo = {
				title: form.controls[title].value,
				detail: form.controls[detail].value,
				checked: item.checked
			};
			todoList.push(todo);
		});

		this.projectData.updateProjectProp(this.project.id, 'list', todoList);
	}
}
