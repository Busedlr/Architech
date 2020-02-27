import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ProjectData } from "src/app/services/project-data";

@Component({
  selector: "project-detail",
  templateUrl: "./project-detail.html",
  styleUrls: ["./project-detail.scss"]
})
export class ProjectDetail implements OnInit {
  project: any;
  loading: boolean;
  segment: any = "documents";

  constructor(public projectData: ProjectData, public route: ActivatedRoute) {}

  ngOnInit() {
    this.getProject();
  }

  ionViewWillEnter() {
    this.getProject();
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
  }

  async getProject() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get("id");
    const project = await this.projectData.getProjectById(id);
    this.project = project.data();
    this.project.id = id;
    this.loading = false;
  }
}
