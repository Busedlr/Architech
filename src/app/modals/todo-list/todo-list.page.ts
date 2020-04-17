import { Component, OnInit } from '@angular/core';
import {
	NavController,
	ModalController,
	Events,
	PopoverController
} from '@ionic/angular';
import { TodoListMenu } from 'src/app/components/todo-list-menu/todo-list-menu';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
	todoForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		public modalController: ModalController,
		public events: Events,
		public popoverController: PopoverController,
		public fb: FormBuilder
	) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.todoForm = this.fb.group({});
		this.items.map((item, i) => {
			this.todoForm.addControl(`title${i}`, new FormControl(item.title));
			this.todoForm.addControl(`detail${i}`, new FormControl(item.detail));
			item.titleControl = `title${i}`;
			item.detailControl = `detail${i}`;
		});
	}

	async presentPopover(ev: any, item) {
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
					this.editItem(item);
					break;
				case 'label':
					this.labelItem('red');
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

	editItem(item) {
		item.editing = true;
	}

	/* editItem() {
		this.editMode = true;
		this.addItemMode = true;
		const title = document.getElementById('title') as HTMLInputElement;
		const detail = document.getElementById('detail') as HTMLInputElement;
		title.value = this.selectedItem.title;
		detail.value = this.selectedItem.detail;
	} */

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
		const index = this.items.indexOf(this.selectedItem);
		this.items.splice(index, 1);
		this.selectedItem = '';
	}

	labelItem(color) {}

	toggleItemCheck(item) {
		item.checked = !item.checked;
	}

	closeAndSave() {
		const saveObject = { form: this.todoForm, items: this.items };
		this.modalController.dismiss(saveObject);
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
