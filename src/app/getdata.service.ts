import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SalesforceService } from '../service/salesforce.service';
import { BasicData } from './basic-info-edit/basicData';
import { Country } from './country';
import { State } from './state';
import {AddressData} from './work-address-edit/address-data';

@Injectable()
export class GetdataService {

  private all:any[];
  //public basic = new BehaviorSubject<any[]>([]);
  public basic = new BehaviorSubject<BasicData>({First_Name__c:'',Last_Name__c:'',Prefix__c:'',Suffix__c:'',Custom_Barcode__c:'',Email__c:'',
   verify_Email__c:'',Age__c:'',DOB__c:'',Gender__c:'',Home_Phone__c:'',Work_Phone__c:'',Mobile__c:'',TKT_Company__c:''
   ,TKT_Job_Title__c:'',DBA__c:'',Company_Logo__c:'',User_Pic__c:'',FaceBookId__c:'',
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
    console.log(data);
  }
  updateSepcificData(newData,url){
    console.log(url);
    for(let key in newData){
      //console.log(key);
      //console.log(typeof newData[key]);
      if(newData[key] !='' && newData[key] != null){
        //console.log("Key val"+key);
        this.all['tktProf'][key] = newData[key];
      }
    }
    let temp = JSON.stringify(this.all['tktProf']); 
    this.sfService.callRemoteUpdateForBasic('BLN_MM_ViewAdminProfileCon.updateProfileData',temp,url,
    this.updateData, this.failedCallback);
    //this.all['tktProf'].Last_Name__c = "Khan";
    //console.log(this.all['tktProf']);
    //this.basic.next(this.all['tktProf']);
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  public successCallback = (response) => {
    console.log(response);
    this.all = JSON.parse(response);
    this.getPersonalInfo();
  }
  public successCallback1 = (response) => {
    this.allSettings = JSON.parse(response);
    console.log(response);
    this.getPersonalInfoSettings(this.allSettings['Basic Information']);
    this.getWorkInfoSettings(this.allSettings['Work Information']);
    this.getSpeakerSettings(this.allSettings['Speaker Information']);
    this.getAddressSettings(this.allSettings['Address Information']);

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
  public updateData = (response) => {
    console.log(response);
   // this.basic.next(this.all['tktProf']);
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
}
