import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'project-info',
  templateUrl: './project-info.html',
  styleUrls: ['./project-info.scss'],
})
export class ProjectInfo implements OnInit {
@Input('project') project

  constructor() { }

  ngOnInit() {
   
  }

}
