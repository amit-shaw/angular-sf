import { Component, OnInit,Inject } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { BasicData } from '../basic-info-edit/basicData';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.css']
})
export class CompanyContactComponent implements OnInit {
  companyContactEdit: FormGroup;
  constructor(public dialog: MatDialog,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<CompanyContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.companyContactEdit = this.createFormGroup();
     }
  basic:BasicData[];
  basic_set:any[];
  createFormGroup() {
    return new FormGroup({       
      Work_Phone__c:new FormControl(),
      TKT_Job_Title__c:new FormControl(),
      TKT_Company__c:new FormControl(),
      Prefix__c:new FormControl(),
      Suffix__c:new FormControl(),
     });
  }
  ngOnInit() {
    //this.getdataService.basic_cast.subscribe(basic => {this.basic = basic;});
   // this.dataval = this.basic;
   // this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
  }

}
