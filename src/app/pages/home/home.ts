import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ProjectData } from 'src/app/services/project-data';

@Component({
	selector: 'home',
	templateUrl: 'home.html',
	styleUrls: ['home.scss']
})
export class Home {
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
		this.router.navigate(['/project/' + this.projectData.currentProject.id]);
	}
}
