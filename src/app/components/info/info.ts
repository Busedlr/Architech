import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "info",
  templateUrl: "./info.html",
  styleUrls: ["./info.scss"]
})
export class Info implements OnInit {
  @Input("project") project;

  constructor(public router: Router) {}

  ngOnInit() {
   
  }

  updateForm(projectInfo) {
    this.router.navigate(["/create-project/"], { queryParams: projectInfo });
  }

 /*  async openModal() {
    const modal = await this.modalController.create({
      component: TodoListPage,
      componentProps: {
        items: this.items
      }
    });
    modal.onDidDismiss().then(list => {
      this.projectData.updateProjectProp(
        this.project.id,
        "list",
        list.data
      );
    });
    return await modal.present();
  } */
}
