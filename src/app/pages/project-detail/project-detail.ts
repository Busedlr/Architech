import { Component, OnInit, ɵConsole } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";
import { ActivatedRoute } from "@angular/router";
import { ImageDisplayModalPage } from 'src/app/modals/image-display-modal/image-display-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: "project-detail",
  templateUrl: "./project-detail.html",
  styleUrls: ["./project-detail.scss"]
})
export class ProjectDetail implements OnInit {
  files = [];
  project: any;
  urls = [];
  loading: boolean;

  constructor(public projectData: ProjectData, public route: ActivatedRoute, public modalController: ModalController) {}

  ngOnInit() {
    this.getProject();
  }

  async getProject() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get("id");
    const project = await this.projectData.getProjectById(id);
    this.project = project.data();
    this.project.id = id;
    this.getImages().then(() => {
      this.loading = false;
    });
  }

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
    console.log("images to be saved", this.files);
    this.saveImages();
  }

  async saveImages() {
    console.log("saving the images");
    try {
      await this.projectData.saveImages(this.files, this.project.id);
      this.getImages();
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  }

  async getImages() {
    this.urls = [];
    const url = await this.projectData.getImages(this.project.id);
    this.urls = url;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ImageDisplayModalPage
    });
    return await modal.present();
  }
}
