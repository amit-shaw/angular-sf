import { Component, OnInit,Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { BasicData } from '../basic-info-edit/basicData';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-company-profile-edit',
  templateUrl: './company-profile-edit.component.html',
  styleUrls: ['./company-profile-edit.component.css']
})
export class CompanyProfileEditComponent implements OnInit {

  constructor(private getdataService:GetdataService,private sfService: SalesforceService,public dialog: MatDialog,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CompanyProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private confirmationDialogService: ConfirmationDialogService) { 
      //this.companyEdit = this.createFormGroup();
    }

  work_set:any[];
  basic:BasicData;
  companyEdit:FormGroup;
  flag:boolean=true;
  ngOnInit() {
    $(".Mask").show();
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.companyEdit = this.createFormGroup();
    setTimeout (() => {
      $('#company-title')[0].scrollIntoView();
      $(".Mask").hide();
    },1000);
  }
  createFormGroup(){
    return new FormGroup({
      Company_Description__c:new FormControl(this.basic.Company_Description__c),
      Exceptional_Keywords__c:new FormControl(this.basic.Exceptional_Keywords__c),
      Keywords__c:new FormControl(this.basic.Keywords__c)
    });
    //$('#company-title')[0].scrollIntoView();
  }
  onSubmit(){
    console.log(this.companyEdit.value);
    this.flag = true;
    if(this.work_set[9].biw.required =='true' ){
      if(this.companyEdit.value.Company_Description__c =='' || this.companyEdit.value.Company_Description__c == null || this.companyEdit.value.Company_Description__c =='<p><br></p>'){
        this.flag = false;
      }
    }
    if(this.work_set[11].biw.required =='true'){
      if(this.companyEdit.value.Exceptional_Keywords__c =='' || this.companyEdit.value.Exceptional_Keywords__c == null || this.companyEdit.value.Exceptional_Keywords__c =='<p><br></p>'){
        this.flag = false;
      }
    }
    if(this.work_set[10].biw.required =='true'){
      if(this.companyEdit.value.Keywords__c =='' || this.companyEdit.value.Keywords__c == null || this.companyEdit.value.Keywords__c =='<p><br></p>'){
        this.flag = false;
      }
    }
    if (this.companyEdit.valid && this.flag == true) {
      this.getdataService.updateSepcificData(this.companyEdit.value,'','','','','');
      this.dialogRef.close();
      this.snackBar.open("Company Capabilities updated successfully..",'', {
        duration: 2000,
      });
    }
    else{
      this.confirmationDialogService.confirm('Alert ..', 'Please fill all the required fields ...', 'OK', '')
      .then((confirmed) => {
        if (confirmed) {

        } else {

        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
     }
  }
  onCancel(){
    this.dialogRef.close();
  }
}
