import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

@Injectable({
	providedIn: 'root'
})
export class ProjectData {
	db: any;
	projectsRef: any;
	storageRef: any;

	constructor() {
		this.db = firebase.firestore();
		this.projectsRef = this.db.collection('projects');
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
		files.forEach(file => {
			const promise = this.storageRef
				.child(id + '/' + file.lastModified)
				.put(file)
				.catch(error => {
					console.log(error);
				});
			rawFiles.push(promise);
		});
		return Promise.all(rawFiles);
	}

	getImagesRef(id) {
		return firebase
			.storage()
			.ref(id)
			.listAll()
			.then(res => {
				return res;
			});
	}

<<<<<<< HEAD
	getImageDownloadUrl(fullPath) {
		return this.storageRef
			.child(fullPath)
			.getDownloadURL()
			.then(res => {
				return res;
			});
	}
=======
  getImages(id) {
    return firebase
      .storage()
      .ref(id)
      .listAll()
      .then(res => {
        return res;
      });
  }
>>>>>>> b9d26ad538f7a92bb0c88af6a1b187ff5848ff55

	updateProjectData(imageUrl, id) {
		this.db
			.collection('projects')
			.doc(id)
			.update({ thumbnail: imageUrl });
	}

	deleteImage(fullPath) {
		const imgToDelete = fullPath;
		return this.storageRef
			.child(imgToDelete)
			.delete()
			.then(result => {
				return result;
			})
			.catch(error => {
				console.log(error);
			});
	}
}
