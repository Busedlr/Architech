import { Component, OnInit, Input } from "@angular/core";
import { SegmentsService } from "src/app/services/segments-service";
import { ProjectData } from "src/app/services/project-data";
import Cropper from "cropperjs";

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.page.html",
  styleUrls: ["./image-display.page.scss"]
})
export class ImageDisplayModalPage implements OnInit {
  images = [];
  editImage: boolean = false;
  myCropper: any;

  @Input() index: number;

  currentImage: {};

  constructor(
    public segmentsService: SegmentsService,
    public projectData: ProjectData
  ) {
    this.images = this.segmentsService.images;
  }

  ngOnInit() {
    this.currentImage = this.images[this.index];
  }

  nextImage() {
    if (this.index !== this.images.length - 1) {
      this.index = this.index + 1;
    } else {
      this.index = 0;
    }
    this.currentImage = this.images[this.index];
    this.calculateModalSize();
  }

  prevImage() {
    if (this.index !== 0) {
      this.index = this.index - 1;
    } else {
      this.index = this.images.length - 1;
    }
    this.currentImage = this.images[this.index];

    this.calculateModalSize();
  }

  calculateModalSize() {
    const index = this.index.toString();
    const myImg = document.getElementById(index) as HTMLImageElement;
    let width = myImg.naturalWidth;
    let height = myImg.naturalHeight;

    let maxModalWidth = window.outerWidth - (window.outerWidth / 100) * 20;
    let maxModalHeight = window.outerHeight - (window.outerHeight / 100) * 20;
    
    const aspectRatio = width / height;

    if (width > maxModalWidth) {
      width = maxModalWidth;
      height = width / aspectRatio;
    }
    if (height > maxModalHeight) {
      height = maxModalHeight;
      width = height * aspectRatio;
    }
    this.setModalSize(width, height);
  }

  setModalSize(width, height) {
    const stringWidth = width.toString() + "px";
    const stringHeight = height.toString() + "px";
    
    this.segmentsService.imageModalStyleSheet.cssRules[0].style.width = stringWidth;
    this.segmentsService.imageModalStyleSheet.cssRules[0].style.height = stringHeight;
  }


  toggleEditImage() {
    this.editImage = !this.editImage;
  }

  saveChanges(id, img) {
    this.changeName(id, img);
    this.editImage = false;
  }

  async changeName(id, img) {
    const newName = document.getElementById(id) as HTMLInputElement;
    const name = newName.value + this.getDocType(img);
    const metadata = await this.projectData.updateMetadata(
      name,
      "extension",
      img.fullPath
    );
    this.segmentsService.images[this.index].name = metadata.customMetadata.name;
  }

  getDocType(file) {
    let extention = "." + file.name.substr(file.name.lastIndexOf(".") + 1);
    return extention;
  }

  quitImageDisplay() {
    this.editImage = false;
  }

  cropImage() {
    const image = document.getElementById("image") as HTMLImageElement;
    const cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      crop(event) {
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
      }
    });
  }

  /* cropImage() {
    const image = document.getElementById('image') as HTMLImageElement;
    this.myCropper = new Cropper(image, {
      autoCrop : true,
      background: true
    });
  } */
}
