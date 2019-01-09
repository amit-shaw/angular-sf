import { Component, OnInit,Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { BasicData } from '../basic-info-edit/basicData';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { ServiceData } from './service-data';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-company-contact-edit',
  templateUrl: './company-contact-edit.component.html',
  styleUrls: ['./company-contact-edit.component.css']
})
export class CompanyContactEditComponent implements OnInit {

  constructor(private getdataService:GetdataService,private sfService: SalesforceService,public dialog: MatDialog,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CompanyContactEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private confirmationDialogService: ConfirmationDialogService) { }
  basic:BasicData;
 // basic_set:any[];
  loader:number = 0;
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
  year_in_business:any[];
  primary_code_val:Array<Select2OptionData>=[];
  primary_data:Array<Select2OptionData>=[];
  secondry_data:Array<Select2OptionData>=[];
  p_val:string='';
  s_val:string='';
  public options: Select2Options;
  ngOnInit() {
    $(".Mask").show();
    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.ethinicity.subscribe(ethinicity => this.ethinicity = ethinicity);
    this.getdataService.no_of_emp.subscribe(no_of_emp => this.no_of_emp = no_of_emp);
    this.getdataService.georeason.subscribe(georeason => this.georeason = georeason);
    this.getdataService.revenue.subscribe(revenue =>this.revenue = revenue);
    this.getdataService.bsnstr.subscribe(bsnstr =>this.bsnstr = bsnstr);
    this.getdataService.primary_data.subscribe(primary_data => this.primary_data = primary_data);
    this.getdataService.secondry_data.subscribe(secondry_data =>this.secondry_data = secondry_data);
   /* this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Primary_Business_Category__c'
    ,this.primaryCode, this.failedCallback);
    this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Secondary_Business_Category__c'
    ,this.secondryCode, this.failedCallback); */
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','revenue'
    ,this.businessRevinue, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','geographical region'
    ,this.geoResonSucss, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','ethnicity'
    ,this.ethinisitySucss, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','number of employees'
    ,this.noOfEmply, this.failedCallback);
    this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Year_in_business__c'
    ,this.yearOfBsns, this.failedCallback);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','business structure'
    ,this.bsnsStr, this.failedCallback);
    this.companyEdit = this.createFormGroup();
    this.options = {
       width:"100%",
    }
    if(this.basic.Primary_Business_Category__c != undefined && this.basic.Primary_Business_Category__c != null){
      this.p_val = this.basic.Primary_Business_Category__c;
    }
    if(this.basic.Secondary_Business_Category__c != undefined && this.basic.Secondary_Business_Category__c!= null){
      this.s_val = this.basic.Secondary_Business_Category__c;
    }
  }
  changedPrimary(data: {value: string[]}) {
    console.log(data.value);
    this.companyEdit.value.Primary_Business_Category__c = data.value;
    this.companyEdit.controls['Primary_Business_Category__c'].setValue(data.value, {onlySelf: true});
    //console.log(this.);
  }
  changedSecondry(data: {value: string[]}) {
    console.log(data.value);
    this.companyEdit.value.Secondary_Business_Category__c = data.value;
    this.companyEdit.controls['Secondary_Business_Category__c'].setValue(data.value, {onlySelf: true});
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  private failedCallback = (response) => console.log(response);
  primaryCode = (response) => {
    this.primary_code = JSON.parse(response);
    for (let entry of this.primary_code) {
      this.primary_code_val.push({'id':entry,'text':entry});
    }
    console.log(this.primary_code_val);
    //this.companyEdit.controls['Primary_Business_Category__c'].setValue(this.basic.Primary_Business_Category__c, {onlySelf: true});
    //this.country = JSON.parse(response);
    //this.country.next(JSON.parse(response));
   // console.log(this.country);
  }
  secondryCode= (response) => {
    this.secondry_code = JSON.parse(response);
    //this.companyEdit.controls['Secondary_Business_Category__c'].setValue(this.basic.Secondary_Business_Category__c, {onlySelf: true});
   // console.log("Secondry code ->");
    //console.log(JSON.parse(response));
  }
  businessRevinue = (response) =>{
    console.log("Bsns revinew");
    this.loader = this.loader +1;
    if(this.loader == 6){
      $(".Mask").hide();
    }
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
    this.loader = this.loader +1;
    if(this.loader == 6){
      $(".Mask").hide();
    }
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
    this.loader = this.loader +1;
    if(this.loader == 6){
      $(".Mask").hide();
    }
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
    this.loader = this.loader +1;
    if(this.loader == 6){
      $(".Mask").hide();
    }

    //console.log(this.number_emp);
  }
  yearOfBsns = (response) =>{
    console.log("Year of business : ");
    console.log(response);
    this.year_in_business = JSON.parse(response);
    this.companyEdit.controls['Year_in_business__c'].setValue(this.basic.Year_in_business__c, {onlySelf: true});
    this.loader = this.loader +1;
    if(this.loader == 6){
      $(".Mask").hide();
    }
  }
  bsnsStr = (response) => {
   // console.log(response);
    let data = JSON.parse(response);
    for(let key=0;key<data.length;key++){
      this.bsns_str.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
    }
    this.companyEdit.controls['business_str'].setValue(this.bsnstr.BLN_ListLookUp__c, {onlySelf: true});
    this.loader = this.loader +1;
    if(this.loader == 6){
      $(".Mask").hide();
    }
   // console.log(this.bsns_str);
  }
  successGusetData = (response) =>{
    let data = JSON.parse(response);
    console.log("Printing response");
    console.log(response);
    this.getdataService.revenue.next(data['revenue']);
    this.getdataService.no_of_emp.next(data['noofemp']);
    this.getdataService.georeason.next(data['geogregion']);
    this.getdataService.ethinicity.next(data['ethnicity']);
    this.getdataService.bsnstr.next(data['busnstruct']);
    this.getdataService.profileUpdateStatus(data);
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
      no_of_emp:new FormControl(this.no_of_emp.BLN_ListLookUp__c),
      bsns_revnue:new FormControl(this.revenue.BLN_ListLookUp__c),
      geolocation:new FormControl(this.georeason.BLN_ListLookUp__c),
      ethinisity:new FormControl(this.ethinicity.BLN_ListLookUp__c),
      business_str:new FormControl(this.bsnstr.BLN_ListLookUp__c),
     });
  }
  onSubmit(){
   // console.log("Saving the data");
  // console.log(this.companyEdit.value);
   //console.log("Ethi : "+this.companyEdit.value.ethinisity);
    let required = 0;
    if(this.work_set[0].biw.required == 'true'){
      console.log("Primary value : "+this.companyEdit.value.Primary_Business_Category__c);
      if(this.companyEdit.value.Primary_Business_Category__c == '' || this.companyEdit.value.Primary_Business_Category__c == undefined){
        required = 1;
      }
    }
    if(this.work_set[1].biw.required == 'true'){
      console.log("secondy value : "+this.companyEdit.value.Secondary_Business_Category__c);
      if(this.companyEdit.value.Secondary_Business_Category__c == '' || this.companyEdit.value.Secondary_Business_Category__c == undefined){
        required = 1;
      }
    }
    if (this.companyEdit.valid && required == 0) {
     // console.log(this.companyEdit.value);
      let eth = (this.companyEdit.value.ethinisity != undefined) ? this.companyEdit.value.ethinisity : '';
      let geo = (this.companyEdit.value.geolocation != undefined) ? this.companyEdit.value.geolocation :'';
      let bsn = (this.companyEdit.value.business_str != undefined) ? this.companyEdit.value.business_str : '';
      let no_emp = (this.companyEdit.value.no_of_emp != undefined) ? this.companyEdit.value.no_of_emp : '';
      let rev = (this.companyEdit.value.bsns_revnue != undefined) ? this.companyEdit.value.bsns_revnue :'';
      this.sfService.updateGuestData('BLN_MM_ViewAdminProfileCon.updateGuests',eth,geo,bsn,no_emp,rev
    ,this.successGusetData, this.failedCallback);
      this.getdataService.updateSepcificData(this.companyEdit.value,'','','','','');
      this.dialogRef.close();
      this.snackBar.open(this.work_set[0].biw.groupname+" updated successfully..",'', {
        duration: 2000,
      });
    }
    else{
      this.confirmationDialogService.confirm('Alert ..', 'Please fill all the required fields ...','OK','')
      .then((confirmed) =>  {
        if(confirmed){
       
        }else{
         
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }
  onCancel(){
    this.dialogRef.close();
    //console.log("Cancel ----");
  }
}
