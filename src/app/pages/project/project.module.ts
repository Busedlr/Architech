import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectDetailRoutingModule } from './project-routing.module';
import { ProjectDetail } from './project';
import { ImageDisplayModalPage } from 'src/app/modals/image-display/image-display.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TodoListPage } from 'src/app/modals/todo-list/todo-list.page';
import { EditPopover } from 'src/app/components/segment-menu/segment-menu';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ProjectDetailRoutingModule,
		ComponentsModule,
	],
	declarations: [
		ProjectDetail,
		ImageDisplayModalPage,
		TodoListPage,
		EditPopover,
	],
	entryComponents: [ImageDisplayModalPage, TodoListPage, EditPopover],
})
export class ProjectDetailModule {}
