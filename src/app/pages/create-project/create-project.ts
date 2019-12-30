import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as firebase from "firebase/app";
import "firebase/firestore";

@Component({
  selector: "create-project",
  templateUrl: "./create-project.html",
  styleUrls: ["./create-project.scss"]
})
export class CreateProjectPage implements OnInit {
  projectForm: FormGroup;
  db: any;
  projectsRef: any;

  constructor(public formBuilder: FormBuilder) {
    this.db = firebase.firestore();
    this.projectsRef = this.db.collection("projects");
    this.initForm();
  }

  ngOnInit() {}

  initForm() {
    this.projectForm = this.formBuilder.group({
      firstName: [
        "",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.required
        ])
      ],

      lastName: [
        "",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(2),
          Validators.required
        ])
      ],

      job: [
        "",
        Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(3),
          Validators.required
        ])
      ],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      phone: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[^a-zA-Z]*")
        ])
      ],
      clientAddress: ["", Validators.maxLength(200)],
      clientNotes: [""],
      projectName: ["", Validators.required],
      projectType: ["", Validators.required],
      workType: ["", Validators.required],
      projectAddress: [
        "",
        Validators.compose([Validators.maxLength(200), Validators.required])
      ],
      budget: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      surface: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$")
        ])
      ],
      projectNotes: [""]
    });
  }

  saveProject() {
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

    this.projectsRef
      .add(projectData)
      .then(doc => {
        console.log("document saved with id", doc.id);
        return doc;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
