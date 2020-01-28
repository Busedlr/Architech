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

	/* saveImages(files, id) {
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
  } */

	saveImages(files, id) {
		const rawFiles = [];
		files.forEach(file => {
			const promise = this.storageRef
				.child(id + '/' + file.name)
				.put(file)
				.catch(error => {
					console.log(error);
				});
			rawFiles.push(promise);
		});
		return Promise.all(rawFiles);
	}

	getImages(projectId) {
		return this.storageRef
			.child(projectId)
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

	updateProjectData(imageUrl, id) {
		this.db
			.collection('projects')
			.doc(id)
			.update({ thumbnail: imageUrl });
	}
}
