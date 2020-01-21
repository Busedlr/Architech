import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-display-modal',
  templateUrl: './image-display-modal.page.html',
  styleUrls: ['./image-display-modal.page.scss'],
})
export class ImageDisplayModalPage implements OnInit {
  @Input() imageUrl: any;

  constructor() { }

  ngOnInit() {
    console.log(this.imageUrl)
  }

}
