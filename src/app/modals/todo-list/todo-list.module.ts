import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoListPageRoutingModule } from './todo-list-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoListPageRoutingModule
  ],
  declarations: []
})
export class TodoListPageModule {}
