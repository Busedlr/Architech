import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProjectDetailRoutingModule } from './project-detail-routing.module';
import { ProjectDetail } from './project-detail';
import { ImageDisplayModalPage } from 'src/app/modals/image-display/image-display.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectDetailRoutingModule,
    ComponentsModule
  ],
  declarations: [ProjectDetail, ImageDisplayModalPage],
  entryComponents: [
    ImageDisplayModalPage
  ]
})
export class ProjectDetailModule {}
