import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import { BasicInfoEditComponent } from '../basic-info-edit/basic-info-edit.component';
import { WorkAddressEditComponent } from '../work-address-edit/work-address-edit.component';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { CompanyContactComponent } from '../company-contact/company-contact.component';

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
  openCompanyContact(){
    const dialogRef = this.dialog.open(CompanyContactComponent, {
      height: 'auto'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  basic:any[];
  basic_set:any[];
  //temp:any[];
  ngOnInit() {
    this.getdataService.getData();
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.getSettingsData();
    this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
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
