import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
	selector: 'todo-list-menu',
	templateUrl: './todo-list-menu.html',
	styleUrls: ['./todo-list-menu.scss']
})
export class TodoListMenu implements OnInit {
	label: boolean = false;
	constructor(public popoverController: PopoverController) {}

	ngOnInit() {}

	dismiss(action, detail?) {
		let dataObj = {
			action: action
		};

		if (detail) {
			dataObj['detail'] = detail;
		}
		this.popoverController.dismiss(dataObj);
	}

	chooseLabel() {
		this.label = true;
	}
}
