import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ProjectData } from 'src/app/services/project-data';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	db: any;
	projectsRef: any;
	loading: boolean;
	projects = [];

	constructor(public router: Router, public projectData: ProjectData) {
		this.getProjects();
	}

	getProjects() {
		this.loading = true;
		this.projectData.setProjects().then(() => {
			this.loading = false;
		});
	}

	goToDetail(project) {
		this.projectData.currentProject = project;
		this.router.navigate([
			'/project-detail/' + this.projectData.currentProject.id
		]);
	}
}
