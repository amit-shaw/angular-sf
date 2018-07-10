import { Component, OnInit,Pipe,Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { BasicData } from './basicData';

//import {NgForm,ReactiveFormsModule, FormGroup,FormControl} from '@angular/forms';


@Component({
  selector: 'app-basic-info-edit',
  templateUrl: './basic-info-edit.component.html',
  styleUrls: ['./basic-info-edit.component.css']
})
export class BasicInfoEditComponent implements OnInit {
  basicEdit: FormGroup;
  constructor(public dialog: MatDialog,private sfService: SalesforceService,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<BasicInfoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
   // this.basicEdit.controls['Prefix__c'].setValue(this.basic['Prefix__c'], {onlySelf: true});

   }
  basic:BasicData;
  //basic:any[];
  basic_set:any[];
  suffix: string[] = ['--None--', 'Jr.', 'Sr.'];
  //def_suffix: string = 'UK';
  prefix:string[] = ['--None--','Mr.','Mrs.','Miss.'];
  dataval:BasicData;
  work_set:any[];
  url:any;
  createFormGroup() {
    return new FormGroup({       
      First_Name__c: new FormControl(this.basic.First_Name__c),  
      Last_Name__c :new FormControl(this.basic.Last_Name__c),
      Custom_Barcode__c:new FormControl(this.basic.Custom_Barcode__c),
      Email__c:new FormControl(this.basic.Email__c),
      DOB__c:new FormControl(this.basic.DOB__c),
      Gender__c:new FormControl(this.basic.Gender__c),
      Age__c:new FormControl(this.basic.Age__c),
      Home_Phone__c:new FormControl(this.basic.Home_Phone__c),
      Work_Phone__c:new FormControl(this.basic.Work_Phone__c),
      Mobile__c:new FormControl(this.basic.Mobile__c),
      TKT_Job_Title__c:new FormControl(this.basic.TKT_Job_Title__c),
      TKT_Company__c:new FormControl(this.basic.TKT_Company__c),
      Prefix__c:new FormControl(this.basic.Prefix__c),
      Suffix__c:new FormControl(this.basic.Suffix__c),
      verify_Email__c:new FormControl(this.basic.Email__c),
      DBA__c:new FormControl(this.basic.DBA__c),
      FaxNumber__c:new FormControl(this.basic.FaxNumber__c),
      Company_Website_URL__c:new FormControl(this.basic.Company_Website_URL__c),
     });
  }
      
  ngOnInit() {
   // this.getdataService.getData();
    //this.getdataService.getPersonalInfo();
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    console.log(this.basic.Gender__c);
    this.dataval = this.basic;
    this.basicEdit = this.createFormGroup();
    this.basicEdit.controls['Suffix__c'].setValue(this.basic.Suffix__c, {onlySelf: true});
    this.basicEdit.controls['Prefix__c'].setValue(this.basic.Prefix__c, {onlySelf: true});
    //this.getdataService.getSettingsData();
    this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.url = '/servlet/servlet.FileDownload?file='+this.basic.User_Pic__c;
    //console.log("basic Values");
    //console.log(this.basic);
  }
  onSubmit(){
    console.log(this.basicEdit.value);
    //console.log("Value"+this.basic_set.find(basic_set => basic_set == 'First_Name__c'));
    //console.log(this.basic_set);
    if (this.basicEdit.valid) {
      console.log("sending image");
      if(this.url != '/servlet/servlet.FileDownload?file='+this.basic.User_Pic__c){
        let img = this.url.split(',')[1];
        this.getdataService.updateSepcificData(this.basicEdit.value,img,'');
      }else{
        this.getdataService.updateSepcificData(this.basicEdit.value,'','');
      }
      this.dialogRef.close();
    }
    //console.log(data.value);
  }
  onCancel(){
    this.dialogRef.close();
  }
  
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader:any
      reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget.result;
        console.log(this.url);
      }
    }
  }
}
