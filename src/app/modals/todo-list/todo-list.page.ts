import { Component, OnInit } from '@angular/core';
import {
	NavController,
	ModalController,
	Events,
	PopoverController
} from '@ionic/angular';
import { TodoListMenu } from 'src/app/components/todo-list-menu/todo-list-menu';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

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
	editing: boolean;
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
			this.addControl(item, i);
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
			const dataObj = res.data;
			switch (dataObj.action) {
				case 'delete':
					this.deleteItem(item);
					break;
				case 'label':
					this.labelItem(item, dataObj.detail);
					break;
			}
			console.log(item);
		});
		return await popover.present();
	}

	addItem() {
		const item = {
			title: '',
			detail: '',
			checked: false,
			editing: true,
			newlyAdded: true,
			label: 'transparent',
			id: Date.now().toString()
		};

		this.editing = true;

		this.items.push(item);
		const lastIndex = this.items.length - 1;
		this.items[lastIndex].titleControl = `title${lastIndex}`;
		this.items[lastIndex].detailControl = `detail${lastIndex}`;

		setTimeout(() => {
			this.focusNewInput(item.id);
		}, 200);

		this.addControl(item, lastIndex);
	}

	addControl(item, i) {
		this.todoForm.addControl(`title${i}`, new FormControl(item.title));
		this.todoForm.addControl(`detail${i}`, new FormControl(item.detail));
	}

	focusNewInput(inputId) {
		const input = document.getElementById(inputId) as HTMLInputElement;
		input.focus();
	}

	editItem(item) {
		if (this.editing === true) {
			return;
		} else {
			this.editing = true;
			item.editing = true;
		}
		item.titlePrevValue = this.todoForm.controls[item.titleControl].value;
		item.detailPrevValue = this.todoForm.controls[item.detailControl].value;
	}

	checkEnter(item, ev) {
		if (ev.key === 'Enter') this.saveItem(item);
		else return;
	}

	saveItem(item) {
		if (this.todoForm.controls[item.titleControl].value === '') {
			return;
		} else {
			if (item.newlyAdded) {
				this.addItem();
				item.newlyAdded = false;
			} else {
				this.editing = false;
			}
			item.editing = false;
		}
	}

	toggleEdit(item, val) {
		if (val === false) {
			if (this.todoForm.controls[item.titleControl].value === '') {
				return;
			} else {
				if (item.newlyAdded) {
					this.addItem();
				}
				item.newlyAdded = false;
			}
		}

		if (val === true) {
			if (this.editing === true) return;
			item.titlePrevValue = this.todoForm.controls[item.titleControl].value;
			item.detailPrevValue = this.todoForm.controls[item.detailControl].value;
		}

		item.editing = val;
		this.editing = val;
	}

	cancelEdit(item) {
		item.editing = false;
		this.editing = false;

		if (item.newlyAdded) {
			this.todoForm.removeControl(item.titleControl);
			this.todoForm.removeControl(item.detailControl);
			this.items.pop();
		} else {
			this.todoForm.get(item.titleControl).setValue(item.titlePrevValue);
			this.todoForm.get(item.titleControl).updateValueAndValidity();
			this.todoForm.get(item.detailControl).setValue(item.detailPrevValue);
			this.todoForm.get(item.detailControl).updateValueAndValidity();
		}
	}

	deleteItem(item) {
		const index = this.items.indexOf(item);
		this.todoForm.removeControl(item.titleControl);
		this.todoForm.removeControl(item.detailControl);
		this.items.splice(index, 1);
	}

	labelItem(item, color) {
		item.label = color;
	}

	toggleItemCheck(item) {
		item.checked = !item.checked;
	}

	closeAndSave() {
		const saveObject = { form: this.todoForm, items: this.items };
		this.modalController.dismiss(saveObject);
		this.items.forEach(item => {
			item.editing = false;
		});
		this.editing = false;
	}
}
