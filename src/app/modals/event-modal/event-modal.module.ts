import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventModalRoutingModule } from './event-modal-routing.module';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, EventModalRoutingModule],
	declarations: []
})
export class EventModalModule {}
