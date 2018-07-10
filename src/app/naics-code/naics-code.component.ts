import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { NaicsCodeEditComponent } from '../naics-code-edit/naics-code-edit.component';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { DiversityEditComponent } from '../diversity-edit/diversity-edit.component';
import { CommoditiesComponent } from '../commodities/commodities.component';


@Component({
  selector: 'app-naics-code',
  templateUrl: './naics-code.component.html',
  styleUrls: ['./naics-code.component.css']
})
export class NaicsCodeComponent implements OnInit {

  constructor(public dialog: MatDialog,private sfService: SalesforceService,private getdataService:GetdataService) {}
  openDialog() {
    const dialogRef = this.dialog.open(NaicsCodeEditComponent, {
      height: '230px',
      width:'700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
  openDialogDiversity(){
    const dialogRef = this.dialog.open(DiversityEditComponent, {
      height: '230px',
      width:'700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
  openDialogCommonities(){
    const dialogRef = this.dialog.open(CommoditiesComponent, {
      height: '300px',
      width:'700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
  naics:any[];
  naics_set:any[];
  settings:any[];
  diversity_val:any[];
  commodities:any[];
  sub_commodities:any[];
 
  ngOnInit() {

    this.getdataService.getCommoditiesCode();
    this.getdataService.getSubCommoditiesCode();
    this.getdataService.getCodes();
    this.getdataService.getDiversityCode();
    this.getdataService.naics.subscribe(naics => this.naics = naics);
    this.getdataService.naics_set.subscribe(naics_set => this.naics_set = naics_set);
    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.diversity_val.subscribe(diversity_val =>this.diversity_val = diversity_val);
    this.getdataService.commodities.subscribe(commodities => this.commodities = commodities);
    this.getdataService.sub_commodities.subscribe(sub_commodities => this.sub_commodities = sub_commodities);
   // console.log("Settings");
   // console.log(this.settings['Diversity Type Information'][0]);
  }

}
