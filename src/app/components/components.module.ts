import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import {  RouterModule } from '@angular/router';

import { ProjectInfo } from './project-info/project-info';
import { ProjectImages } from './project-images/project-images';
import { ProjectDocuments } from './project-documents/project-documents';
import { ProjectCompanies } from './project-companies/project-companies';
import { ToDoList } from './project-to-do-list/project-to-do-list';





@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule],
    declarations: [ProjectInfo, ProjectImages, ProjectDocuments, ProjectCompanies, ToDoList],
    exports: [ProjectInfo, ProjectImages, ProjectDocuments, ProjectCompanies, ToDoList]
})

export class ComponentsModule {}