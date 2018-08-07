import { Component, OnInit,Inject } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { BasicData } from '../basic-info-edit/basicData';
import { CompanyProfileEditComponent } from '../company-profile-edit/company-profile-edit.component';
import { CompanyContactEditComponent } from '../company-contact-edit/company-contact-edit.component';
import { ServiceData } from '../company-contact-edit/service-data';
import { CustomerRefComponent } from '../customer-ref/customer-ref.component';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styleUrls: ['./company-contact.component.css']
})
export class CompanyContactComponent implements OnInit {
  companyContactEdit: FormGroup;
  constructor(public dialog: MatDialog,private getdataService:GetdataService,) {
     }
  basic:BasicData;
 // basic_set:any[];
  settings:any[];
  work_set:any[];
  ethinicity:ServiceData;
  revenue:ServiceData;
  no_of_emp:ServiceData;
  georeason:ServiceData;
  bsnstr:ServiceData;
  ngOnInit() {
    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.ethinicity.subscribe(ethinicity => this.ethinicity = ethinicity);
    this.getdataService.no_of_emp.subscribe(no_of_emp => this.no_of_emp = no_of_emp);
    this.getdataService.georeason.subscribe(georeason => this.georeason = georeason);
    this.getdataService.revenue.subscribe(revenue =>this.revenue = revenue);
    this.getdataService.bsnstr.subscribe(bsnstr =>this.bsnstr = bsnstr);
    //this.getdataService.basic_cast.subscribe(basic => {this.basic = basic;});
   // this.dataval = this.basic;
   // this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
  }
  openCompanyEditDialog(){
    const dialogRef = this.dialog.open(CompanyContactEditComponent, {
      height: '500px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    });
  }
  openCustomerRefEditDialog(){
    const dialogRef = this.dialog.open(CustomerRefComponent, {
      height: '440px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    });
  }
}
