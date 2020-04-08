import { Injectable } from "@angular/core";
import { ProjectData } from "./project-data";

@Injectable({
  providedIn: "root",
})
export class SegmentsService {
  images: any[] = [];
  documents: any[] = [];
  segmentName: any;
  imageModalStyleSheet;
  editMode: boolean = false;
  imageClicked: any;

  constructor(public projectData: ProjectData) {
    this.getModalStyleSheet();
  }

  async getImages() {
    this.images = [];
    const items = await this.projectData.getImages(
      this.projectData.currentProject.id
    );

    for (const item of items) {
      const url = await this.projectData.getDownloadUrl(item.fullPath);
      const metaData = await this.projectData.getMetadata(item.fullPath);
      const image = {
        url: url,
        fullPath: item.fullPath,
        name: metaData.customMetadata.name,
      };

      this.images.push(image);
    }
  }

  async getDocuments() {
    this.documents = [];
    const items = await this.projectData.getDocuments(
      this.projectData.currentProject.id
    );
    for (const item of items) {
      const url = await this.projectData.getDownloadUrl(item.fullPath);
      const metaData = await this.projectData.getMetadata(item.fullPath);

      const document = {
        url: url,
        fullPath: item.fullPath,
        name: metaData.customMetadata.name,
        extension: metaData.customMetadata.extension,
        iconSrc:
          "../../assets/icon/" +
          metaData.customMetadata.extension.substring(1) +
          ".svg",
      };
      this.documents.push(document);
    }
  }

  getModalStyleSheet() {
    const styleSheets = document.styleSheets;
    for (let index = 0; index < styleSheets.length; ++index) {
      const sheet = styleSheets[index];
      if (sheet.title === "modal-style") this.imageModalStyleSheet = sheet;
    }
  }

  toggleEditMode(imageClicked?) {
    this.editMode = !this.editMode;
    if (imageClicked) {
      this.imageClicked = false;
    }
  }
}
