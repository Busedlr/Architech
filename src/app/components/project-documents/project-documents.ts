import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";
import { ModalController, IonSlides, Events } from "@ionic/angular";
import { SegmentsService } from 'src/app/services/segments-service';

@Component({
  selector: "project-documents",
  templateUrl: "./project-documents.html",
  styleUrls: ["./project-documents.scss"]
})
export class ProjectDocuments implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  @Input("projectId") projectId;
  checkedDocuments: any = [];
  editDocuments: any = false;
  changeNameIndex: any;
  changeButtons: boolean = false;
  canSlide: boolean = false;
  slideOpts: any = {};
  activeSlide: number = 0;
  endReached: boolean;


  constructor(
    public projectData: ProjectData,
    public modalController: ModalController,
    public segmentsService : SegmentsService,
    public events: Events
  ) {
    this.slideOpts = {
      slidesPerView: this.projectData.settings.slides_per_view,
      freeMode: this.projectData.settings.free_mode,
      allowTouchMove: false,
    };
    events.subscribe("change slide per view", number => {
      this.changeSlidesPerView(number);
      //necessary to get the documents again ?
        this.getDocuments();
        this.projectData.changeSettings("slides_per_view", number);
      });
  }

 async ngOnInit() {
    this.getDocuments();
  }


  async getDocuments() {
    this.segmentsService.getDocuments()
  }

  async changeSlidesPerView(number) {
    const swiper = await this.slides.getSwiper();
    swiper.params.slidesPerView = number;
    this.slide(number);
  }

  slide(number) {
    this.slides.length().then(res => {
      if (res > number) {
        this.endReached = false;
      } else {
        this.endReached = true;
      }
    });
  }

  async slideChanged() {
    this.activeSlide = await this.slides.getActiveIndex();
  }

  slideEndReached() {
    if (this.activeSlide > 0) {
      this.endReached = true;
    }
  }

  prevStarted() {
    if (this.endReached) {
      this.endReached = false;
    }
  }

 /*  toggleEditDocuments() {
    this.checkedDocuments = [];
    this.editDocuments = !this.editDocuments;
    if (!this.editDocuments) this.resetCheckedDocuments();
  }
   */
/* 
  resetCheckedDocuments() {
    this.documents.forEach((doc, i) => {
      const checkbox = document.getElementById(i) as HTMLInputElement;
      checkbox.checked = false;
    });
  } */

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
    this.documents[i].name = metadata.customMetadata.name;
  }

  getDocType(file) {
    let extention = "." +  file.name.substr(file.name.lastIndexOf(".") + 1);
    console.log("getdoctype", extention);
    return extention
  }


}
