import { Component } from "@angular/core";

import * as firebase from "firebase/app";
import "firebase/firestore";
import { Router } from "@angular/router";
import { ProjectData } from "src/app/services/project-data";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  db: any;
  projectsRef: any;
  projects = [];

  constructor(public router: Router, public projectData: ProjectData) {
    this.getProjects();
    this.db = firebase.firestore();
    this.projectsRef = this.db.collection("projects");
  }

  getProjects() {
    this.projectData.getProjects().then(result => {
      result.docs.forEach(doc => {
        let project = doc.data();
        project.id = doc.id;
        this.projects.push(project);
      });
    });
  }

  goToDetail(project) {
    this.projectData.currentProject = project;
    this.router.navigate(["/project-detail/" + project.id]);
  }

}
