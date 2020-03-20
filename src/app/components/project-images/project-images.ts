import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ModalController, IonSlides } from "@ionic/angular";

import { ProjectData } from "src/app/services/project-data";
import { ImageDisplayModalPage } from "src/app/modals/image-display/image-display.page";

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
  checkedImages: any = [];
  editImages: boolean = false;
  loading: boolean = true;
  canSlide: boolean = false;
  canDetectReachEnd: number = 0;
  slideTouched: boolean = false;
  hideArrowNext: boolean = false;

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
    fileInput.value = "";
    this.files = [];
  }

  async saveImages() {
    try {
      await this.projectData.saveToStorage(
        this.files,
        this.projectId,
        "images"
      );
      this.getImages();
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  }

  async getImages() {
    this.images = [];
    const items = await this.projectData.getImages(this.projectId);

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

  slideOpts = {
    slidesPerView: 4,
    freeMode: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  };

  slide() {
    this.slides.length().then(res => {
      if (res > 4) {
        this.canSlide = true;
      }
    });
  }

  simulateClick(id) {
    document.getElementById(id).click();
  }

  next() {
    this.slideTouched = true;
    this.slides.slideNext();
  }

  slideEndReached() {
    if (this.slideTouched) {
      this.slides.lockSwipeToNext(true);
      this.hideArrowNext = true;
    }
  }

  prev() {
    this.hideArrowNext = false;
    this.slides.slidePrev();
  }

  hideArrowPrev() {
    console.log("at the beggining");
  }

  async test() {
    /* const currentIndex = await this.slides.getActiveIndex();
    const previousIndex = await this.slides.getPreviousIndex();

    if (previousIndex > currentIndex) {
      this.hideArrowNext = false;
      this.slides.lockSwipeToNext(false);
    } */
  }
}
