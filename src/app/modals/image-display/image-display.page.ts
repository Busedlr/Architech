import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.page.html",
  styleUrls: ["./image-display.page.scss"]
})
export class ImageDisplayModalPage implements OnInit {
  @Input() images: [];
  @Input() index: number;

  currentImage: {};

  constructor() {}

  ngOnInit() {
    this.currentImage = this.images[this.index];
    console.log("current image", this.currentImage)
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
}