import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ProjectData } from "src/app/services/project-data";

@Component({
  selector: "project-detail",
  templateUrl: "./project-detail.html",
  styleUrls: ["./project-detail.scss"]
})
export class ProjectDetail implements OnInit {
  project: any;
  loading: boolean;
  segment: any = "images";

  constructor(public projectData: ProjectData, public route: ActivatedRoute, public router: Router) {
    
  }

  ngOnInit() {
    if(!this.projectData.currentProject) {
      this.router.navigate(["/home/"]);
    }

    
    this.project = this.projectData.currentProject;
    /* console.log("project", this.project) */
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
    console.log("segment", this.segment)
  }

  goHome() {
    this.router.navigate(["/home/"]);
  }
}
