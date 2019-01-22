import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
//import { PersonalInfo } from '../app/personal-info';

declare class Visualforce {
  static remoting: { Manager: { invokeAction: any } };
}

@Injectable()
export class SalesforceService {
  apexid:string='';
  constructor(){
    var name = 'apex__counter';
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      this.apexid = match[2];
      console.log(this.apexid);
    }
  }
  public getSFResource = (path: string) => `${window['_VfResources']}/${path}`;

  public callRemote(methodName: string, resolve, reject, config?: any) {
    console.log(methodName);
    console.log(this.apexid);
    Visualforce.remoting.Manager.invokeAction(
     methodName,
     this.apexid,
     function (result, event) {
        /*try {
          result = JSON.parse(result);
          //console.log("Calling ");
        } catch (error) {
          reject(error);
        }*/
        if (event.status) {
            resolve(result);
        } else {
          reject(result);
        }
      },
      config || { buffer: false, escape: false }
    );
  }
  public callRemoteForSettings(methodName: string, resolve, reject, config?: any) {
    console.log(methodName);
   // console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
     methodName,
     this.apexid,
     function (result, event) {
        if (event.status) {     
            resolve(result);
        } else {
          reject(result);
        }
      },
      config || { buffer: false, escape: false }
    );
  }
  public callRemoteUpdateForBasic(methodName:string,params:any,params2:any,params3:any,attname:any,logo:any,ticktdata:any,resolve, reject, config?: any){
    console.log("Called this");
    console.log(params);
   // console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
     methodName,
     params,
     params2,
     params3,
     attname,
     logo,
     ticktdata,
     this.apexid,
     //naics,
     function (result, event) {
        if (event.status) {     
            resolve(result);
        } else {
          reject(result);
        }
      },
      config || { buffer: false, escape: false }
    );
  }
  public getCountry(methodName:string,resolve, reject, config?: any){
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      //this.apexid,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );
  }
  public getCountryBasedOnEventId(methodName:string,resolve, reject, config?: any){
    //  console.log(this.id);
      Visualforce.remoting.Manager.invokeAction(
        methodName,
        this.apexid,
        function (result, event) {
          if (event.status) {     
            resolve(result);
          } else {
            reject(result);
          }
        },
      config || { buffer: false, escape: false }
      );
    }
  public getCodes(methodName:string,params:string,resolve, reject, config?: any){
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      params,
      this.apexid,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );
  }
  public callRemoteUpdateForNaics(methodName:string,params:string,resolve, reject, config?: any){
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      params,
      this.apexid,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );
  }
  public callRemoteUpdateForComm(methodName:string,com:string,subcom:string,resolve, reject, config?: any){
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      com,
      subcom,
      this.apexid,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );
  }
  public getBusinessCategory(methodName:string,type:string,field:string,resolve, reject, config?: any){
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      type,
      field,
      //this.apexid,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );
  }
  public updateProject(methodName:string,pdata:any,resolve, reject, config?: any){
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      pdata,
      this.apexid,
   //   field,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );

  }
  public updateRegistration(methodName:string,data:any,resolve, reject, config?: any){
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      data,
      this.apexid,
   //   field,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );

  }
  public updateGuestData(methodName:string,ethinicity:string,goereason:string,bsnsstr:string,no_of_emp:string,rev:string,resolve, reject, config?: any){
    console.log("ethinicity  : "+ethinicity);
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      ethinicity,
      goereason,
      bsnsstr,
      no_of_emp,
      rev,
    //  yob,
      this.apexid,
   //   field,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );

  }
  public deleteAttachement(methodName:string,id:any,resolve, reject, config?: any){
  //  console.log(this.id);
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      id,
      //this.apexid,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );
  }
  public emailChangedFunctionality(methodName:string,email:any,resolve, reject, config?: any){
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      email,
      this.apexid,
      function (result, event) {
        if (event.status) {     
          resolve(result);
        } else {
          reject(result);
        }
      },
    config || { buffer: false, escape: false }
    );

  }
  public getCodesWithouId(methodName:string,params:string,resolve, reject, config?: any){
    //  console.log(this.id);
      Visualforce.remoting.Manager.invokeAction(
        methodName,
        params,
      //  this.apexid,
        function (result, event) {
          if (event.status) {     
            resolve(result);
          } else {
            reject(result);
          }
        },
      config || { buffer: false, escape: false }
      );
    }
    public getProfileFromoTherEvent(methodName: string, resolve, reject, config?: any) {
      Visualforce.remoting.Manager.invokeAction(
       methodName,
       this.apexid,
       function (result, event) {
          /*try {
            result = JSON.parse(result);
            //console.log("Calling ");
          } catch (error) {
            reject(error);
          }*/
          if (event.status) {
              resolve(result);
              //console.log("Result of getProfileFromoTherEvent");
              //console.log(result);
          } else {
            reject(result);
          }
        },
        config || { buffer: false, escape: false }
      );
    }
    public profileCloneRemoteAction(methodName: string,id:string, resolve, reject, config?: any) {
      console.log(methodName);
      console.log(this.apexid);
      Visualforce.remoting.Manager.invokeAction(
       methodName,
       this.apexid,
       id,
       function (result, event) {
          /*try {
            result = JSON.parse(result);
            //console.log("Calling ");
          } catch (error) {
            reject(error);
          }*/
          if (event.status) {
              resolve(result);
             // console.log("Result of getProfileFromoTherEvent");
              console.log(result);
          } else {
            reject(result);
          }
        },
        config || { buffer: false, escape: false }
      );
    }
}
