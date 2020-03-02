import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { TodoListPage } from "src/app/modals/todo-list/todo-list.page";

@Component({
  selector: "to-do-list",
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.scss"]
})
export class ToDoListComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async openModal(i) {
    const modal = await this.modalController.create({
      component: TodoListPage,
      componentProps: {
        /* index: i, */
      }
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    })
  }

}
