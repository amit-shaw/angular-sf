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
  secondry_data_cast = this.naics_data.asObservable();
  constructor(private sfService: SalesforceService) { }
  //temp:any[];
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
    console.log(attch);
    this.attchment.next(attch);
  }
  updateAddressInfo(address){
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
    console.log(newData);
    for(let key in newData){
      //console.log(key);
      //console.log(typeof newData[key]);
      //if(newData[key] !='' && newData[key] != null){
        console.log("Key "+key+" ->value "+newData[key]);
        if(key == 'DOB__c'){
          if(newData[key] == ''){
            this.all['tktProf'][key] = null;
          }
        }
        if(key != 'business_str' && key != 'ethinisity' && key != 'geolocation' && key !='bsns_revnue' && key !='no_of_emp'){
          this.all['tktProf'][key] = newData[key];
        }
        if(key == 'FaceBookId__c' || key == 'LinkedInId__c' || key == 'TwitterId__c' || key =='Instagram__c'){
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
    console.log("Calling remote action :");
    this.sfService.callRemoteUpdateForNaics('BLN_MM_ViewAdminProfileCon.updateNAICSData',naics_data,
    this.updateDataNaics, this.failedCallback);
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  public successCallback = (response) => {
    console.log(response);
    this.all = JSON.parse(response);
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
    if(this.all['UserAnswer'] != '' && this.all['UserAnswer'] !== undefined){
      this.getTicketLevelQuestion();
      this.getEventLevelQuestion();
    }
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
    //console.log(response);
    let res = JSON.parse(response);
    this.all = JSON.parse(response);
    //console.log("Resposnse data");
    //console.log(res);
    //console.log("Data after save");
    //console.log(this.all['tktProf']);
    this.basic.next(res['tktProf']);
    this.attachmentUpdate(res['attachments']);
    $(".Mask").hide();
    //this.naics
  }

  getCountryData(){
    this.sfService.getCountry('BLN_MM_ViewAdminProfileCon.getCountryNameCode'
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
    for(let key in data){
      this.val.push({'id':data[key]['Id'],'text':data[key]['List_Code__c']+' '+data[key]['List_Description__c']});
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
    for (let entry of data1) {
      this.val.push({'id':entry,'text':entry});
    }
    
    this.primary_data.next(this.val);
  }
  secondryCode = (response) => {
    let data2 = JSON.parse(response);
    let values = [];
    this.val = [];
    for (let entry of data2) {
      this.val.push({'id':entry,'text':entry});
    }
    console.log("secondry value ...");
    console.log(this.val);
    this.secondry_data.next(this.val);
  }
  updateDataNaics = (response) => {
    let res = JSON.parse(response);
    this.naics.next(res['naicsCodes']);
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
      val1.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
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
      val1.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
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
    console.log(res);
    this.commodities.next(res['commodities']);
    this.sub_commodities.next(res['subcommodities']);
  }
  /** getting Investment  formats data */
  getInvestementFormatData(){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','interested format(s) of cooperation'
    ,this.interestedFormats, this.failedCallback);
  }
  interestedFormats = (response) => {
    let data = JSON.parse(response);
    let val1 = [];
    console.log(data)
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
      val1.push({'id':data[key]['List_Description__c'],'text':data[key]['List_Description__c'],'list':data[key]['Id']});
    }
  //  console.log("secor value");
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
    this.reg_ques.next(data);
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
    this.event_ques.next(data);
    console.log(JSON.parse(response));
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
}
