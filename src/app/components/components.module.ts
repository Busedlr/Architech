import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Info } from './info/info';
import { Images } from './images/images';
import { Documents } from './documents/documents';
import { Companies } from './companies/companies';
import { UpcomingEvents } from './upcoming-events/upcoming-events';
import { ToDoList } from './todo-list/todo-list';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, RouterModule, PipesModule],
	declarations: [Info, Images, Documents, Companies, ToDoList, UpcomingEvents],
	exports: [Info, Images, Documents, Companies, ToDoList, UpcomingEvents]
})
export class ComponentsModule {}
