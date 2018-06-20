import { Component, OnInit,Pipe,Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';

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
    this.basicEdit = this.createFormGroup();
   // this.basicEdit.controls['Prefix__c'].setValue(this.basic['Prefix__c'], {onlySelf: true});

   }
  basic:any[];
  basic_set:any[];
  suffix: string[] = ['--None--', 'Jr.', 'Sr.'];
  //def_suffix: string = 'UK';
  prefix:string[] = ['--None--','Mr.','Mrs.','Miss.'];
  dataval:any[];
  createFormGroup() {
    return new FormGroup({       
      First_Name__c: new FormControl(),  
      Last_Name__c :new FormControl(),
      Custom_Barcode__c:new FormControl(),
      Email__c:new FormControl(),
      DOB__c:new FormControl(),
      Gender__c:new FormControl(),
      Age__c:new FormControl(),
      Home_Phone__c:new FormControl(),
      Work_Phone__c:new FormControl(),
      Mobile__c:new FormControl(),
      TKT_Job_Title__c:new FormControl(),
      TKT_Company__c:new FormControl(),
      Prefix__c:new FormControl(),
      Suffix__c:new FormControl(),
     });
  }
      
  ngOnInit() {
   // this.getdataService.getData();
    //this.getdataService.getPersonalInfo();
    this.getdataService.basic_cast.subscribe(basic => {this.basic = basic;});
    this.dataval = this.basic;
    //this.getdataService.getSettingsData();
    this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
    //console.log("basic Values");
    //console.log(this.basic);
  }
  onSubmit(){
    console.log(this.basicEdit.value);
    //console.log("Value"+this.basic_set.find(basic_set => basic_set == 'First_Name__c'));
    //console.log(this.basic_set);
    this.getdataService.updateSepcificData(this.basicEdit.value);
    this.dialogRef.close();
    //console.log(data.value);
  }
  onCancel(){
    this.dialogRef.close();
  }
  url = '../../assets/profile-placeholder.png';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader:any
      reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget.result;
        console.log(event);
      }
    }
  }
}
