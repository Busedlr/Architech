import { Component, OnInit, Input } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "project-documents",
  templateUrl: "./project-documents.html",
  styleUrls: ["./project-documents.scss"]
})
export class ProjectDocuments implements OnInit {
  @Input("projectId") projectId;
  documents: any = [];
  checkedDocuments: any = [];
  editDocuments: any = false;

  constructor(
    public projectData: ProjectData,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getDocuments();
  }

  toggleEditDocuments() {
    this.checkedDocuments = [];
    this.editDocuments = !this.editDocuments;
    if (!this.editDocuments) this.resetCheckedDocuments();
  }

  async selectFile(event) {
    let files = [];
    for (const key of Object.keys(event.srcElement.files)) {
      const value = await event.srcElement.files[key];
      files.push(value);
    }
    this.saveDocuments(files);
  }

  resetInput(inputId) {
    let fileInput = document.getElementById(inputId) as HTMLInputElement;
    fileInput.value = "";
  }

  async saveDocuments(files) {
    let filesToUpload = [];
    for (let file of files) {
      const checkResult = await this.projectData.checkDocExists(
        file,
        this.projectId
      );
      if (checkResult.code === "storage/object-not-found") {
        filesToUpload.push(file)
      } else if(!checkResult.name) {
        console.log("a document already exists with this name")
      }
    }

    await this.projectData.saveDocuments(filesToUpload, this.projectId);
    this.getDocuments();
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
        /*  type: this.getDocType(item.name) */
      };

      this.documents.push(document);
    }
  }

  resetCheckedDocuments() {
    this.documents.forEach((doc, i) => {
      const checkbox = document.getElementById(i) as HTMLInputElement;
      checkbox.checked = false;
    });
  }

  documentClick(id, doc) {
    if (this.editDocuments) {
      const checkbox = document.getElementById(id) as HTMLInputElement;
      checkbox.checked = !checkbox.checked;

      const index = this.checkedDocuments.findIndex(
        x => x.fullPath === doc.fullPath
      );

      if (checkbox.checked) {
        this.checkedDocuments.push(doc);
      } else {
        this.checkedDocuments.splice(index, 1);
      }
    }
  }

  async deleteDocuments() {
    this.checkedDocuments.forEach(img => {});
    for (let image of this.checkedDocuments) {
      await this.projectData.deleteDocument(image);
    }

    this.toggleEditDocuments();
    this.getDocuments();
  }

  /* getDocType(file) {
    let extention = "." +  file.name.substr(file.name.lastIndexOf(".") + 1);
    console.log("getdoctype", extention);
    return extention
  } */
}
