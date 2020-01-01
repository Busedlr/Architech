import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { UrlSegment } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ProjectData {
  db: any;
  projectsRef: any;
  storageRef: any;

  constructor() {
    this.db = firebase.firestore();
    this.projectsRef = this.db.collection("projects");
    this.storageRef = firebase.storage().ref();
  }

  saveProject(projectData) {
    return this.projectsRef
      .add(projectData)
      .then(doc => {
        return doc;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getProjects() {
    return this.projectsRef
      .get()
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }

  getProjectById(id) {
    return this.projectsRef
      .doc(id)
      .get()
      .then(result => {
        return result;
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveImages(files, id) {
    const rawFiles = [];
    files.forEach(async file => {
      const promise = await this.storageRef
        .child(id + "/" + file.lastModified)
        .put(file)
        .catch(error => {
          console.log(error);
        });
      rawFiles.push(promise);
    });
    return Promise.all(rawFiles);
  }

  /* saveImages(files) {
    const rawFiles = [];
    files.forEach(file => {
      const promise = this.storageRef
        .child("projectImages/" + file.lastModified)
        .put(file)
        .then(result => {
          return result
        })
        .catch(error => {
          console.log(error);
        });
      rawFiles.push(promise);
    });
    return Promise.all(rawFiles);
  } // this one is without async await and above is the same code with async */


  getImages(id) {
    return firebase
      .storage()
      .ref(id)
      .listAll()
      .then(result => {
        let urls = [];
        result.items.forEach(imageRef => {
          this.storageRef
            .child(imageRef.fullPath)
            .getDownloadURL()
            .then(url => {
              urls.push(url);
            });
        });
        return urls;
      });
  }
}
