import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProjectData } from 'src/app/services/project-data';
import { ImageDisplayModalPage } from 'src/app/modals/image-display-modal/image-display-modal.page';

@Component({
	selector: 'project-images',
	templateUrl: './project-images.html',
	styleUrls: ['./project-images.scss']
})
export class ProjectImages implements OnInit {
	@Input('projectId') projectId;
	files: any = [];
	images: any = [];
	checkedImages: any = [];
	editImages: boolean = false;
	loading: boolean = true;

	constructor(
		public projectData: ProjectData,
		public modalController: ModalController
	) {}

	ngOnInit() {
		this.getImages();
	}

	async selectFile(event) {
		for (const key of Object.keys(event.srcElement.files)) {
			const value = await event.srcElement.files[key];
			this.files.push(value);
		}
		this.saveImages();
	}

	resetInput(inputId) {
		let fileInput = document.getElementById(inputId) as HTMLInputElement;
		fileInput.value = '';
		this.files = [];
	}

	async saveImages() {
		try {
			await this.projectData.saveImages(this.files, this.projectId);
			this.getImages();
			console.log('success');
		} catch (error) {
			console.log(error);
		}
	}

	async getImages() {
		this.images = [];
		const items = await this.projectData.getImages(this.projectId);

		for (const item of items) {
			const url = await this.projectData.getDownloadUrl(item.fullPath);

			const image = {
				url: url,
				fullPath: item.fullPath,
				name: item.name
			};

			this.images.push(image);
		}
		this.loading = false;
	}

	toggleEditImages() {
		this.checkedImages = [];
		this.editImages = !this.editImages;
		if (!this.editImages) this.resetCheckedImages();
	}

	resetCheckedImages() {
		this.images.forEach((img, i) => {
			const checkbox = document.getElementById(i) as HTMLInputElement;
			checkbox.checked = false;
		});
	}

	imageClick(id, image) {
		if (this.editImages) {
			const checkbox = document.getElementById(id) as HTMLInputElement;
			checkbox.checked = !checkbox.checked;

			const index = this.checkedImages.findIndex(
				x => x.fullPath === image.fullPath
			);

			if (checkbox.checked) {
				this.checkedImages.push(image);
			} else {
				this.checkedImages.splice(index, 1);
			}
		} else {
			this.openModal(id);
		}
	}

	async deleteImages() {
		this.checkedImages.forEach(img => {
			console.log(img.name);
		});
		for (let image of this.checkedImages) {
			await this.projectData.deleteImage(image);
		}

		this.toggleEditImages();
		this.getImages();
	}

	async openModal(i) {
		const modal = await this.modalController.create({
			component: ImageDisplayModalPage,
			componentProps: {
				index: i,
				images: this.images
			}
		});
		return await modal.present();
	}

	dismiss() {
		this.modalController.dismiss({
			dismissed: true
		});
	}
}
