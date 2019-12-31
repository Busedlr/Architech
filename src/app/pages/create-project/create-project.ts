import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectData } from "src/app/services/project-data";
import { Router } from '@angular/router';

@Component({
  selector: "create-project",
  templateUrl: "./create-project.html",
  styleUrls: ["./create-project.scss"]
})
export class CreateProjectPage implements OnInit {
  projectForm: FormGroup;
  db: any;
  projectsRef: any;

  constructor(
    public formBuilder: FormBuilder,
    public ProjectData: ProjectData,
    public router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.projectForm = this.formBuilder.group({
      firstName: [
        "Buse",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.required
        ])
      ],

      lastName: [
        "Kilinc",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.required
        ])
      ],

      job: [
        "Developper",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(3),
          Validators.required
        ])
      ],
      email: [
        "b.dilara@live.com",
        Validators.compose([Validators.required, Validators.email])
      ],
      phone: [
        "0768524171",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      clientAddress: [
        "17 rue du parc cheviron sevres",
        Validators.maxLength(200)
      ],
      clientNotes: [""],
      projectName: ["Buse's future home", Validators.required],
      projectType: ["", Validators.required],
      workType: ["", Validators.required],
      projectAddress: [
        "Istanbul",
        Validators.compose([Validators.maxLength(200), Validators.required])
      ],
      budget: [
        "800000",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      surface: [
        "120",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      projectNotes: [""]
    });
  }

  saveProject() {
    console.log(this.projectForm);
    const controls = this.projectForm.controls;

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
    if (this.projectForm.valid) {
      this.ProjectData.saveProject(projectData);
      this.router.navigate(['/project-detail'])
    } else {
      console.log("please complete the form");
    }
  }
}
