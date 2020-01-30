import { Component, OnInit, Input } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";

@Component({
  selector: "project-documents",
  templateUrl: "./project-documents.html",
  styleUrls: ["./project-documents.scss"]
})
export class ProjectDocuments implements OnInit {
  @Input("projectId") projectId;
  files: any = [];
  documents: any = [];
  constructor(public projectData: ProjectData) {}

  ngOnInit() {
    this.getDocuments();
  }

  async selectFile(event) {
    for (const key of Object.keys(event.srcElement.files)) {
      const value = await event.srcElement.files[key];
      this.files.push(value);
    }
    this.saveDocuments();
  }

  resetInput(inputId) {
    let fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
    this.files = [];
  }

  async saveDocuments() {
    try {
      await this.projectData.saveDocuments(this.files, this.projectId);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  }

  async getDocuments() {
    this.documents = [];
    const items = await this.projectData.getDocuments(this.projectId);

    for (const item of items) {
      const url = await this.projectData.getDownloadUrl(item.fullPath);

      const document = {
        url: url,
        fullPath: item.fullPath,
        name: item.name
      };

      this.documents.push(document);
    }
    console.log("documents", this.documents);
  }
}
