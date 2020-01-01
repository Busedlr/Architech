import { Component, OnInit } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "project-detail",
  templateUrl: "./project-detail.html",
  styleUrls: ["./project-detail.scss"]
})
export class ProjectDetail implements OnInit {
  files = [];
  project: any;
  urls = [];

  constructor(public projectData: ProjectData, public route: ActivatedRoute) {}

  ngOnInit() {
    this.getProject();
  }

  async getProject() {
    const id = this.route.snapshot.paramMap.get("id");
    const project = await this.projectData.getProjectById(id);
    this.project = project.data();
    this.project.id = id;
    this.getImages();
  }

  resetInput(inputId) {
    let fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
    this.files = [];
  }

  selectFile(event) {
    Object.keys(event.srcElement.files).forEach(key => {
      const value = event.srcElement.files[key];
      this.files.push(value);
    });
  }

  async saveImages() {
    try {
      await this.projectData.saveImages(this.files, this.project.id);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  }

  getImages() {
    this.projectData.getImages(this.project.id).then(urls => {
      console.log("detail", urls)
    })
  }
}
