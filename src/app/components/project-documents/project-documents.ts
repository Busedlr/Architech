import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";
import { ModalController, IonSlides } from "@ionic/angular";

@Component({
  selector: "project-documents",
  templateUrl: "./project-documents.html",
  styleUrls: ["./project-documents.scss"]
})
export class ProjectDocuments implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  @Input("projectId") projectId;
  documents: any = [];
  checkedDocuments: any = [];
  editDocuments: any = false;
  changeNameIndex: any;
  changeButtons: boolean = false;
  canSlide: boolean = false;

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
    await this.projectData.saveToStorage(files, this.projectId, 'documents');
    this.getDocuments();
  }

  async getDocuments() {
    this.documents = [];
    const items = await this.projectData.getDocuments(this.projectId);
    for (const item of items) {
      const url = await this.projectData.getDownloadUrl(item.fullPath);
      const metaData = await this.projectData.getMetadata(item.fullPath);
      const document = {
        url: url,
        fullPath: item.fullPath,
        name: metaData.customMetadata.docName
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

  editName(i) {
    this.changeButtons = true;
    this.changeNameIndex = i;
  }

  async changeName(i, doc) {
    this.changeButtons = false;
    const newName = document.getElementById(i) as HTMLInputElement;
    const metadata = await this.projectData.updateMetadata(
      newName.value,
      doc.fullPath
    );
    this.documents[i].name = metadata.customMetadata.docName;
  }

  /* getDocType(file) {
    let extention = "." +  file.name.substr(file.name.lastIndexOf(".") + 1);
    console.log("getdoctype", extention);
    return extention
  } */

  slideOpts = {
    slidesPerView: 4,
    freeMode: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true
    }
  };

  slide() {
    this.slides.length().then(res => {
      if (res > 4) {
        this.canSlide = true;
      }
    });
  }
}
