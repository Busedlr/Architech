import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageDisplayModalPage } from './image-display-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ImageDisplayModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class ImageDisplayModalPageRoutingModule {}
