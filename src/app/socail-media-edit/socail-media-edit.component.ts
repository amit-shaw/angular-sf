import { Component, OnInit ,Inject} from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { NgForm, Form } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { BasicData } from '../basic-info-edit/basicData';

@Component({
  selector: 'app-socail-media-edit',
  templateUrl: './socail-media-edit.component.html',
  styleUrls: ['./socail-media-edit.component.css']
})
export class SocailMediaEditComponent implements OnInit {

  constructor(public dialog: MatDialog,private sfService: SalesforceService,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<SocailMediaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    basic:BasicData;
    //basic:any[];
    basic_set:any[];
    work_set:any[];
    speaker:any[];
    doc:any[]= [];
    socailEdit: FormGroup;
    error_text:string='';
    status:boolean=false;
    attchment:any[];
  ngOnInit() {
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.socailEdit = this.createFormGroup();
    //this.basicEdit = this.createFormGroup();
    //this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
    //this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.speaker.subscribe(speaker => this.speaker = speaker);
    this.getdataService.attchment.subscribe(attchment =>this.attchment = attchment);
    //this.doc = this.attchment;
  }
  createFormGroup() {
    return new FormGroup({         
      FaceBookId__c:new FormControl(this.defaultVal(this.basic.FaceBookId__c)),
      LinkedInId__c:new FormControl(this.basic.LinkedInId__c),
      TwitterId__c:new FormControl(this.basic.TwitterId__c),
      Instagram__c:new FormControl(this.basic.Instagram__c),
      Video__c:new FormControl(this.basic.Video__c),
     });
  }
  defaultVal(val){
    console.log("Formvalue: "+val);
    if(this.basic.FaceBookId__c == '' || this.basic.FaceBookId__c == undefined){
      return 'http://www.facebook.com';
    }else{
      return val;
    }
  }
  onSubmit(){
    console.log(this.socailEdit.value);
    //console.log("Value"+this.basic_set.find(basic_set => basic_set == 'First_Name__c'));
    //console.log(this.basic_set);
    if (this.socailEdit.valid) {
    this.getdataService.updateSepcificData(this.socailEdit.value,'','');
    this.dialogRef.close();
    }
    //console.log(data.value);
  }
  onCancel(){
    console.log("Called ");
    this.dialogRef.close();
  }
  onChange(event, input: any) {

    console.log(event);
    if(event.target.files[0].type != 'application/pdf' || event.target.files[0].type != 'application/vnd.ms-excel'
     ||event.target.files[0].type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
     || event.target.files[0].type != 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
      this.status = true;
      this.error_text ='Please select the PDF,XLS,DOC and PPT files only';
    }else if(event.target.files[0].size > 5*1024*1024){
      this.status = true;
      this.error_text = 'Please select the file less then 5MB';
    }
    else{
      this.status = false;
     if(event.target.files && event.target.files[0]) {
      var reader:any
      reader = new FileReader();
      let name = event.target.files[0].name;
      console.log(name);
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { // called once readAsDataURL is completed
       // this.url = event.currentTarget.result;
      // console.log(event);
       this.doc.push({'Name':name,'Id':event.currentTarget.result});
       //console.log(this.doc);
      }
    }
    }
  }
  deleteDoc(pos,id){
    if(confirm("Are you sure to delete ")) {
    this.doc.splice(pos, 1);
    }
  }

}
