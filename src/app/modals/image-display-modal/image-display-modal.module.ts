import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageDisplayModalPageRoutingModule } from './image-display-modal-routing.module';

import { ImageDisplayModalPage } from './image-display-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageDisplayModalPageRoutingModule
  ],
  declarations: [ImageDisplayModalPage]
})
export class ImageDisplayModalPageModule {}
