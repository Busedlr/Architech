import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ProjectData } from "src/app/services/project-data";
import { ModalController, IonSlides, Events } from "@ionic/angular";
import { SegmentsService } from "src/app/services/segments-service";

@Component({
  selector: "documents",
  templateUrl: "./documents.html",
  styleUrls: ["./documents.scss"],
})
export class Documents implements OnInit {
  @ViewChild("slides", { static: false }) slides: IonSlides;
  @Input("projectId") projectId;
  checkedDocuments: any = [];
  editDocuments: any = false;
  changeNameIndex: any;
  changeButtons: boolean = false;
  slideOpts: any = {};
  activeSlide: number = 0;
  changeNameClicked: boolean = false;

  constructor(
    public projectData: ProjectData,
    public modalController: ModalController,
    public segmentsService: SegmentsService,
    public events: Events
  ) {
    this.slideOpts = {
      slidesPerView: this.projectData.settings.slides_per_view,
      freeMode: this.projectData.settings.free_mode,
      allowTouchMove: false,
    };

    events.subscribe("get-active-index", () => {
      this.slides.getActiveIndex().then((res) => {
        this.segmentsService.activeIndex = res;
      });
    });

    events.subscribe("change slide per view", (number) => {
      this.changeSlidesPerView(number);
      //necessary to get the documents again ?
      this.segmentsService.getDocuments();
      this.projectData.changeSettings("slides_per_view", number);
    });
  }

  async ngOnInit() {
    this.segmentsService.getDocuments();
  }

  async changeSlidesPerView(number) {
    const swiper = await this.slides.getSwiper();
    swiper.params.slidesPerView = number;
    this.projectData.settings.slides_per_view = number;
  }

  documentClick(id) {
    if (this.segmentsService.editMode) {
      this.segmentsService.itemClicked = id;
    }
  }

  async deleteDoc() {
    let item = this.segmentsService.documents[this.segmentsService.itemClicked];
    this.segmentsService.itemsToDelete.push(item);
    this.segmentsService.documents.splice(this.segmentsService.itemClicked, 1);
    if (this.segmentsService.images.length <= 0) {
      this.segmentsService.toggleEditMode();
      this.segmentsService.itemClicked = null;
    }
  }

  onChangeName() {
    this.changeNameClicked = true;
  }

  async changeName(id, doc) {
    this.changeNameClicked = false;
    const newName = document.getElementById(id) as HTMLInputElement;
    if (newName.value) {
      const name = newName.value + this.segmentsService.getDocType(doc);
      const metadata = await this.projectData.updateMetadata(
        name,
        "extension",
        doc.fullPath
      );
      this.segmentsService.documents[this.segmentsService.itemClicked].name =
        metadata.customMetadata.name;
    }
  }

  closeChangeName() {
    this.changeNameClicked=false;
  }

  //

  //

  //

  //

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

  /* documentClick(id, doc) {
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
  } */

  getDocType(file) {
    let extention = "." + file.name.substr(file.name.lastIndexOf(".") + 1);
    console.log("getdoctype", extention);
    return extention;
  }
}
