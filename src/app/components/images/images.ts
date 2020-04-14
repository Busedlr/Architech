import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
	AlertController,
	ModalController,
	IonSlides,
	Events,
} from '@ionic/angular';

import { ProjectData } from 'src/app/services/project-data';
import { ImageDisplayModalPage } from 'src/app/modals/image-display/image-display.page';
import { SegmentsService } from 'src/app/services/segments-service';

@Component({
	selector: 'images',
	templateUrl: './images.html',
	styleUrls: ['./images.scss'],
})
export class Images implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  @Input("projectId") projectId;
  files: any = [];
  images: any = [];
  slideOpts: any = {};
  loading: boolean = true;
  changeNameClicked: boolean = false;
  slidesPerView = this.projectData.settings.slider.slides_per_view;

  constructor(
    public projectData: ProjectData,
    public segmentsService: SegmentsService,
    public modalController: ModalController,
    public alertController: AlertController,
    public events: Events
  ) {
    this.slideOpts = {
      slidesPerView: this.projectData.settings.slider.slides_per_view,
      freeMode: this.projectData.settings.slider.free_mode,
      allowTouchMove: false,
    };

    events.subscribe("get-active-index", () => {
      this.slides.getActiveIndex().then((res) => {
        this.segmentsService.activeIndex = res;
      });
    });

    events.subscribe("change slide per view", (number) => {
      this.slidesPerView = number;
      this.changeSlidesPerView(number);
      //necessary to get the images again ?
      this.getImages();
      this.projectData.changeSettings("slider.slides_per_view", number);
    });
  }

  async getImages() {
    await this.segmentsService.getImages();
  }

  ngOnInit() {
    this.getImages();
  }

  async changeSlidesPerView(number) {
    const swiper = await this.slides.getSwiper();
    swiper.params.slidesPerView = number;
    this.projectData.settings.slider.slides_per_view = number;
  }

  imageClick(openingImageIndex) {
    if (!this.segmentsService.editMode) {
      this.openModal(openingImageIndex);
    } else {
      this.segmentsService.itemClicked = openingImageIndex;
    }
  }

  async openModal(openingImageIndex) {
    const modal = await this.modalController.create({
      component: ImageDisplayModalPage,
      componentProps: {
        index: openingImageIndex,
      },
      cssClass: "images-modal",
    });
    return await modal.present();
  }

  simulateClick(id) {
    document.getElementById(id).click();
  }

  async deleteImage() {
    let item = this.segmentsService.images[this.segmentsService.itemClicked];
    this.segmentsService.itemsToDelete.push(item);
    this.segmentsService.images.splice(this.segmentsService.itemClicked, 1);
    if (this.segmentsService.images.length <= 0) {
      this.segmentsService.toggleEditMode();
      this.segmentsService.itemClicked = null;
    }
  }

  onChangeName() {
    this.changeNameClicked = true;
  }
  async changeName(id, image) {
    this.changeNameClicked = false;
    const newName = document.getElementById(id) as HTMLInputElement;
    if (newName.value) {
      const name = newName.value + this.segmentsService.getDocType(image);
      const metadata = await this.projectData.updateMetadata(
        name,
        "extension",
        image.fullPath
      );
      this.segmentsService.images[this.segmentsService.itemClicked].name =
        metadata.customMetadata.name;
    }
  }

  closeChangeName() {
    this.changeNameClicked = false;
  }

  /* selectItem(i, item) {
    this.segmentsService.chosenItemIndex = i;
    this.segmentsService.chosenItems.push(item);
    console.log("select", this.segmentsService.chosenItems);
  } */

 /*  unselectItem(item) {
    this.segmentsService.chosenItemIndex = null;
    const findIndex = img => img === item;
    const index = this.segmentsService.chosenItems.findIndex(findIndex);
    console.log("index",index)
    this.segmentsService.chosenItems.splice(index, 1);
    console.log("unselect", this.segmentsService.chosenItems);
  } */
}
