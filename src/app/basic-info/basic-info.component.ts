import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import { BasicInfoEditComponent } from '../basic-info-edit/basic-info-edit.component';
import { WorkAddressEditComponent } from '../work-address-edit/work-address-edit.component';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
 // editcomponent:string;
  //@Input() sending:String="Amit Kumar shaw";
  basic_info_data:any[];
  constructor(public dialog: MatDialog,private sfService: SalesforceService,private getdataService:GetdataService) {}
  
  openDialog() {
    
    const dialogRef = this.dialog.open(BasicInfoEditComponent, {
      height: '500px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogWorkAddress(){
    const dialogRef = this.dialog.open(WorkAddressEditComponent, {
      height: '400px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.sfService.callRemote('BLN_MM_ViewAdminProfileCon.getProfileData',
    this.successCallback, this.failedCallback);
    this.getdataService.getData();
    this.getdataService.getPersonalInfo();
  }

  url = '../../assets/profile-placeholder.png';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader:any
      reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget.result;
        console.log(event);
      }
    }
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  public successCallback = (response) => {
    this.basic_info_data = JSON.parse(response);
   // response = response
   /*for(var d in response){
     console.log(d);
   }
    var wantedData = response.filter(function(i) {
      return i.Group_Name__c === 'Basic Information';
    });
    console.log(wantedData);*/
    console.log("Result =>");
    console.log(this.basic_info_data);
  }
  private failedCallback = (response) => console.log(response)
}
