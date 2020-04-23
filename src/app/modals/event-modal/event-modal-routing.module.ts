import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventModal } from './event-modal.page';

const routes: Routes = [
	{
		path: '',
		component: EventModal
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EventModalRoutingModule {}
