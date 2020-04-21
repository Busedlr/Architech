import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectDetailRoutingModule } from './project-routing.module';
import { ProjectDetail } from './project';
import { ImageDisplayModalPage } from 'src/app/modals/image-display/image-display.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TodoListPage } from 'src/app/modals/todo-list/todo-list.page';
import { SegmentMenu } from 'src/app/components/segment-menu/segment-menu';
import { TodoListMenu } from 'src/app/components/todo-list-menu/todo-list-menu';
import { CalendarPage } from 'src/app/modals/calendar/calendar.page';

/* Angular Calendar */
//import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ProjectDetailRoutingModule,
		ComponentsModule,
		ReactiveFormsModule,
		NgbModalModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		})
	],
	declarations: [
		ProjectDetail,
		ImageDisplayModalPage,
		TodoListPage,
		SegmentMenu,
		TodoListMenu,
		CalendarPage
	],
	entryComponents: [
		ImageDisplayModalPage,
		TodoListPage,
		SegmentMenu,
		TodoListMenu,
		CalendarPage
	]
})
export class ProjectDetailModule {}
