import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SalesforceService } from '../service/salesforce.service';

@Injectable()
export class GetdataService {

  private basic = new BehaviorSubject<any[]>([]);
  basic_cast = this.basic.asObservable();
  private all:any[];
  constructor(private sfService: SalesforceService) { }
  getData(){
    this.sfService.callRemote('BLN_MM_ViewAdminProfileCon.getProfileData',
    this.successCallback, this.failedCallback);
  }
  getPersonalInfo(){
    console.log("Method called");
    this.basic_cast = this.all['tktProf'];
    console.log(this.basic_cast);
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  public successCallback = (response) => {
    this.all = JSON.parse(response);
    this.getPersonalInfo();
    console.log("Came here");
    //console.log(this.all);
  }
  private failedCallback = (response) => console.log(response)

}
