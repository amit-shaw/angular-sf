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
            //console.log(result);
            resolve(result);
        } else {
          reject(result);
        }
      },
      config || { buffer: false, escape: false }
    );
  }
  /*public callRemoteForGet(methodName: string, resolve, reject, config?: any) {
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
  }*/
}
