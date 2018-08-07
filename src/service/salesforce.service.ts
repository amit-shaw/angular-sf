import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';
//import { PersonalInfo } from '../app/personal-info';

declare class Visualforce {
  static remoting: { Manager: { invokeAction: any } };
}

@Injectable()
export class SalesforceService {

  public getSFResource = (path: string) => `${window['_VfResources']}/${path}`;

  public callRemote(methodName: string, resolve, reject, config?: any) {
    console.log(methodName);
    Visualforce.remoting.Manager.invokeAction(
     methodName,
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
    Visualforce.remoting.Manager.invokeAction(
     methodName,
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
  public callRemoteUpdateForBasic(methodName:string,params:any,params2:any,params3:any,resolve, reject, config?: any){
    console.log("Called this");
    console.log(params);
    Visualforce.remoting.Manager.invokeAction(
     methodName,
     params,
     params2,
     params3,
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
    Visualforce.remoting.Manager.invokeAction(
      methodName,
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
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      params,
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
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      params,
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
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      com,
      subcom,
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
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      type,
      field,
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
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      pdata,
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
    Visualforce.remoting.Manager.invokeAction(
      methodName,
      data,
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
}
