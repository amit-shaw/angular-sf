import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SalesforceService } from '../service/salesforce.service';

@Injectable()
export class GetdataService {

  private all:any[];
  public basic = new BehaviorSubject<any[]>([]);
  basic_cast = this.basic.asObservable();
  public basic_set = new BehaviorSubject<any[]>([]);
  basic_set_cast = this.basic_set.asObservable();
  private allSettings:any[];
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
  updateSepcificData(newData){
    //console.log("calling this");
    for(let key in newData){
      //console.log(key);
      //console.log(typeof newData[key]);
      if(newData[key] !='' && newData[key] != null){
        //console.log("Key val"+key);
        this.all['tktProf'][key] = newData[key];
      }
    }
    let temp = JSON.stringify(this.all['tktProf']); 
    this.sfService.callRemoteUpdateForBasic('BLN_MM_ViewAdminProfileCon.updateProfileData',temp,
    this.updateData, this.failedCallback);
    //this.all['tktProf'].Last_Name__c = "Khan";
    //console.log(this.all['tktProf']);
    //this.basic.next(this.all['tktProf']);
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  public successCallback = (response) => {
    this.all = JSON.parse(response);
    this.getPersonalInfo();
  }
  public successCallback1 = (response) => {
    this.allSettings = JSON.parse(response);
    console.log(response);
    this.getPersonalInfoSettings(this.allSettings['Basic Information']);
  }
  private failedCallback = (response) => console.log(response);
  getPersonalInfoSettings(basic_setting){
    //console.log(basic_setting);
    this.basic_set.next(basic_setting);
  }
  public updateData = (response) => {
    console.log(response);
   // this.basic.next(this.all['tktProf']);
  }

}
