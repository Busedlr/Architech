import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
	selector: 'todo-list-menu',
	templateUrl: './todo-list-menu.html',
	styleUrls: ['./todo-list-menu.scss']
})
export class TodoListMenu implements OnInit {
	constructor(public popoverController: PopoverController) {}

	ngOnInit() {}

	dismiss(action) {
		this.popoverController.dismiss(action);
	}
}
