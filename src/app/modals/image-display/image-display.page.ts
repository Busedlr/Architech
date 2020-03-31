import { Component, OnInit, Input } from "@angular/core";
import { SegmentsService } from "src/app/services/segments-service";

@Component({
  selector: "app-image-display",
  templateUrl: "./image-display.page.html",
  styleUrls: ["./image-display.page.scss"]
})
export class ImageDisplayModalPage implements OnInit {
  images = [];
  @Input() index: number;

  currentImage: {};

  constructor(public segmentsService: SegmentsService) {
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
}
