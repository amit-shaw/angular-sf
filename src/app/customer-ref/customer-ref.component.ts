import { Component, OnInit,Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { BasicData } from '../basic-info-edit/basicData';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
//import { ServiceData } from './service-data';


@Component({
  selector: 'app-customer-ref',
  templateUrl: './customer-ref.component.html',
  styleUrls: ['./customer-ref.component.css']
})
export class CustomerRefComponent implements OnInit {

  constructor(private getdataService:GetdataService,private sfService: SalesforceService,public dialog: MatDialog,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CustomerRefComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    work_set:any[];
    basic:BasicData;
    customerRefEdit: FormGroup;
  ngOnInit() {
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.customerRefEdit = this.createFormGroup();
  }
  createFormGroup() {
    return new FormGroup({         
      References1__c:new FormControl(this.basic.References1__c),
      ScopeOfWork1__c:new FormControl(this.basic.ScopeOfWork1__c),
      References2__c:new FormControl(this.basic.References2__c),
      ScopeOfWork2__c:new FormControl(this.basic.ScopeOfWork2__c),
      Primary_Business_Category__c:new FormControl(this.basic.Primary_Business_Category__c),
      Secondary_Business_Category__c:new FormControl(this.basic.Secondary_Business_Category__c),
      Established_Date__c:new FormControl(this.basic.Established_Date__c),
      Duns_Number__c:new FormControl(this.basic.Duns_Number__c),
      Blog_URL__c:new FormControl(this.basic.Blog_URL__c),
      Tax_Id__c:new FormControl(this.basic.Tax_Id__c),
      BBB_Number__c:new FormControl(this.basic.BBB_Number__c),
      GSA_Schedule__c:new FormControl(this.basic.GSA_Schedule__c),
      CageCode__c:new FormControl(this.basic.CageCode__c),
      distribution_Country__c:new FormControl(this.basic.distribution_Country__c),
      Manufactures_Country__c:new FormControl(this.basic.Manufactures_Country__c),
      Outside_Facilities__c:new FormControl(this.basic.Outside_Facilities__c),
      Year_in_business__c:new FormControl(this.basic.Year_in_business__c),
     });
  }
  onSubmit(){
    // console.log("Saving the data");
     if (this.customerRefEdit.valid) {
       console.log(this.customerRefEdit.value);
       this.getdataService.updateSepcificData(this.customerRefEdit.value,'','','','','');
       this.dialogRef.close();
       this.snackBar.open("customer reference updated successfully..",'', {
         duration: 2000,
       });
     }
   }
   onCancel(){
     this.dialogRef.close();
     //console.log("Cancel ----");
   }
}
