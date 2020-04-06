import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ModalController, IonSlides, Events } from "@ionic/angular";

import { ProjectData } from "src/app/services/project-data";
import { ImageDisplayModalPage } from "src/app/modals/image-display/image-display.page";
import { SegmentsService } from "src/app/services/segments-service";

@Component({
  selector: "project-images",
  templateUrl: "./project-images.html",
  styleUrls: ["./project-images.scss"]
})
export class ProjectImages implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  @Input("projectId") projectId;
  files: any = [];
  images: any = [];
  slideOpts: any = {};
  loading: boolean = true;
  display: boolean = false;
  slidesPerView = this.projectData.settings.slides_per_view;
  modalStyleSheet: any;

  constructor(
    public projectData: ProjectData,
    public segmentsService: SegmentsService,
    public modalController: ModalController,
    public events: Events
  ) {
    this.slideOpts = {
      slidesPerView: this.projectData.settings.slides_per_view,
      freeMode: this.projectData.settings.free_mode,
      allowTouchMove: false
    };

    events.subscribe("change slide per view", number => {
      this.slidesPerView = number;
      this.changeSlidesPerView(number);
      //necessary to get the images again ?
      this.getImages();
      this.projectData.changeSettings("slides_per_view", number);
    });

    this.getModalStyleSheet();
  }

  async getImages() {
    await this.segmentsService.getImages();
    this.canSlide();
  }

  ngOnInit() {
    this.getImages();
  }

  async changeSlidesPerView(number) {
    const swiper = await this.slides.getSwiper();
    swiper.params.slidesPerView = number;
    this.canSlide();
  }

  canSlide() {
    this.slides.length().then(res => {
      if (res + 1 <= this.slidesPerView) {
        this.display = false;
      } else {
        this.display = true;
      }
    });
  }

  getModalStyleSheet() {
    this.modalStyleSheet = this.segmentsService.imageModalStyleSheet;
  }

  async openModal(openingImageIndex) {
    const modal = await this.modalController.create({
      component: ImageDisplayModalPage,
      componentProps: {
        index: openingImageIndex
      },
      cssClass: "images-modal"
    });
    return await modal.present();
  }


/* 
  calculateModalSize(i) {
    const myImg = document.getElementById(i) as HTMLImageElement;
    let width = myImg.naturalWidth;
    let height = myImg.naturalHeight;

    console.log("myImg", myImg);
    console.log("original width", width);
    console.log("original height", height);
    let maxModalWidth = window.outerWidth - (window.outerWidth / 100) * 20;
    let maxModalHeight = window.outerHeight - (window.outerHeight / 100) * 20;
    
    console.log("maxModalWidth", maxModalWidth);
    console.log("maxModalHeight", maxModalHeight);
    const aspectRatio = width / height;
    console.log("aspectRatio", aspectRatio);

    if (width > maxModalWidth) {
      width = maxModalWidth;
      height = width / aspectRatio;
    }
    if (height > maxModalHeight) {
      height = maxModalHeight;
      width = height * aspectRatio;
    }

    console.log("width", width);
    console.log("height", height);
    this.setModalSize(width, height);
  } */
  

 /*  setModalSize(width, height) {
    const stringWidth = width.toString() + "px";
    const stringHeight = height.toString() + "px";
    this.segmentsService.imageModalStyleSheet.cssRules[0].style.width = stringWidth;
    this.segmentsService.imageModalStyleSheet.cssRules[0].style.height = stringHeight;
  } */



  simulateClick(id) {
    document.getElementById(id).click();
  }

  ///

  ///

  ///

  ///

  /*
  on arrows in html 
  [ngClass]="{'hide': this.activeSlide === 0, 'display': activeSlide !== 0 }"
  [ngClass]="{'hide': endReached, 'display': !endReached }" */

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

  /* slide(number) {
    this.slides.length().then(res => {
      if (res > number) {
        this.endReached = false;
      } else {
        this.endReached = true;
      }
    });
  }

  async slideChanged() {
    this.activeSlide = await this.slides.getActiveIndex();
  }

  slideEndReached() {
    if (this.activeSlide > 0) {
      this.endReached = true;
    }
  }

  prevStarted() {
    if (this.endReached) {
      this.endReached = false;
    }
  } */
}
