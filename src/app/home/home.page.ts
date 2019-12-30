import { Component } from "@angular/core";

import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  db: any;
  projectsRef: any;
  buse: {};

  constructor() {
    this.db = firebase.firestore();
    this.projectsRef = this.db.collection("projects");
    this.buse = {
      name: "buse",
      surname: "kilinc"
    };
  }

  saveProject() {
    return this.projectsRef
      .add(this.buse)
      .then(doc => {
        console.log("document saved with id", doc.id);
        return doc;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
