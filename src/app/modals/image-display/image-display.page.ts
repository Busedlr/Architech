import { Component, OnInit, Input } from "@angular/core";
import { SegmentsService } from "src/app/services/segments-service";
import { ProjectData } from "src/app/services/project-data";
import { ModalController } from '@ionic/angular';

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.page.html",
  styleUrls: ["./image-display.page.scss"]
})
export class ImageDisplayModalPage implements OnInit {
  images = [];
  editImage: boolean = false;

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
  }

  prevImage() {
    if (this.index !== 0) {
      this.index = this.index - 1;
    } else {
      this.index = this.images.length - 1;
    }
    this.currentImage = this.images[this.index];
  }

  toggleEditImage() {
    this.editImage = !this.editImage;
  }

  saveChanges(id,img) {
    this.changeName(id, img);
    this.editImage = false;
  }

  async changeName(id, img) {
    const newName = document.getElementById(id) as HTMLInputElement;
    const name = newName.value + this.getDocType(img)
    const metadata = await this.projectData.updateMetadata(
      name,
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
}
