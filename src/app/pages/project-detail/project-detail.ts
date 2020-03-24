import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectData } from 'src/app/services/project-data';
import { ProjectImages } from 'src/app/components/project-images/project-images';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';


@Component({
	selector: 'project-detail',
	templateUrl: './project-detail.html',
	styleUrls: ['./project-detail.scss']
})
export class ProjectDetail implements OnInit {
	@ViewChild(ProjectImages, {static: false} ) child: ProjectImages ;
	loading: boolean;
	segment: any = 'images';

	constructor(
		public projectData: ProjectData,
		public route: ActivatedRoute,
		public router: Router,
		public popoverController : PopoverController
	) {}

	async ngOnInit() {
		this.loading = true;
		if (!this.projectData.currentProject) {
			const projectRes = await this.projectData.getProjectById(
				this.route.snapshot.params.id
			);
			this.projectData.currentProject = projectRes.data();
			this.projectData.currentProject.id = projectRes.id;
		}
		this.loading = false;
	}

	segmentChanged(event) {
		this.segment = event.detail.value;
	}

	goHome() {
		this.router.navigate(['/home/']);
	}

	callAddImage()  {
		this.child.simulateClick('projectImage')
	}

	changeSlidesPerView(number) {
		this.child.changeSlidesPerView(number)
	}

	async presentPopover(ev: any) {
		const popover = await this.popoverController.create({
		  component: PopoverComponent,
		  event: ev,
		  translucent: true
		});
		return await popover.present();
	  }
	}

