import { Component, OnInit,Input,ViewChild,ViewEncapsulation } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
//import {MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { BasicData } from '../basic-info-edit/basicData';
import { CompanyProfileEditComponent } from '../company-profile-edit/company-profile-edit.component';
import { CompanyContactEditComponent } from '../company-contact-edit/company-contact-edit.component';
import { ServiceData } from '../company-contact-edit/service-data';
import {MatAccordion} from '@angular/material';
import { ProjectInfoEditComponent } from '../project-info-edit/project-info-edit.component';
import { ProjectData } from './project-data';
import { SalesforceService } from '../../service/salesforce.service';


@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  multi = true;
  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private getdataService:GetdataService,private sfService: SalesforceService) { }
  settings:any[];
  project_info:any[];
  basic:BasicData;
  project:ProjectData[];
  ngOnInit() {
    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.project.subscribe(project => this.project = project);
    this.getdataService.getInvestementFormatData();
    this.getdataService.getSectorData();
    this.getdataService.getSubSectorData();
    this.project_info = this.settings['Project Information'];
    console.log("Printing settings");
  //  console.log(this.basic.BLN_Projects__r);
  //  console.log(this.basic.BLN_Projects__r);
  }
  openCompanyEditDialog(index){
    console.log("Index value : "+index);
    const dialogRef = this.dialog.open(ProjectInfoEditComponent, {
      height: '500px',
      //width:'500px'
      data: {
        project_data:this.project[index],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteProject(id){
    if(window.confirm('Are sure you want to delete this project ?')){
      console.log("ID : "+id);
      this.sfService.updateProject('BLN_MM_ViewAdminProfileCon.DeleteProjectDetails',id
      ,this.sucessCall, this.failedCallback);
     }
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  private failedCallback = (response) => console.log(response);
  sucessCall = (response) => {
   // console.log("After delete: ");
   // console.log(JSON.parse(response));
    this.getdataService.project.next(JSON.parse(response))  ;
    this.snackBar.open("Project deleted successfully..",'', {
      duration: 2000,
    });
  }
}
