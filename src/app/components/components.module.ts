import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import {  RouterModule } from '@angular/router';

import { ProjectInfo } from './project-info/project-info';
import { ProjectImages } from './project-images/project-images';
import { ProjectDocuments } from './project-documents/project-documents';
import { ProjectCompanies } from './project-companies/project-companies';
import { ToDoListComponent } from './to-do-list/to-do-list.component';





@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule],
    declarations: [ProjectInfo, ProjectImages, ProjectDocuments, ProjectCompanies, ToDoListComponent],
    exports: [ProjectInfo, ProjectImages, ProjectDocuments, ProjectCompanies, ToDoListComponent]
})

export class ComponentsModule {}