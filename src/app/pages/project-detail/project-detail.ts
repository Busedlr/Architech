import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectData } from 'src/app/services/project-data';

@Component({
	selector: 'project-detail',
	templateUrl: './project-detail.html',
	styleUrls: ['./project-detail.scss']
})
export class ProjectDetail implements OnInit {
	project: any;
	loading: boolean;
	segment: any = 'images';

	constructor(public projectData: ProjectData, public route: ActivatedRoute) {}

	ngOnInit() {
		this.getProject();
	}

	segmentChanged(event) {
		this.segment = event.detail.value;
	}

	async getProject() {
		this.loading = true;
		const id = this.route.snapshot.paramMap.get('id');
		const project = await this.projectData.getProjectById(id);
		this.project = project.data();
		this.project.id = id;
		this.loading = false;
	}

	/* async selectFile(event) {
    for (const key of Object.keys(event.srcElement.files)) {
      const value = await event.srcElement.files[key];
      this.files.push(value);
    }
    this.saveImages();
  } */

	/*  resetInput(inputId) {
    let fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
    this.files = [];
  } */

	/* async saveImages() {
    try {
      await this.projectData.saveImages(this.files, this.project.id);
      this.getImages();
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  } */

	/* toggleEditImages() {
    this.checkedImages = [];
    this.editImages = !this.editImages;
    if (!this.editImages) this.resetCheckedImages();
  } */

	/* resetCheckedImages() {
    this.images.forEach((img, i) => {
      const checkbox = document.getElementById(i) as HTMLInputElement;
      checkbox.checked = false;
    });
  } */

	/* async getImages() {
    this.images = [];
    const items = await this.projectData.getImages(this.project.id);

    for (const item of items) {
      const url = await this.projectData.getDownloadUrl(item.fullPath);

      const image = {
        url: url,
        fullPath: item.fullPath
      };

      this.images.push(image);
    }
  } */

	/* imageClick(id, image) {
    if (this.editImages) {
      const checkbox = document.getElementById(id) as HTMLInputElement;
      checkbox.checked = !checkbox.checked;

      const index = this.checkedImages.findIndex(
        x => x.fullpath === image.fullPath
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
  } */
}
