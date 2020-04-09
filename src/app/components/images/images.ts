import { Component, OnInit, Input, ViewChild } from "@angular/core";
import {
  AlertController,
  ModalController,
  IonSlides,
  Events,
} from "@ionic/angular";

import { ProjectData } from "src/app/services/project-data";
import { ImageDisplayModalPage } from "src/app/modals/image-display/image-display.page";
import { SegmentsService } from "src/app/services/segments-service";

@Component({
  selector: "images",
  templateUrl: "./images.html",
  styleUrls: ["./images.scss"],
})
export class Images implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  @Input("projectId") projectId;
  files: any = [];
  images: any = [];
  slideOpts: any = {};
  loading: boolean = true;
  slidesPerView = this.projectData.settings.slides_per_view;

  constructor(
    public projectData: ProjectData,
    public segmentsService: SegmentsService,
    public modalController: ModalController,
    public alertController: AlertController,
    public events: Events
  ) {
    this.slideOpts = {
      slidesPerView: this.projectData.settings.slides_per_view,
      freeMode: this.projectData.settings.free_mode,
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
      this.projectData.changeSettings("slides_per_view", number);
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
    this.projectData.settings.slides_per_view = number;
  }

  imageClick(openingImageIndex) {
    if (!this.segmentsService.editMode) {
      this.openModal(openingImageIndex);
    } else {
      this.segmentsService.imageClicked = openingImageIndex;
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
    let image = this.segmentsService.images[this.segmentsService.imageClicked];
    await this.projectData.deleteImage(image);
    this.segmentsService.getImages();
  }

  /* toggleEditImages() {
    this.checkedImages = [];
    this.editImages = !this.editImages;
    if (!this.editImages) this.resetCheckedImages();
  } */

  /* resetCheckedImages() {
    for full screen page
    this.images.forEach((img, i) => {
      const checkbox = document.getElementById(i) as HTMLInputElement;
      checkbox.checked = false;
    });
  } */

  /* async deleteImages() {
    for full screen page
    this.checkedImages.forEach(img => {
      console.log(img.name);
    });
    for (let image of this.checkedImages) {
      await this.projectData.deleteImage(image);
    }

    this.toggleEditImages();
    this.getImages();
  } */

  /* imageClick(id, image) {
    for full screen page
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
  } */
}
