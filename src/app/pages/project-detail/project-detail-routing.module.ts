import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectDetail } from './project-detail';

const routes: Routes = [
  {
    path: '',
    component: ProjectDetail
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectDetailRoutingModule {}
