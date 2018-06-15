import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-info-edit',
  templateUrl: './project-info-edit.component.html',
  styleUrls: ['./project-info-edit.component.css']
})
export class ProjectInfoEditComponent implements OnInit {

  
  constructor() { }
  words2 = [{value: 'word1'}, {value: 'word2'}, {value: 'word3'}, {value: ''}];
  datalen:number;
  data = [
    {
      pname:'project1',
      'keys':[
        {label:'Project Name',type:'text'},
        {label:'Email',type:'text'},
        {label:'Project Location',type:'text'},
        {label:'Capital',type:'text'},

      ]
    },
    {
      pname:'project2',
      keys:[
        {label:'Project Name',type:'text'},
        {label:'Email',type:'text'},
        {label:'Project Location',type:'text'},
        {label:'Capital',type:'text'},
      ]
    }
  ];
  ngOnInit() {
    this.datalen = this.data.length;
    console.log(this.datalen);
  }
  add() {
    //this.matexpension.cl
    this.data.push({
      pname:'project3',
      keys:[
        {label:'Project Name',type:'text'},
        {label:'Email',type:'text'},
        {label:'Project Location',type:'text'},
        {label:'Capital',type:'text'},
      ]
    });
  }
  delete(id){
    this.data.splice(1,1);
    console.log(this.data);
  }
}
