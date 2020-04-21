import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';

import { Info } from './info/info';
import { Images } from './images/images';
import { Documents } from './documents/documents';
import { Companies } from './companies/companies';
import { Calendar } from './calendar/calendar';
import { ToDoList } from './todo-list/todo-list';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, RouterModule],
	declarations: [Info, Images, Documents, Companies, ToDoList, Calendar],
	exports: [Info, Images, Documents, Companies, ToDoList, Calendar]
})
export class ComponentsModule {}
