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

	dismiss(labelColor) {
		this.popoverController.dismiss(labelColor);
	}
}
