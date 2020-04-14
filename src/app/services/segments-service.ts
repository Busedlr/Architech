import { Injectable } from '@angular/core';
import { ProjectData } from './project-data';
import { Events } from '@ionic/angular';

@Injectable({
	providedIn: 'root',
})
export class SegmentsService {
	images: any[] = [];
	documents: any[] = [];
	segmentName: any;
	imageModalStyleSheet;
	editMode: boolean = false;
	itemClicked: any;
	activeIndex: any;
	itemsToDelete: any[] = [];
	chosenItems: any[] = [];
	chosenItemIndex: any;

	constructor(public projectData: ProjectData, public events: Events) {
		this.getModalStyleSheet();
	}

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
				name: metaData.customMetadata.name,
				flagged: false,
			};

			this.images.push(image);
		}
	}

	async getDocuments() {
		this.documents = [];
		const items = await this.projectData.getDocuments(
			this.projectData.currentProject.id
		);
		for (const item of items) {
			const url = await this.projectData.getDownloadUrl(item.fullPath);
			const metaData = await this.projectData.getMetadata(item.fullPath);

			const document = {
				url: url,
				fullPath: item.fullPath,
				name: metaData.customMetadata.name,
				extension: metaData.customMetadata.extension,
				iconSrc:
					'../../assets/icon/' +
					metaData.customMetadata.extension.substring(1) +
					'.svg',
			};
			this.documents.push(document);
		}
	}

	getModalStyleSheet() {
		const styleSheets = document.styleSheets;
		for (let index = 0; index < styleSheets.length; ++index) {
			const sheet = styleSheets[index];
			if (sheet.title === 'modal-style') this.imageModalStyleSheet = sheet;
		}
	}

	async toggleEditMode(itemClicked?) {
		this.editMode = !this.editMode;
		if (itemClicked) {
			this.itemClicked = false;
		} else {
			this.itemClicked = this.activeIndex;
		}
		if (this.itemsToDelete) {
			this.itemsToDelete.forEach((item) => {
				this.projectData.delete(item).then(() => {
					this.itemsToDelete = [];
				});
			});
			if (this.images.length === 0) {
				this.editMode = false;
			}
		}
	}

	getActiveImageIndex() {
		this.events.publish('get-active-index');
	}

	getDocType(file) {
		let extention = '.' + file.name.substr(file.name.lastIndexOf('.') + 1);
		return extention;
	}
}
