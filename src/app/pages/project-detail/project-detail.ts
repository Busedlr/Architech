import { Component, OnInit } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";

@Component({
  selector: "project-detail",
  templateUrl: "./project-detail.html",
  styleUrls: ["./project-detail.scss"]
})
export class ProjectDetail implements OnInit {
  imageValid: boolean = false;
  files = [];

  constructor(
    public projectData: ProjectData) {}

  ngOnInit() {}

  resetInput(inputId) {
    let fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
    this.files = [];
    console.log("fileInput", fileInput.value);
  }

  selectFile(event) {
    Object.keys(event.srcElement.files).forEach(key => {
      const value = event.srcElement.files[key];
      this.files.push(value);
      console.log("files", this.files);
    });
  }

  async saveImages() {
    try {
      await this.projectData.saveImages(this.files);
      console.log("success");
    } catch(error) {
      console.log(error)
    }
  }
}
