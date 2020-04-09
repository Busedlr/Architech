import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

@Injectable({
  providedIn: "root",
})
export class ProjectData {
  db: any;
  projectsRef: any;
  settingsRef: any;
  storageRef: any;
  settings: any = {};
  projects: any[] = [];
  currentProject: any;

  constructor() {
    this.db = firebase.firestore();
    this.projectsRef = this.db.collection("projects");
    this.storageRef = firebase.storage().ref();
    this.settingsRef = this.db.collection("settings");
    this.getSettings();
  }

  updateProjectProp(projectId, prop, val) {
    console.log("projectid", projectId);
    return this.projectsRef
      .doc(projectId)
      .update(prop, val)
      .catch((error) => {
        console.log(error);
      });
  }

  saveProject(projectData) {
    return this.projectsRef
      .add(projectData)
      .then((doc) => {
        return doc;
      })
      .catch((error) => {
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
      .catch((error) => {
        console.log(error);
      });
  }

  getProjects() {
    return this.projectsRef
      .get()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setProjects() {
    this.projects = [];
    return this.projectsRef
      .get()
      .then((result) => {
        result.docs.forEach((doc) => {
          let project = doc.data();
          project.id = doc.id;
          this.projects.push(project);
        });
        return true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getProjectById(id) {
    return this.projectsRef
      .doc(id)
      .get()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveToStorage(files, id, type) {
    const rawFiles = [];
    files.forEach((file) => {
      console.log("file", file);
      const extension = "." + file.name.substr(file.name.lastIndexOf(".") + 1);
      const fullPath = id + "/" + type + "/" + file.lastModified + extension;
      const promise = this.storageRef
        .child(fullPath)
        .put(file)
        .then(() => {
          this.updateMetadata(file.name, extension, fullPath);
        })
        .catch((error) => {
          console.log(error);
        });
      rawFiles.push(promise);
    });
    return Promise.all(rawFiles);
  }

  updateMetadata(name, extension, fullPath) {
    if (extension === "extension") {
      let newMetadata = {
        customMetadata: {
          name: name,
        },
      };
      return this.storageRef
        .child(fullPath)
        .updateMetadata(newMetadata)
        .then((res) => {
          return res;
        });
    } else {
      let newMetadata = {
        customMetadata: {
          name: name,
          extension: extension,
        },
      };
      return this.storageRef
        .child(fullPath)
        .updateMetadata(newMetadata)
        .then((res) => {
          return res;
        });
    }
  }

  getMetadata(fullPath) {
    return this.storageRef
      .child(fullPath)
      .getMetadata()
      .then((res) => {
        return res;
      });
  }

  getDocuments(projectId) {
    return this.storageRef
      .child(projectId + "/documents")
      .listAll()
      .then((res) => {
        return res.items;
      });
  }

  getImages(projectId) {
    return this.storageRef
      .child(projectId + "/images")
      .listAll()
      .then((res) => {
        return res.items;
      });
  }

  getDownloadUrl(fullPath) {
    return this.storageRef
      .child(fullPath)
      .getDownloadURL()
      .then((downloadUrl) => {
        return downloadUrl;
      });
  }

  delete(item) {
    return this.storageRef
      .child(item.fullPath)
      .delete()
      .then((res) => {
        return res;
      });
  }

/*   deleteDocument(doc) {
    return this.storageRef
      .child(doc.fullPath)
      .delete()
      .then((res) => {
        return res;
      });
  } */



  updateProjectData(imageUrl, id) {
    this.db.collection("projects").doc(id).update({ thumbnail: imageUrl });
  }

  changeDocName(fullPath, newName) {
    this.storageRef.child(fullPath);
  }

  changeSettings(prop, val) {
    const updateProp = "settings." + prop;
    return this.settingsRef
      .doc(this.settings.id)
      .update(updateProp, val)
      .catch((error) => {
        console.log(error);
      });
    this.getSettings();
  }

  getSettings() {
    return this.settingsRef
      .get()
      .then((res) => {
        this.settings = res.docs[0].data().settings;
        this.settings.id = res.docs[0].id;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
