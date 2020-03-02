import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.page.html",
  styleUrls: ["./todo-list.page.scss"]
})
export class TodoListPage implements OnInit {
  items = [];
  newItem: any;
  showDetail: boolean = false;
  selectedItem: any;

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    this.items = ["buse", "dilara", "kilinc", "lalala"];
  }

  addItem() {
    this.items.push(this.newItem);
    this.newItem = "";
  }

  openItem(item) {
    this.selectedItem = item;
    this.showDetail = true;
  }

  deleteItem() {
    const index = this.items.indexOf(this.selectedItem);
    this.items.splice(index, 1);
    this.showDetail = false;
  }
}
