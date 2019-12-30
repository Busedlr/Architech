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
          Validators.maxLength(15),
          Validators.minLength(3),
          Validators.required
        ])
      ],

      lastName: [
        "",
        Validators.compose([
          Validators.maxLength(15),
          Validators.minLength(3),
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
      email: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required])]
    });
  }

  saveProject() {
    let projectData = {};
    Object.keys(this.projectForm.controls).forEach(key => {
      const controlValue = this.projectForm.controls[key].value;
      this.projectForm.controls.name.setValue(controlValue)
    });

    return this.projectsRef
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
