import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";

@Component({
  selector: "project-todo-list",
  templateUrl: "./todo-list.page.html",
  styleUrls: ["./todo-list.page.scss"]
})
export class TodoListPage implements OnInit {
  items = [];
  newItem: any;
  selectedItem: any;

  constructor(public navCtrl: NavController, public modalController : ModalController) {}

  ngOnInit() {
    this.items = ["buse", "dilara", "kilinc", "lalala"];
  }

  addItem() {
    this.items.push(this.newItem);
    this.newItem = "";
  }

  deleteItem() {
    const index = this.items.indexOf(this.selectedItem);
    this.items.splice(index, 1);
  }

  dismiss() {
    this.modalController.dismiss(this.items)
  }
}
