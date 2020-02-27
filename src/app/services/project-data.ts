import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

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

  updateProject(projectData, projectId) {
    return this.projectsRef
      .doc(projectId)
      .update(projectData)
      .then(() => {
        return true;
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

  saveDocuments(files, id) {
    const rawFiles = [];
    files.forEach(file => {
      let extension = "." + file.name.substr(file.name.lastIndexOf(".") + 1);
      const fullPath = id + "/documents/" + file.lastModified + extension;
      const promise = this.storageRef
        .child(fullPath)
        .put(file)
        .then(() => {
          this.updateMetadata(file.name, fullPath);
        })
        .catch(error => {
          console.log(error);
        });
      rawFiles.push(promise);
    });
    return Promise.all(rawFiles);
  }

  updateMetadata(name, fullPath) {
    let newMetadata = {
      customMetadata: {
        docName: name
      }
    };
    return this.storageRef
      .child(fullPath)
      .updateMetadata(newMetadata)
      .then(res => {
        return res;
      });
  }

  getMetadata(fullPath) {
    return this.storageRef
      .child(fullPath)
      .getMetadata()
      .then(res => {
        return res;
      });
  }

  saveImages(files, id) {
    const rawFiles = [];

    files.forEach(file => {
      const promise = this.storageRef
        .child(id + "/images/" + file.lastModified)
        .put(file)
        .catch(error => {
          console.log(error);
        });
      rawFiles.push(promise);
    });
    return Promise.all(rawFiles);
  }

  getDocuments(projectId) {
    return this.storageRef
      .child(projectId + "/documents")
      .listAll()
      .then(res => {
        return res.items;
      });
  }

  getImages(projectId) {
    return this.storageRef
      .child(projectId + "/images")
      .listAll()
      .then(res => {
        return res.items;
      });
  }

  getDownloadUrl(fullPath) {
    return this.storageRef
      .child(fullPath)
      .getDownloadURL()
      .then(downloadUrl => {
        return downloadUrl;
      });
  }

  deleteImage(image) {
    return this.storageRef
      .child(image.fullPath)
      .delete()
      .then(res => {
        return res;
      });
  }

  deleteDocument(doc) {
    return this.storageRef
      .child(doc.fullPath)
      .delete()
      .then(res => {
        return res;
      });
  }

  updateProjectData(imageUrl, id) {
    this.db
      .collection("projects")
      .doc(id)
      .update({ thumbnail: imageUrl });
  }

  changeDocName(fullPath, newName) {
    this.storageRef.child(fullPath);
  }
}
