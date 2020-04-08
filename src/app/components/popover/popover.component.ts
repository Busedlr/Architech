import { Component, OnInit } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";
import { SegmentsService } from "src/app/services/segments-service";
import { PopoverController, Events } from "@ionic/angular";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"],
})
export class PopoverComponent implements OnInit {
  files: any[] = [];
  changeClicked: boolean = false;
  segmentName = this.segmentsService.segmentName;

  constructor(
    public projectData: ProjectData,
    public segmentsService: SegmentsService,
    public popoverController: PopoverController,
    public events: Events
  ) {}

  ngOnInit() {}

  resetInput(inputId) {
    let fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
    this.files = [];
  }

  async selectFile(event) {
    for (const key of Object.keys(event.srcElement.files)) {
      const value = await event.srcElement.files[key];
      this.files.push(value);
    }
    this.popoverController.dismiss();
    if (this.segmentName === "image") {
      this.saveImages();
    } else if (this.segmentName === "document") {
      this.saveDocuments();
    } else {
      // save for companies?
    }
  }

  async saveDocuments() {
    try {
      await this.projectData.saveToStorage(
        this.files,
        this.projectData.currentProject.id,
        "documents"
      );
    } catch (error) {
      console.log(error);
    }
    this.segmentsService.getDocuments();
  }

  async saveImages() {
    try {
      await this.projectData.saveToStorage(
        this.files,
        this.projectData.currentProject.id,
        "images"
      );
    } catch (error) {
      console.log(error);
    }
    this.segmentsService.getImages();
  }

  confirmChangeClicked() {
    this.changeClicked = true;
  }

  changePerView(number) {
    this.events.publish("change slide per view", number);
    this.popoverController.dismiss();
  }

  async toggleEditMode() {
    this.segmentsService.toggleEditMode();
    this.popoverController.dismiss();
  }
}
