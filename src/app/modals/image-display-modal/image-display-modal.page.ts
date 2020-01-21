import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-image-display-modal",
  templateUrl: "./image-display-modal.page.html",
  styleUrls: ["./image-display-modal.page.scss"]
})
export class ImageDisplayModalPage implements OnInit {
  @Input() urls: [];
  @Input() index: number;

  currentUrl: string;

  constructor() {}

  ngOnInit() {
    this.currentUrl = this.urls[this.index];
  }

  nextImage() {
    if (this.index !== this.urls.length - 1) {
      this.index = this.index + 1;
    } else {
      this.index = 0;
    }
    this.currentUrl = this.urls[this.index];
  }

  prevImage() {
    if (this.index !== 0) {
      this.index = this.index - 1;
    } else {
      this.index = this.urls.length - 1;
    }
    this.currentUrl = this.urls[this.index];
  }
}
