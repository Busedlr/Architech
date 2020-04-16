import { Component, OnInit } from '@angular/core';
import {
	NavController,
	ModalController,
	Events,
	PopoverController
} from '@ionic/angular';
import { TodoListMenu } from 'src/app/components/todo-list-menu/todo-list-menu';

@Component({
	selector: 'project-todo-list',
	templateUrl: './todo-list.page.html',
	styleUrls: ['./todo-list.page.scss']
})
export class TodoListPage implements OnInit {
	items: any[];
	selectedItem: any;
	newItem: any;
	newItemDetail = '';
	addItemMode: boolean = false;
	editMode: boolean = false;

	constructor(
		public navCtrl: NavController,
		public modalController: ModalController,
		public events: Events,
		public popoverController: PopoverController
	) {}

	ngOnInit() {
		console.log('items', this.items);
	}

	async presentPopover(ev: any, item) {
		this.selectedItem = item;
		const popover = await this.popoverController.create({
			component: TodoListMenu,
			event: ev,
			translucent: true
		});
		popover.onWillDismiss().then(res => {
			const action = res.data;
			switch (action) {
				case 'delete':
					this.deleteItem();
					break;
				case 'edit':
					this.editItem();
					break;
				case 'label':
					this.labelItem();
					break;
			}
		});
		return await popover.present();
	}

	addItemModeOn() {
		this.addItemMode = true;
	}

	addItem() {
		if (this.newItem) {
			let item = {
				title: this.newItem,
				detail: this.newItemDetail,
				checked: false
			};
			this.items.push(item);
			this.newItem = null;
			this.newItemDetail = null;
		}
	}

	editItem() {
		this.editMode = true;
		this.addItemMode = true;
		const title = document.getElementById('title') as HTMLInputElement;
		const detail = document.getElementById('detail') as HTMLInputElement;
		title.value = this.selectedItem.title;
		detail.value = this.selectedItem.detail;
	}

	confirmEdits() {
		const title = document.getElementById('title') as HTMLInputElement;
		const detail = document.getElementById('detail') as HTMLInputElement;
		this.selectedItem.title = title.value;
		this.selectedItem.detail = detail.value;
		title.value = '';
		detail.value = '';
		this.editMode = false;
		this.selectedItem = '';
		this.addItemMode = false;
		this.newItem = null;
		this.newItemDetail = null;
	}

	deleteItem() {
		console.log('deleting');
		const index = this.items.indexOf(this.selectedItem);
		this.items.splice(index, 1);
		this.selectedItem = '';
	}

	labelItem() {
		console.log('labeling');
	}

	toggleItemCheck(item) {
		item.checked = !item.checked;
	}

	save() {
		this.modalController.dismiss(this.items);
	}

	ioncheckbox(event) {
		console.log('event', event);
	}

	check(item) {
		console.log('item', item);
	}

	close() {
		this.addItemMode = false;
		this.editMode = false;
	}
}
