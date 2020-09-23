import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		CalendarPageRoutingModule,
		CalendarPage,
		PipesModule
	],
	declarations: [CalendarPage],
	providers: []
})
export class CalendarPageModule {}
