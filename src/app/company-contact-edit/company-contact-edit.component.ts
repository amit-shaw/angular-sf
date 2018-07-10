import { Component, OnInit,Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { BasicData } from '../basic-info-edit/basicData';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { ServiceData } from './service-data';

@Component({
  selector: 'app-company-contact-edit',
  templateUrl: './company-contact-edit.component.html',
  styleUrls: ['./company-contact-edit.component.css']
})
export class CompanyContactEditComponent implements OnInit {

  constructor(private getdataService:GetdataService,private sfService: SalesforceService,public dialog: MatDialog,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CompanyContactEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  basic:BasicData;
 // basic_set:any[];
  settings:any[];
  ethinicity:ServiceData;
  revenue:ServiceData;
  no_of_emp:ServiceData;
  georeason:ServiceData;
  bsnstr:ServiceData;
  work_set:any[];
  companyEdit: FormGroup;
  bsns_revenue:any[] = [];
  geo_reason:any[] = [];
  all_ethinicity:any[] = [];
  number_emp:any[] = [];
  bsns_str:any[] = [];
  primary_code:any[];
  secondry_code:any[];
  ngOnInit() {
    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.ethinicity.subscribe(ethinicity => this.ethinicity = ethinicity);
    this.getdataService.no_of_emp.subscribe(no_of_emp => this.no_of_emp = no_of_emp);
    this.getdataService.georeason.subscribe(georeason => this.georeason = georeason);
    this.getdataService.revenue.subscribe(revenue =>this.revenue = revenue);
    this.getdataService.bsnstr.subscribe(bsnstr =>this.bsnstr = bsnstr);
    this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Primary_Business_Category__c'
    ,this.primaryCode, this.failedCallback);
    this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Secondary_Business_Category__c'
    ,this.secondryCode, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','revenue'
    ,this.businessRevinue, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','geographical region'
    ,this.geoResonSucss, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','ethnicity'
    ,this.ethinisitySucss, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','number of employees'
    ,this.noOfEmply, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','Year_in_business__c'
    ,this.yearOfBsns, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','business structure'
    ,this.bsnsStr, this.failedCallback);
    this.companyEdit = this.createFormGroup();
    
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  private failedCallback = (response) => console.log(response);
  primaryCode = (response) => {
    //console.log(response);
    this.primary_code = JSON.parse(response);
    this.companyEdit.controls['Primary_Business_Category__c'].setValue(this.basic.Primary_Business_Category__c, {onlySelf: true});
    //this.country = JSON.parse(response);
    //this.country.next(JSON.parse(response));
   // console.log(this.country);
  }
  secondryCode= (response) => {
    this.secondry_code = JSON.parse(response);
    this.companyEdit.controls['Secondary_Business_Category__c'].setValue(this.basic.Secondary_Business_Category__c, {onlySelf: true});
   // console.log("Secondry code ->");
    //console.log(JSON.parse(response));
  }
  businessRevinue = (response) =>{
    console.log("Bsns revinew");
    let data = JSON.parse(response);
    for(let key =0; key<data.length;key++){
      this.bsns_revenue.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
    }
    this.companyEdit.controls['bsns_revnue'].setValue(this.revenue.BLN_ListLookUp__c, {onlySelf: true});
    //console.log(this.revenue);
    //console.log("Revenue id : "+this.revenue.BLN_ListLookUp__c);
    //console.log(this.bsns_revenue);
  }
  geoResonSucss = (response) => {
    //console.log("Geo reason");
    let data = JSON.parse(response);
    for(let key=0;key<data.length;key++){
      this.geo_reason.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
    }
    this.companyEdit.controls['geolocation'].setValue(this.georeason.BLN_ListLookUp__c, {onlySelf: true});
    //console.log(this.geo_reason);
  }
  ethinisitySucss = (response) => {
    console.log("Ethinisity");
    let data = JSON.parse(response);
    //console.log(data);
    for(let key = 0;key< data.length; key++){
      this.all_ethinicity.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
    }
    this.companyEdit.controls['ethinisity'].setValue(this.ethinicity.BLN_ListLookUp__c, {onlySelf: true});
    //console.log(this.all_ethinicity);
    
  }
  noOfEmply = (response) => {
    //console.log("year in bsns");
    let data = JSON.parse(response);
   // for(let key in data){
    for(let key =0;key<data.length;key++){
      this.number_emp.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
    }
    this.companyEdit.controls['no_of_emp'].setValue(this.no_of_emp.BLN_ListLookUp__c, {onlySelf: true});

    //console.log(this.number_emp);
  }
  yearOfBsns = (response) =>{
    console.log("Year of business : ");
    console.log(response);
  }
  bsnsStr = (response) => {
   // console.log(response);
    let data = JSON.parse(response);
    for(let key=0;key<data.length;key++){
      this.bsns_str.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
    }
    this.companyEdit.controls['business_str'].setValue(this.bsnstr.BLN_ListLookUp__c, {onlySelf: true});

   // console.log(this.bsns_str);
  }
  createFormGroup() {
    return new FormGroup({         
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
      no_of_emp:new FormControl(''),
      bsns_revnue:new FormControl(''),
      geolocation:new FormControl(''),
      ethinisity:new FormControl(''),
      business_str:new FormControl(''),
     });
  }
  onSubmit(){
   // console.log("Saving the data");
    if (this.companyEdit.valid) {
      this.getdataService.updateSepcificData(this.companyEdit.value,'','');
      this.dialogRef.close();
      this.snackBar.open(this.work_set[0].biw.groupname+" updated successfully..",'', {
        duration: 2000,
      });
    }
  }
  onCancel(){
    this.dialogRef.close();
    //console.log("Cancel ----");
  }
}
