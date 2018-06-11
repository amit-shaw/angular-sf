import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-info-edit',
  templateUrl: './project-info-edit.component.html',
  styleUrls: ['./project-info-edit.component.css']
})
export class ProjectInfoEditComponent implements OnInit {

  constructor() { }
  words2 = [{value: 'word1'}, {value: 'word2'}, {value: 'word3'}, {value: ''}];
  ngOnInit() {
  }
  add() {
    this.words2.push({value: ''});
  }
}
