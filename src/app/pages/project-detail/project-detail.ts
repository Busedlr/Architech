import { Component, OnInit, ɵConsole } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";
import { ActivatedRoute } from "@angular/router";
import { ImageDisplayModalPage } from "src/app/modals/image-display-modal/image-display-modal.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "project-detail",
  templateUrl: "./project-detail.html",
  styleUrls: ["./project-detail.scss"]
})
export class ProjectDetail implements OnInit {
  files = [];
  project: any;
  images = [];
  loading: boolean;
  editImages: boolean = false;

  constructor(
    public projectData: ProjectData,
    public route: ActivatedRoute,
    public modalController: ModalController
  ) {}

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
    this.images = [];
    const storedImages = await this.projectData.getImages(this.project.id);
	this.images = storedImages;
	console.log(this.images)
  }

  imageClick(i) {
    if (this.editImages) {
	  const clickedImage = document.getElementById(i) as HTMLInputElement;
	  clickedImage.checked = !clickedImage.checked
    } else this.openModal(i);
  }

  async openModal(i) {
    const modal = await this.modalController.create({
      component: ImageDisplayModalPage,
      componentProps: {
        index: i,
        images: this.images
      }
    });
    console.log(i);
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
