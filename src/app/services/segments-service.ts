import { Injectable } from '@angular/core';
import { ProjectData } from './project-data';

@Injectable({
	providedIn: 'root'
})
export class SegmentsService {
	images: any[] = [];
	constructor(public projectData: ProjectData) {}

	async getImages() {
		this.images = [];
		const items = await this.projectData.getImages(
			this.projectData.currentProject.id
		);

		for (const item of items) {
			const url = await this.projectData.getDownloadUrl(item.fullPath);
			const metaData = await this.projectData.getMetadata(item.fullPath);
			const image = {
				url: url,
				fullPath: item.fullPath,
				name: metaData.customMetadata.docName
			};

			this.images.push(image);
		}
	}
}
