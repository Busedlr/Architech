import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectData } from "src/app/services/project-data";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "create-project",
  templateUrl: "./create-project.html",
  styleUrls: ["./create-project.scss"]
})
export class CreateProjectPage implements OnInit {
  projectForm: FormGroup;
  db: any;
  projectsRef: any;
  formInfo: any = null;
  previousInfo: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public ProjectData: ProjectData,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.getFormInfo();
  }

  ngOnInit() {}

  getFormInfo() {
    this.activatedRoute.queryParams.subscribe(res => {
      if (Object.entries(res).length > 0) {
        this.previousInfo = true;
      }
      this.formInfo = res;
      this.initForm();
    });
  }

  initForm() {
    this.projectForm = this.formBuilder.group({
      firstName: [
        this.formInfo.first_name ? this.formInfo.first_name : "",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.required
        ])
      ],

      lastName: [
        this.formInfo.last_name ? this.formInfo.last_name : "",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.required
        ])
      ],

      job: [
        this.formInfo.job ? this.formInfo.job : "",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(3),
          Validators.required
        ])
      ],
      email: [
        this.formInfo.email ? this.formInfo.email : "",
        Validators.compose([Validators.required, Validators.email])
      ],
      phone: [
        this.formInfo.phone ? this.formInfo.phone : "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      clientAddress: [
        this.formInfo.client_address ? this.formInfo.client_address : "",
        Validators.maxLength(200)
      ],
      clientNotes: [
        this.formInfo.client_notes ? this.formInfo.client_notes : ""
      ],
      projectName: [
        this.formInfo.project_name ? this.formInfo.project_name : "",
        Validators.required
      ],
      projectType: [
        this.formInfo.project_type ? this.formInfo.project_type : "",
        Validators.required
      ],
      workType: [
        this.formInfo.work_type ? this.formInfo.work_type : "",
        Validators.required
      ],
      projectAddress: [
        this.formInfo.project_address ? this.formInfo.project_address : "",
        Validators.compose([Validators.maxLength(200), Validators.required])
      ],
      budget: [
        this.formInfo.budget ? this.formInfo.budget : "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      surface: [
        this.formInfo.surface ? this.formInfo.surface : "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      projectNotes: [
        this.formInfo.project_notes ? this.formInfo.project_notes : ""
      ]
    });
  }

  saveForm() {
    if (this.previousInfo) {
      this.updateProject();
    } else {
      this.createProject();
    }
  }

  async updateProject() {
    const controls = this.projectForm.controls;

    if (this.projectForm.valid) {
      const projectData = {
        first_name: controls.firstName.value,
        last_name: controls.lastName.value,
        job: controls.job.value,
        email: controls.email.value,
        phone: controls.phone.value,
        client_address: controls.clientAddress.value,
        client_notes: controls.clientNotes.value,
        project_name: controls.projectName.value,
        project_type: controls.projectType.value,
        work_type: controls.workType.value,
        project_address: controls.projectAddress.value,
        budget: controls.budget.value,
        surface: controls.surface.value,
        project_notes: controls.projectNotes.value
      };

      await this.ProjectData.updateProject(projectData, this.formInfo.id);
      this.router.navigate(["/project-detail/" + this.formInfo.id]);
    } else {
      console.log("please complete the form");
    }
  }

  async createProject() {
    const controls = this.projectForm.controls;

    if (this.projectForm.valid) {
      const projectData = {
        info : {
          first_name: controls.firstName.value,
          last_name: controls.lastName.value,
          job: controls.job.value,
          email: controls.email.value,
          phone: controls.phone.value,
          client_address: controls.clientAddress.value,
          client_notes: controls.clientNotes.value,
          project_name: controls.projectName.value,
          project_type: controls.projectType.value,
          work_type: controls.workType.value,
          project_address: controls.projectAddress.value,
          budget: controls.budget.value,
          surface: controls.surface.value,
          project_notes: controls.projectNotes.value
        }
      };

      const doc = await this.ProjectData.saveProject(projectData);
      this.router.navigate(["/project-detail/" + doc.id]);
    } else {
      console.log("please complete the form");
    }
  }
}
