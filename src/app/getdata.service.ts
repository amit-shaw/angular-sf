import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SalesforceService } from '../service/salesforce.service';
import { BasicData } from './basic-info-edit/basicData';
import { Country } from './country';
import { State } from './state';
import {AddressData} from './work-address-edit/address-data';
import { ServiceData } from './company-contact-edit/service-data';
import { ProjectData } from './project-info/project-data';
import { RegQuestionData } from './registration-question/registration-data';
import { CustomBarcode } from './basic-info-edit/customBarCode';
import { ProfileData } from './basic-info-edit/profileData';

@Injectable()
export class GetdataService {

  private all:any[];
  private tkt:any[];
  
  //public basic = new BehaviorSubject<any[]>([]);
  public basic = new BehaviorSubject<BasicData>({First_Name__c:'',Last_Name__c:'',Custom_Barcode__c:'',Prefix__c:'',Suffix__c:'',Email__c:'',
   verify_Email__c:'',Age__c:'',DOB__c:'',Gender__c:'',Home_Phone__c:'',Work_Phone__c:'',Mobile__c:'',TKT_Company__c:''
   ,TKT_Job_Title__c:'',DBA__c:'',Company_Logo__c:'',User_Pic__c:'',FaceBookId__c:'',Biography__c:'',
   LinkedInId__c:'',
   TwitterId__c:'',
   Instagram__c:'',
   Video__c:'',
   Home_Address__r:{
    Address1__c:'',
    Address2__c:'',
    City__c:'',
    Country__c:'',
    State__c:'',
    ZipCode__c:'',
   },
   Work_Address__r:{
    Address1__c:'',
    Address2__c:'',
    City__c:'',
    Country__c:'',
    State__c:'',
    ZipCode__c:'',
  },
   Billing_Address__r:{
    Address1__c:'',
    Address2__c:'',
    City__c:'',
    Country__c:'',
    State__c:'',
    ZipCode__c:'',
   },
   BBB_Number__c:'',
   Primary_Business_Category__c:'',Secondary_Business_Category__c:'',
   ScopeOfWork2__c:'',Established_Date__c:'',
   Duns_Number__c:'',Exceptional_Keywords__c:'',
   FaxNumber__c:'',Company_Description__c:'',
   Blog_URL__c:'',
   CageCode__c:'',
   Company_Website_URL__c:'',
   distribution_Country__c:'',
   GSA_Schedule__c:'',
   Keywords__c:'',
   Manufactures_Country__c:'',
   Outside_Facilities__c:'',
   References1__c:'',References2__c:'',
   ScopeOfWork1__c:'',Tax_Id__c:'',
   Year_in_business__c:'',Secondary_email__c:'',
   Skype__c:'',
   Snapchat__c:'',
   Wechat__c:'',
   WhatsApp__c:'',
   Blogger__c:'',
   Bln_Custom_Fields__r:{
     Id:'',
     Non_WBENC_Awards__c:'',
     RPO__c:'',
   }
});
  basic_cast = this.basic.asObservable();
  public basic_set = new BehaviorSubject<any[]>([]);
  basic_set_cast = this.basic_set.asObservable();
  public work_set = new BehaviorSubject<any[]>([]);
  work_set_cast = this.work_set.asObservable();
  private allSettings:any[];
  public speaker = new BehaviorSubject<any[]>([]);
  speaker_cast = this.speaker.asObservable();
  country=new BehaviorSubject<Country[]>([]);
  country_cast = this.country.asObservable();
  state =new BehaviorSubject<State[]>([]);
  state_cast = this.state.asObservable();
  address = new BehaviorSubject<any[]>([]);
  address_cast = this.address.asObservable();
  naics = new BehaviorSubject<any[]>([]);
  naics_cast = this.naics.asObservable();
  naics_data = new BehaviorSubject<any[]>([]);
  naics_data_cast = this.naics_data.asObservable();
  investment = new BehaviorSubject<any[]>([]);
  investment_cast = this.investment.asObservable();
  sector = new BehaviorSubject<any[]>([]);
  sector_cast = this.sector.asObservable();
  sub_sector = new BehaviorSubject<any[]>([]);
  sub_sector_cast = this.sub_sector.asObservable();
  naics_set = new BehaviorSubject<any[]>([]);
  naics_set_cast = this.naics_set.asObservable();
  attchment = new BehaviorSubject<any[]>([]);
  attchment_cast = this.attchment.asObservable();
  settings = new BehaviorSubject<any[]>([]);
  settings_cast = this.settings.asObservable();
  diversity = new BehaviorSubject<any[]>([]);
  diversity_cast = this.diversity.asObservable();
  diversity_val = new BehaviorSubject<any[]>([]);
  diversity_val_cast = this.diversity_val.asObservable();
  commodities = new BehaviorSubject<any[]>([]);
  commodities_cast = this.commodities.asObservable();
  sub_commodities = new BehaviorSubject<any[]>([]);
  sub_commodities_cast = this.sub_commodities.asObservable();
  comm_all = new BehaviorSubject<any[]>([]);
  comm_all_cast = this.comm_all.asObservable;
  sub_comm_all = new BehaviorSubject<any[]>([]);
  sub_com_all_cast = this.sub_comm_all.asObservable();
  revenue = new BehaviorSubject<ServiceData>({BLN_ListLookUp__c:'',Id:''});
  revenue_cast = this.revenue.asObservable();
  no_of_emp = new BehaviorSubject<ServiceData>({BLN_ListLookUp__c:'',Id:''});
  no_of_emp_cast = this.no_of_emp.asObservable();
  georeason = new BehaviorSubject<ServiceData>({BLN_ListLookUp__c:'',Id:''});
  georeason_cast = this.georeason.asObservable();
  ethinicity = new BehaviorSubject<ServiceData>({BLN_ListLookUp__c:'',Id:''});
  ethinicity_cast = this.ethinicity.asObservable();
  bsnstr = new BehaviorSubject<ServiceData>({BLN_ListLookUp__c:'',Id:''});
  bsnstr_cast = this.bsnstr.asObservable();
  project = new BehaviorSubject<ProjectData[]>([]);
  project_cast = this.project.asObservable();
  question = new BehaviorSubject<any[]>([]);
  question_cast = this.question.asObservable();
  reg_ques = new BehaviorSubject<RegQuestionData[]>([]);
  reg_ques_cast = this.reg_ques.asObservable();
  event_ques = new BehaviorSubject<RegQuestionData[]>([]);
  event_ques_cast = this.event_ques.asObservable();
  custom_barcode = new BehaviorSubject<CustomBarcode>({Id:'',Name:'',Custom_Barcode__c:'',Badge_Label__c:''});
  custom_barcode_cast = this.custom_barcode.asObservable();
  test:RegQuestionData[];
  primary_data = new BehaviorSubject<any[]>([]);
  primary_data_cast = this.naics_data.asObservable();
  secondry_data = new BehaviorSubject<any[]>([]);
  secondry_data_cast = this.secondry_data.asObservable();
  print_status = new BehaviorSubject<boolean>(false);
  print_status_cast = this.print_status.asObservable();
  profile_sts = new BehaviorSubject<ProfileData>({total:0,tktProf:0,naics:0,attachment:0});
  profile_sts_cast = this.profile_sts.asObservable();
  total:number=0;
  tkttotal:number=0;
  que:number=0;
  ans:number = 0;
  constructor(private sfService: SalesforceService) { }
  //temp:any[];
  backToEditorPart(){
    console.log("coming here");
    this.print_status.next(false);
  }
  getData(){
    this.sfService.callRemote('BLN_MM_ViewAdminProfileCon.getProfileData',
    this.successCallback, this.failedCallback);
  }
  getSettingsData(){
    this.sfService.callRemoteForSettings('BLN_MM_ViewAdminProfileCon.getProfileSettings',
    this.successCallback1, this.failedCallback);
  }
  getPersonalInfo(){
    this.updatePersonalInfo(this.all['tktProf']);
    //console.log("data after value");
    //console.log(this.basic);
  }
  updatePersonalInfo(newData){
    this.basic.next(newData);

    //console.log("Upadted ");
    //console.log(this.basic);
  }
  naicsCodeUpdate(naicsdata){
    this.naics.next(naicsdata);
  }
  attachmentUpdate(attch){
   // console.log(attch);
    this.attchment.next(attch);
  }
  updateYoutube(video){
    let all_data = this.all['tktProf'];
    all_data.Video__c = video;
    all_data = JSON.stringify(all_data);
    this.sfService.callRemoteUpdateForBasic('BLN_MM_ViewAdminProfileCon.updateProfileData',all_data,'','','','','',
    this.updateData, this.failedCallback);
  }
  updateOtherInfo(info1,info2){
    let all_data = this.all['tktProf'];
    all_data['Bln_Custom_Fields__r']['Non_WBENC_Awards__c'] = info1;
    all_data['Bln_Custom_Fields__r']['RPO__c'] = info2;
    console.log(all_data);
    all_data = JSON.stringify(all_data);
    
    this.sfService.callRemoteUpdateForBasic('BLN_MM_ViewAdminProfileCon.updateProfileData',all_data,'','','','','',
    this.updateData, this.failedCallback);
  }
  updateAddressInfo(address){
    //console.log(address);
    let data = this.all['tktProf'];
    let k;
    Object.keys(address).forEach(function(key) {
      if(key.indexOf('H$') != -1){
        k = key.replace('H$','');
        console.log(k);
        data['Home_Address__r'][k]= address[key];
      }
      if(key.indexOf('W$') != -1){
        k = key.replace('W$','');
        data['Work_Address__r'][k]= address[key];
      }
      if(key.indexOf('B$') != -1){
        k = key.replace('B$','');
        data['Billing_Address__r'][k]= address[key];
      }
    });
    let all_data = this.all['tktProf'];
    all_data['Home_Address__r'] = data['Home_Address__r'];
    all_data['Work_Address__r'] = data['Work_Address__r'];
    all_data['Billing_Address__r'] = data['Billing_Address__r'];
    all_data = JSON.stringify(all_data);
    this.sfService.callRemoteUpdateForBasic('BLN_MM_ViewAdminProfileCon.updateProfileData',all_data,'','','','','',
    this.updateData, this.failedCallback);
    //console.log(all_data);
  }
  updateSepcificData(newData,url,attachment,atatname,logo,ticketdata){
   // console.log(newData);
    for(let key in newData){
      //console.log(key);
      //console.log(typeof newData[key]);
      //if(newData[key] !='' && newData[key] != null){
      //  console.log("Key "+key+" ->value "+newData[key]);
        if(key == 'DOB__c'){
          if(newData[key] == ''){
            this.all['tktProf'][key] = null;
          }
        }
        if(key != 'business_str' && key != 'ethinisity' && key != 'geolocation' && key !='bsns_revnue' && key !='no_of_emp'){
          this.all['tktProf'][key] = newData[key];
        }
        if(key == 'FaceBookId__c' || key == 'LinkedInId__c' || key == 'TwitterId__c' || key =='Instagram__c' || key =='Snapchat__c' || key=='Wechat__c' || key=='Skype__c'){
          if(newData[key].substring(0,4) !='http'){
            if(newData[key] ==''){
              this.all['tktProf'][key] = newData[key];
            }
            else{
              this.all['tktProf'][key] = 'https://'+newData[key];
            }
          }
        }
        //console.log(this.all['tktProf']);
      //}
    }
    let temp = JSON.stringify(this.all['tktProf']); 
    this.sfService.callRemoteUpdateForBasic('BLN_MM_ViewAdminProfileCon.updateProfileData',temp,url,attachment,atatname,logo,ticketdata,
    this.updateData, this.failedCallback);
    //this.all['tktProf'].Last_Name__c = "Khan";
    //console.log(this.all['tktProf']);
    //this.basic.next(this.all['tktProf']);
  }
  updateNaicsCode(naics_data){
  //  console.log("Calling remote action :");
    this.sfService.callRemoteUpdateForNaics('BLN_MM_ViewAdminProfileCon.updateNAICSData',naics_data,
    this.updateDataNaics, this.failedCallback);
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  public successCallback = (response) => {
    this.all = JSON.parse(response);
    console.log("response value");
    console.log(this.all);
    console.log("tktProf : =>"+this.all['tktProf'].length);
    console.log("tcktcont data :=> "+Object.keys(this.all['tktProf']).length);
    let count = 0;
    for(let key in this.all['tktProf']){
      if(key == 'Accept_term_and_condition__c' || key == 'BLN_GN_User__c' || key == 'BLN_MM_EnableSchedules__c' || key == 'BLN_MM_ProfileStatus__c' || key == 'Billing_Address__c' || key =='Bln_Custom_Fields__c'
       || key =='Bln_Custom_Fields__r' || key =='Home_Address__c' || key =='Id' || key =='Work_Address__c' || key =='attributes'){

      }else if(key =='Home_Address__r' || key == 'Work_Address__r' || key =='Billing_Address__r'){
        if(this.all['tktProf'][key]['Address1__c'] != '' && this.all['tktProf'][key]['Address1__c'] != undefined){
          count++;
        }
      }else{
        count++;
      }
    }
    let na;
    if(this.all['naicsCodes'].length > 0){
      count++;
    }
    if(this.all['attachments'].length > 0){
      count++;
    }
    if(this.all['diversityCodes'].length > 0){
      count++;
    }
    if(this.all['commodities'].length > 0){
      count++;
    }
    if(this.all['subcommodities'].length > 0){
      count++;
    }
    if(this.all['noofemp'].BLN_ListLookUp__c != undefined){
      count++;
    }
    if(this.all['revenue'].BLN_ListLookUp__c != undefined){
      count++;
    }
    if(this.all['geogregion'].BLN_ListLookUp__c != undefined){
      count++;
    }
    if(this.all['ethnicity'].BLN_ListLookUp__c != undefined){
      count++;
    }
    if(this.all['busnstruct'].BLN_ListLookUp__c != undefined){
      count++;
    }
    this.tkttotal = count;
    this.profile_sts.next({total:this.total,tktProf:this.tkttotal,naics:0,attachment:0});
    console.log("Original count for tktprof"+count);
    console.log("Attchments : => "+ this.all['attachments'].length);
    console.log("Naics "+this.all['naicsCodes'].length);
    //console.log();
    if(this.all['tktProf']['Bln_Custom_Fields__r'] == undefined){
      this.all['tktProf'].Bln_Custom_Fields__r ={
        Non_WBENC_Awards__c:'',
        RPO__c:'',
      }
    }
    if(this.all['tktProf']['Home_Address__r'] == undefined){
      this.all['tktProf'].Home_Address__r = {
        Address1__c:'',
        Address2__c:'',
        City__c:'',
        Country__c:'',
        State__c:'',
        ZipCode__c:'',
       };
    }
    if(this.all['tktProf']['Work_Address__r'] == undefined){
      this.all['tktProf'].Work_Address__r = {
        Address1__c:'',
        Address2__c:'',
        City__c:'',
        Country__c:'',
        State__c:'',
        ZipCode__c:'',
      }
    }
    if(this.all['tktProf']['Billing_Address__r'] == undefined){
      this.all['tktProf'].Billing_Address__r = {
        Address1__c:'',
        Address2__c:'',
        City__c:'',
        Country__c:'',
        State__c:'',
        ZipCode__c:'',
      }
    }
    this.getPersonalInfo();
    this.naicsCodeUpdate(this.all['naicsCodes']);
    this.attachmentUpdate(this.all['attachments']);
    this.diversity_val.next(this.all['diversityCodes']);
    this.commodities.next(this.all['commodities']);
    this.sub_commodities.next(this.all['subcommodities']);
    this.revenue.next(this.all['revenue']);
    this.no_of_emp.next(this.all['noofemp']);
    this.georeason.next(this.all['geogregion']);
    this.ethinicity.next(this.all['ethnicity']);
    this.bsnstr.next(this.all['busnstruct']);
    this.custom_barcode.next(this.all['ticket']);
    this.tkt = this.all['ticket'];
    if(this.all['tktProf']['BLN_Projects__r'] !== undefined){
      this.project.next(this.all['tktProf']['BLN_Projects__r']['records']);
    }
    this.question.next(this.all['UserAnswer']);
    //if(this.all['UserAnswer'] != '' && this.all['UserAnswer'] !== undefined){
      this.getTicketLevelQuestion();
      this.getEventLevelQuestion();
   // }
    //console.log(this.all['tktProf']['BLN_Projects__r']['records']);
  }
  public successCallback1 = (response) => {
    this.allSettings = JSON.parse(response);
    console.log(response);
    this.getPersonalInfoSettings(this.allSettings['Basic Information']);
    this.getWorkInfoSettings(this.allSettings['Work Information']);
    this.getSpeakerSettings(this.allSettings['Speaker Information']);
    this.getAddressSettings(this.allSettings['Address Information']);
    this.getNaicsSetting(this.allSettings['Naics Code Information']);
    this.settings.next(this.allSettings);
    let item = 0;
    
    for(let key in this.allSettings){
     // console.log("key -> "+key);
      let data = this.allSettings[key];
      for(let key1 in data){
       // this.appset = data[key1].biw;
        if(data[key1].biw != undefined){
         // console.log(data[key1].biw.labelname);
          if(data[key1].biw.readaccess == 'true'){
            item++;
          /*  if(key == 'Basic Information'){

            } */
         //   console.log(data[key1].biw.labelname);
          }
        }
      }
    }
    this.total = item;
    this.profile_sts.next({total:this.total,tktProf:this.tkttotal,naics:0,attachment:0});
   // console.log("count"+item);
  }
  private failedCallback = (response) => console.log(response);
  getPersonalInfoSettings(basic_setting){
    //console.log(basic_setting);
    this.basic_set.next(basic_setting);
  }
  getWorkInfoSettings(work_set){
     this.work_set.next(work_set);
  }
  getSpeakerSettings(speaker_set){
      this.speaker.next(speaker_set);
  }
  getAddressSettings(setting){
      this.address.next(setting);
  }
  getNaicsSetting(settings){
    this.naics_set.next(settings);
  }
  public updateData = (response) => {
    console.log(response);
    let res = JSON.parse(response);
    this.all = JSON.parse(response);
    if(this.all['tktProf']['Bln_Custom_Fields__r'] == undefined){
      this.all['tktProf'].Bln_Custom_Fields__r ={
        Non_WBENC_Awards__c:'',
        RPO__c:'',
      }
    }
    if(this.all['tktProf']['Home_Address__r'] == undefined){
      this.all['tktProf'].Home_Address__r = {
        Address1__c:'',
        Address2__c:'',
        City__c:'',
        Country__c:'',
        State__c:'',
        ZipCode__c:'',
       };
    }
    if(this.all['tktProf']['Work_Address__r'] == undefined){
      this.all['tktProf'].Work_Address__r = {
        Address1__c:'',
        Address2__c:'',
        City__c:'',
        Country__c:'',
        State__c:'',
        ZipCode__c:'',
      }
    }
    if(this.all['tktProf']['Billing_Address__r'] == undefined){
      this.all['tktProf'].Billing_Address__r = {
        Address1__c:'',
        Address2__c:'',
        City__c:'',
        Country__c:'',
        State__c:'',
        ZipCode__c:'',
      }
    }
    //console.log("Resposnse data");
    //console.log(res);
    //console.log("Data after save");
    //console.log(this.all['tktProf']);
    this.basic.next(res['tktProf']);
    this.attachmentUpdate(res['attachments']);
    $(".Mask").hide();
    this.profileUpdateStatus(res);
    //this.naics
  }

  getCountryData(){
    this.sfService.getCountryBasedOnEventId('BLN_MM_ViewAdminProfileCon.getCountryNameCode'
    ,this.successContryData, this.failedCallback);
  }
  successContryData = (response) => {
    //this.country = JSON.parse(response);
    this.country.next(JSON.parse(response));
   // console.log(this.country);
  }
  getStateData(){
    this.sfService.getCountry('BLN_MM_ViewAdminProfileCon.getStateNameCode'
    ,this.successStateData, this.failedCallback);
  }
  successStateData = (response) => {
    this.state.next(JSON.parse(response));
   // console.log(this.state);
  }
  getCodes(){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','naics'
    ,this.successCodes, this.failedCallback);
  }
  val:any[]=[];
  successCodes = (response) => { 
    let data = JSON.parse(response);
    this.val = [];
    let nicsid = '';
    for(let key in data){
      nicsid = data[key]['List_Code__c'] == undefined ? '' :data[key]['List_Code__c'];
      this.val.push({'id':data[key]['Id'],'itemName':data[key]['List_Code__c']+' '+data[key]['List_Description__c']});
    }
    //console.log(this.val);
    this.naics_data.next(this.val);
  }
  getWorkInfoData(){
    this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Primary_Business_Category__c'
    ,this.primaryCode, this.failedCallback);
    this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Secondary_Business_Category__c'
    ,this.secondryCode, this.failedCallback);
  }
  primaryCode = (response) => {
    let data1 = JSON.parse(response);
    let values = [];
    this.val = [];
    this.val.push({'id':'','text':'--select--'});
    for (let entry of data1) {
      this.val.push({'id':entry,'text':entry});
    }
    
    this.primary_data.next(this.val);
  }
  secondryCode = (response) => {
    let data2 = JSON.parse(response);
    let values = [];
    this.val = [];
    this.val.push({'id':'','text':'--select--'});
    for (let entry of data2) {
      this.val.push({'id':entry,'text':entry});
    }
  //  console.log("secondry value ...");
  //  console.log(this.val);
    this.secondry_data.next(this.val);
  }
  updateDataNaics = (response) => {
    let res = JSON.parse(response);
    this.naics.next(res['naicsCodes']);
    this.profileUpdateStatus(res);
  }
  /* Diversity code -> */
  getDiversityCode(){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','diversities'
    ,this.successDiversityCodes, this.failedCallback);
  }
  successDiversityCodes = (response) => { 
    let val1=[];
    let data = JSON.parse(response);
    for(let key in data){
      val1.push({'id':data[key]['Id'],'itemName':data[key]['List_Description__c']});
    }
   // console.log(this.val);
    this.diversity.next(val1);
  }
  updateDiverData(diversity_data){
    this.sfService.callRemoteUpdateForNaics('BLN_MM_ViewAdminProfileCon.updateDiverData',diversity_data,
    this.updateDataDiversity, this.failedCallback);
  }
  updateDataDiversity = (response) => { 
    let res = JSON.parse(response);
    this.diversity_val.next(res['diversityCodes']);
    this.profileUpdateStatus(res);
  }
  /* End here diviersity code */

  /** Commodities and subcommodities code here */
  getCommoditiesCode(){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','commodities'
    ,this.successCommoditiesCodes, this.failedCallback);
  }
  successCommoditiesCodes = (response) => { 
    let val1=[];
    let data = JSON.parse(response);
    for(let key in data){
      val1.push({'id':data[key]['Id'],'itemName':data[key]['List_Description__c']});
    }
    this.comm_all.next(val1);
  }
  getSubCommoditiesCode(){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','sub commodities'
    ,this.successSubCommoditiesCodes, this.failedCallback);
  }
  successSubCommoditiesCodes = (response) => { 
    let val1=[];
    let data = JSON.parse(response);
    for(let key in data){
      val1.push({'id':data[key]['Id'],'text':data[key]['List_Description__c'],'pId':data[key]['Parent_List_Value__c']});
    }
    this.sub_comm_all.next(val1);
  }
  updateCommditiesData(commodities,subcommodities){
    this.sfService.callRemoteUpdateForComm('BLN_MM_ViewAdminProfileCon.updateCommditiesData',commodities,subcommodities,
    this.updateComm, this.failedCallback);
  }
  updateComm = (response) => { 
    let res = JSON.parse(response);
  //  console.log(res);
    this.commodities.next(res['commodities']);
    this.sub_commodities.next(res['subcommodities']);
    this.profileUpdateStatus(res);
  }
  /** getting Investment  formats data */
  getInvestementFormatData(){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','interested format(s) of cooperation'
    ,this.interestedFormats, this.failedCallback);
  }
  interestedFormats = (response) => {
    let data = JSON.parse(response);
    let val1 = [];
  //  console.log(data)
    for(let key in data){
      val1.push({'id':data[key]['List_Description__c'],'text':data[key]['List_Description__c']});
    }
    //console.log(this.val);
    this.investment.next(val1);
  }
  getSectorData(){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','sectors'
    ,this.sectorSucss, this.failedCallback);
  }
  sectorSucss = (response) => {
    let data = JSON.parse(response);
    let val1 = [];
    //console.log(data)
    for(let key in data){
      if(data[key]['List_Description__c'] != undefined){
        val1.push({'id':data[key]['List_Description__c'],'itemName':data[key]['List_Description__c'],'list':data[key]['Id']});
      }
    }
    console.log("secor value");
    console.log(val1);
    this.sector.next(val1);
  //  console.log(val1);
  }
  getSubSectorData(){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','sub sectors'
    ,this.subSectorSucss, this.failedCallback);
  }
  subSectorSucss = (response) => {
    let data = JSON.parse(response);
    let val1 = [];
    //console.log(data)
    for(let key in data){
      val1.push({'id':data[key]['List_Description__c'],'text':data[key]['List_Description__c'],'list':data[key]['Parent_List_Value__c']});
    }
  //  console.log("sub secor value");
    this.sub_sector.next(val1);
   // console.log(val1);
  }
  getTicketLevelQuestion(){
    this.sfService.callRemote('BLN_MM_ViewAdminProfileCon.editTicketLevelSurveyQuestions',
    this.successTicketData, this.failedCallback);
  }
  successTicketData = (response) =>{
    console.log("Ticket level questins : ");
    //console.log(JSON.parse(response));
    let data = JSON.parse(response);
    data = data['UserAnswer']; 
    this.updateProfileRegQuestions(data);
    this.reg_ques.next(data);
    console.log("Ticket data length "+data.length);
    this.que = data.length;
   // this.profile_sts.next({total:this.total,tktProf:this.tkttotal,naics:this.que,attachment:0});
    console.log(this.reg_ques);
   // console.log(this.test);
  }
  getEventLevelQuestion(){
    this.sfService.callRemote('BLN_MM_ViewAdminProfileCon.editEventLevelSurveyQuestions',
    this.successEventData, this.failedCallback);
  }
  successEventData = (response) =>{
    console.log("Event level questins : ");
    let data = JSON.parse(response);
    data = data['UserAnswer'];
    this.updateProfileRegQuestions(data);
    this.event_ques.next(data);
    console.log(JSON.parse(response));
   // console.log("Event count : "+data.length);
    this.que = this.que + data.length;
    console.log("this.que =>"+this.que);
    this.profile_sts.next({total:this.total,tktProf:this.tkttotal,naics:this.que,attachment:0});
  }
  updateBarcode(ticket){
    this.tkt['Custom_Barcode__c'] = ticket;
    let data = JSON.stringify(this.tkt);
    this.sfService.getCodesWithouId('BLN_MM_ViewAdminProfileCon.updateTicketData', data
              , this.successTicket, this.failedCallback);
  }
  successTicket = (response) => {
    console.log(response);
  }
  profileUpdateStatus(res){
    let count = 0;
    for(let key in res['tktProf']){
      if(key == 'Accept_term_and_condition__c' || key == 'BLN_GN_User__c' || key == 'BLN_MM_EnableSchedules__c' || key == 'BLN_MM_ProfileStatus__c' || key == 'Billing_Address__c' || key =='Bln_Custom_Fields__c'
       || key =='Bln_Custom_Fields__r' || key =='Home_Address__c' || key =='Id' || key =='Work_Address__c' || key =='attributes'){

      }else if(key =='Home_Address__r' || key == 'Work_Address__r' || key =='Billing_Address__r'){
        if(res['tktProf'][key]['Address1__c'] != '' && res['tktProf'][key]['Address1__c'] != undefined){
          count++;
        }
      }else{
        count++;
      }
    }
    let na;
    if(res['naicsCodes'].length > 0){
      count++;
    }
    if(res['attachments'].length > 0){
      count++;
    }
    if(res['diversityCodes'].length > 0){
      count++;
    }
    if(res['commodities'].length > 0){
      count++;
    }
    if(res['subcommodities'].length > 0){
      count++;
    }
    if(res['revenue'].BLN_ListLookUp__c != undefined){
      count++;
    }
    if(res['geogregion'].BLN_ListLookUp__c != undefined){
      count++;
    }
    if(res['ethnicity'].BLN_ListLookUp__c != undefined){
      count++;
    }
    if(res['busnstruct'].BLN_ListLookUp__c != undefined){
      count++;
    }
    if(res['noofemp'].BLN_ListLookUp__c != undefined){
      count++;
    }
    this.tkttotal = count;
    this.profile_sts.next({total:this.total,tktProf:this.tkttotal,naics:this.que,attachment:this.ans});
    console.log("Original count for tktprof"+count);
    console.log("Attchments : => "+ this.all['attachments'].length);
  }
  updateProfileRegQuestions(data){
    let count=0;
    let i =0;
    for(let key in data){
      if((data[key].SelectedAnswer != '' && data[key].SelectedAnswer != undefined) || (data[key].SelectedAnswerCheck != undefined && data[key].SelectedAnswerCheck.length >0)){
        count++;
      //  console.log("Amit : "+data[key].SelectedAnswer);
      //  console.log(data[key].SelectedAnswerCheck)
      }
    }
    i++;
   // console.log("value of i => "+i);
    
    this.ans = this.ans +count;
    console.log("count reg question :"+this.ans);
    this.profile_sts.next({total:this.total,tktProf:this.tkttotal,naics:this.que,attachment:this.ans});
  }
}
