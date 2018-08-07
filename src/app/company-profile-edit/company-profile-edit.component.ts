import { Component, OnInit,Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { BasicData } from '../basic-info-edit/basicData';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-company-profile-edit',
  templateUrl: './company-profile-edit.component.html',
  styleUrls: ['./company-profile-edit.component.css']
})
export class CompanyProfileEditComponent implements OnInit {

  constructor(private getdataService:GetdataService,private sfService: SalesforceService,public dialog: MatDialog,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CompanyProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  work_set:any[];
  basic:BasicData;
  companyEdit:FormGroup;
  ngOnInit() {
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.companyEdit = this.createFormGroup();
  }
  createFormGroup(){
    return new FormGroup({
      Company_Description__c:new FormControl(this.basic.Company_Description__c),
      Exceptional_Keywords__c:new FormControl(this.basic.Exceptional_Keywords__c),
      Keywords__c:new FormControl(this.basic.Keywords__c)
    });
  }
  onSubmit(){
    console.log(this.companyEdit.value);
    if (this.companyEdit.valid) {
      this.getdataService.updateSepcificData(this.companyEdit.value,'','');
      this.dialogRef.close();
      this.snackBar.open("Company Capabilities updated successfully..",'', {
        duration: 2000,
      });
    }
  }
  onCancel(){
    this.dialogRef.close();
  }
}
