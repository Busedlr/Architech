import { Component, OnInit } from '@angular/core';
import { ProjectData } from 'src/app/services/project-data';
import { SegmentsService } from 'src/app/services/segments-service';

@Component({
	selector: 'app-popover',
	templateUrl: './popover.component.html',
	styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
	files: any[] = [];
	changeClicked: boolean = false;
	constructor(
		public projectData: ProjectData,
		public segmentsService: SegmentsService
	) {}

	ngOnInit() {}

	resetInput(inputId) {
		let fileInput = document.getElementById(inputId) as HTMLInputElement;
		fileInput.value = '';
		this.files = [];
	}

	async selectFile(event) {
		for (const key of Object.keys(event.srcElement.files)) {
			const value = await event.srcElement.files[key];
			this.files.push(value);
		}
		this.saveImages();
	}

	async saveImages() {
		try {
			await this.projectData.saveToStorage(
				this.files,
				this.projectData.currentProject.id,
				'images'
			);
		} catch (error) {
			console.log(error);
		}
		this.segmentsService.getImages();
	}

	confirmChangeClicked() {
		this.changeClicked = true;
	}

	changePerView(number) {
		console.log('number of images', number);
	}
}
