import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  changeClicked : boolean = false;
  constructor() { }

  ngOnInit() {}



  confirmChangeClicked() {
    this.changeClicked = true;
  }

  changePerView(number) {
console.log("number of images", number)
  }

  
}
