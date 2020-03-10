import { Component, OnInit } from "@angular/core";
import { NavController, ModalController, Events } from "@ionic/angular";

@Component({
  selector: "project-todo-list",
  templateUrl: "./todo-list.page.html",
  styleUrls: ["./todo-list.page.scss"]
})
export class TodoListPage implements OnInit {
  items: any;
  selectedItem: any;
  newItem: any;
  newItemDetail= "";


  constructor(
    public navCtrl: NavController,
    public modalController: ModalController,
    public events: Events
  ) {}

  ngOnInit() {}

  addItem() {

    let item = {
      title: this.newItem,
      detail: this.newItemDetail,
      checked: false
    };
    this.items.push(item);
    this.newItem = null;
    this.newItemDetail = null;
    console.log(this.items)

  }

  deleteItem(item) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  toggleItemCheck(item) {
    item.checked = !item.checked;
  }

  save() {
    this.modalController.dismiss(this.items);
  }

  ioncheckbox(event) {
    console.log("event", event);
  }

  check(item) {
    console.log("item", item);
  }

  /*   dismiss() {
    this.modalController.dismiss(this.items);
  } */
}
