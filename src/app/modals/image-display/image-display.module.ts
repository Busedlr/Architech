import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageDisplayModalPageRoutingModule } from './image-display-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageDisplayModalPageRoutingModule
  ],
  declarations: []
})
export class ImageDisplayModalPageModule {}
