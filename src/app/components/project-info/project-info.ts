import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "project-info",
  templateUrl: "./project-info.html",
  styleUrls: ["./project-info.scss"]
})
export class ProjectInfo implements OnInit {
  @Input("project") project;

  constructor(public router: Router) {}

  ngOnInit() {}

  updateForm(projectInfo) {
    this.router.navigate(["/create-project/"], { queryParams: projectInfo });
  }
}
