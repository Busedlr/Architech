import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { TodoListPage } from "src/app/modals/todo-list/todo-list.page";
import { ProjectData } from 'src/app/services/project-data';

@Component({
  selector: "project-to-do-list",
  templateUrl: "./project-to-do-list.html",
  styleUrls: ["./project-to-do-list.scss"]
})
export class ToDoList implements OnInit {
  @Input("projectId") projectId;
  
  constructor(public modalController: ModalController, public projectData: ProjectData) {}

  ngOnInit() {
    console.log(this.projectId)
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: TodoListPage,
      componentProps: {
        /* index: i, */
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        const list = data['data']
        
        this.projectData.saveList(list, this.projectId)
    });
    
   return await modal.present()
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    })
  }

  onDidDismiss() {
    console.log("dismissed?");
  }
}
