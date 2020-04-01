import { Injectable } from "@angular/core";
import { ProjectData } from "./project-data";

@Injectable({
  providedIn: "root"
})
export class SegmentsService {
  images: any[] = [];
  documents: any[] = [];
  segmentName: any;

  constructor(public projectData: ProjectData) {}

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
        name: metaData.customMetadata.name
      };

      this.images.push(image);
    }
  }

  /* async getDocuments() {
		this.documents = [];
		const items = await this.projectData.getDocuments(this.projectData.currentProject.id);
		for (const item of items) {
		  const url = await this.projectData.getDownloadUrl(item.fullPath);
		  const metaData = await this.projectData.getMetadata(item.fullPath);
		  const document = {
			url: url,
			fullPath: item.fullPath,
			name: metaData.customMetadata.name,
			extension: metaData.customMetadata.extension
		  };

		  this.documents.push(document);
		}
	  } */

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
        iconSrc: "../../assets/icon/" + metaData.customMetadata.extension.substring(1) + ".svg"
      };
	  this.documents.push(document);
    }
  }
}
