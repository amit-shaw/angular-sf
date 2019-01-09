import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import { BasicInfoEditComponent } from '../basic-info-edit/basic-info-edit.component';
import { WorkAddressEditComponent } from '../work-address-edit/work-address-edit.component';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { CompanyContactComponent } from '../company-contact/company-contact.component';
import { BasicData } from '../basic-info-edit/basicData';
import { SocailMediaEditComponent } from '../socail-media-edit/socail-media-edit.component';
import { Country } from '../country';
import { SafeHtmlPipe } from '../safe-html';
import { CustomBarcode } from '../basic-info-edit/customBarCode';
import { YoutubeEditComponent } from '../youtube-edit/youtube-edit.component';
import { ProfileData } from '../basic-info-edit/profileData';



@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  //basic_info_data:any[];
  constructor(public dialog: MatDialog,private sfService: SalesforceService,private getdataService:GetdataService) {
  }
  
  openDialog() {
    
    const dialogRef = this.dialog.open(BasicInfoEditComponent, {
      disableClose: true,
      height: '500px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogSocial(){
    const dialogRef = this.dialog.open(SocailMediaEditComponent, {
      disableClose: true,
      height: '500px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogWorkAddress(){
    const dialogRef = this.dialog.open(WorkAddressEditComponent, {
      disableClose: true,
      height: '500px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogYoutubeEdit(){
    const dialogRef = this.dialog.open(YoutubeEditComponent, {
      disableClose: true,
      height: '400px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openCompanyContact(){
    const dialogRef = this.dialog.open(CompanyContactComponent, {
      disableClose: true,
      height: 'auto'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  basic:BasicData;
  basic_set:any[];
  speaker:any[];
  attchment:any[];
  work_set:any[];
  address:any[];
  custom_barcode:CustomBarcode;
  videos:any[]=[];
  profile_sts:ProfileData;
 // count:number =0;
  //temp:any[];
  percent:number=0;
  ngOnInit() {
    this.getdataService.getData();
    this.getdataService.getCountryData();
    this.getdataService.getStateData();

    this.getdataService.basic_cast.subscribe(basic => {
      this.basic = basic;
      //console.log("videos : => :"+this.basic.Video__c);
      if(this.basic.Video__c != '' && this.basic.Video__c != undefined){
        this.videos = this.basic.Video__c.split(",")
      }else{
        this.videos = [];
      }
     // this.count++;
      //console.log(this.videos);
    });
    this.getdataService.profile_sts.subscribe(profile_sts=>{
      this.profile_sts = profile_sts;
      let ans = 0;
      let que = 0;
      if(this.profile_sts.naics != undefined){
        que = this.profile_sts.naics;
      }
      if(this.profile_sts.attachment != undefined){
        ans = this.profile_sts.attachment
      }
      this.percent = Math.round(((this.profile_sts.tktProf+ans)/(this.profile_sts.total+que))*100);
      console.log("value ]]]   "+this.profile_sts.tktProf)
      console.log("total = ]]]  "+this.profile_sts.total);
      console.log("reg"+this.profile_sts.naics);
      console.log("percent "+this.percent);
      let colour;
      if(this.percent <50){
        colour = 'red';
      }else if(this.percent >50 && this.percent < 80 ){
        colour = 'orange';
      }
      else{
        colour = 'green';
      }
      var ele = document.getElementById('complete-percent');
      ele.style.width = this.percent+"%";
      ele.style.background = colour;
    });
   
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.address_cast.subscribe(address => this.address = address);
    //this.getdataService.getSettingsData();
    //console.log(this.basic);
    this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
    this.getdataService.speaker.subscribe(speaker => this.speaker = speaker);
    this.getdataService.attchment.subscribe(attchment =>this.attchment = attchment);
    this.getdataService.custom_barcode_cast.subscribe(custom_barcode => this.custom_barcode = custom_barcode);
    //console.log(this.basic);
   /* if(this.basic.Video__c != '' && this.basic.Video__c != undefined){
      this.videos = this.basic.Video__c.split(",");
      console.log(this.basic.Video__c);
      console.log(this.videos);
    }*/
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
}
