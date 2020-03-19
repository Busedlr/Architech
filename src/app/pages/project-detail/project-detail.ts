import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectData } from 'src/app/services/project-data';

@Component({
	selector: 'project-detail',
	templateUrl: './project-detail.html',
	styleUrls: ['./project-detail.scss']
})
export class ProjectDetail implements OnInit {
	loading: boolean;
	segment: any = 'images';

	constructor(
		public projectData: ProjectData,
		public route: ActivatedRoute,
		public router: Router
	) {}

	async ngOnInit() {
		this.loading = true;
		if (!this.projectData.currentProject) {
			const projectRes = await this.projectData.getProjectById(
				this.route.snapshot.params.id
			);
			console.log('projectRes', projectRes);
			this.projectData.currentProject = projectRes.data();
			this.projectData.currentProject.id = projectRes.id;

			console.log('currentProject', this.projectData.currentProject);
		}
		this.loading = false;
	}

	segmentChanged(event) {
		this.segment = event.detail.value;
	}

	goHome() {
		this.router.navigate(['/home/']);
	}
}
