import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProjectData } from 'src/app/services/project-data';
import { Images } from 'src/app/components/images/images';
import { PopoverController } from '@ionic/angular';
import { EditPopover } from 'src/app/components/segment-menu/segment-menu';
import { SegmentsService } from 'src/app/services/segments-service';

@Component({
	selector: 'project',
	templateUrl: './project.html',
	styleUrls: ['./project.scss'],
})
export class ProjectDetail implements OnInit {
	@ViewChild(Images, { static: false }) child: Images;
	loading: boolean;
	segment: any = 'image';
	images: any = [];

	constructor(
		public projectData: ProjectData,
		public route: ActivatedRoute,
		public router: Router,
		public popoverController: PopoverController,
		public segmentsService: SegmentsService
	) {}

	async ngOnInit() {
		this.loading = true;
		if (!this.projectData.currentProject) {
			const projectRes = await this.projectData.getProjectById(
				this.route.snapshot.params.id
			);

			this.projectData.currentProject = projectRes.data();
			this.projectData.currentProject.id = projectRes.id;
			this.segmentsService.segmentName = this.segment;
		}

		this.images = await this.projectData.getImagesNEW();

		this.loading = false;
	}

	async segmentChanged(event) {
		this.segment = event.detail.value;
		this.segmentsService.segmentName = this.segment;
	}

	goHome() {
		this.router.navigate(['/home/']);
	}

	changeSlidesPerView(number) {
		this.child.changeSlidesPerView(number);
	}

	async presentPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: EditPopover,
			event: ev,
			translucent: true,
		});
		this.segmentsService.getActiveImageIndex();
		return await popover.present();
	}
}
