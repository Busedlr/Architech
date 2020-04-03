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
    this.setModalSize(100);
  }

  prevImage() {
    if (this.index !== 0) {
      this.index = this.index - 1;
    } else {
      this.index = this.images.length - 1;
    }
    this.currentImage = this.images[this.index];
    this.setModalSize(200);
  }

  setModalSize(height) {
    const sylesheets = document.styleSheets
    console.log(sylesheets[0])
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
