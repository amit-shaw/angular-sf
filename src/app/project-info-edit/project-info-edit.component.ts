import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BasicData } from '../basic-info-edit/basicData';
import { GetdataService } from '../getdata.service';
import { ProjectData } from '../project-info/project-data';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { SalesforceService } from '../../service/salesforce.service';
import { Select2OptionData } from 'ng2-select2';


//import { Customer } from './customer.interface';

@Component({
  selector: 'app-project-info-edit',
  templateUrl: './project-info-edit.component.html',
  styleUrls: ['./project-info-edit.component.css']
})
export class ProjectInfoEditComponent implements OnInit {

  public myForm: FormGroup;
  settings:any[];
  public current: string;
  //project_info:any[];
  basic:BasicData;
  project:ProjectData[];
  pdata:ProjectData;
  project_loc:any[] = [];
  interested:Array<Select2OptionData>=[];
  investment:Array<Select2OptionData>=[];
  //sector:Array<Select2OptionData> = [];
  //sub_sector:Array<Select2OptionData> = [];
  sub_sector:any[];
  sector:any[];
  public options: Select2Options;
 // sectors:any[] = []; 
  //sub_sector:any[] = [];
  def_interested:any[];
  def_sector:any[];
  def_sub_sector:any[];
  select_sub_sec:any[] = [];
  sector_val:string;
  sub_sector_val:string;
  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private _fb: FormBuilder,private getdataService:GetdataService,
    private sfService: SalesforceService,
    public dialogRef: MatDialogRef<ProjectInfoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {project_data :ProjectData}) {
     // console.log(data);
     }
    ngOnInit() {
    this.pdata = this.data.project_data;
    console.log(this.pdata);
    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.project.subscribe(project => this.project = project);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','project location'
    ,this.projectLocation, this.failedCallback);
    this.getdataService.investment.subscribe(investment => this.investment = investment);
    this.getdataService.sector.subscribe(sector => this.sector = sector);
    this.getdataService.sub_sector.subscribe(sub_sector => this.sub_sector = sub_sector);
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','interested format(s) of cooperation'
    ,this.interestedFormats, this.failedCallback);
    if(this.pdata != null){
      if(this.pdata.Sectors__c != '' && this.pdata.Sectors__c !== undefined){
        this.def_sector = this.pdata.Sectors__c.split(";");
        console.log(this.def_sector);
        let val = this.def_sector;
        for(let k=0;k<val.length;k++){
          let sub_id = this.sector.filter((item) => item.id == val[k]);
          console.log(sub_id[0].list);
          let sub = this.sub_sector.filter((item) => item.list == sub_id[0].list);
          let n = this.sector.filter((item) => item.list == val[k]);
          if(sub.length >= 1){
            this.select_sub_sec.push({'id':0,'text':val[k],'children':sub});
          }
        }
        console.log("list value are");
        console.log(this.select_sub_sec);
      }
      if(this.pdata.Sub_Sectors__c != '' && this.pdata.Sub_Sectors__c !== undefined){
        console.log(this.pdata.Sub_Sectors__c);
        this.def_sub_sector = this.pdata.Sub_Sectors__c.split(";");
        console.log(this.def_sub_sector);
      }
    }
   /* this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','sectors'
    ,this.sectorSuc, this.failedCallback); */
   /* this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getCustomCode','sectors'
    ,this.subSectorSuc, this.failedCallback); */
    //console.log(this.project[0]);
    this.myForm = this._fb.group({
   //   name: ['', [Validators.required, Validators.minLength(5)]],
      project: this._fb.array([
          this.initAddress(this.pdata),
      ])
  });
 /* for(let l=1;l<this.project.length;l++){
    this.addProject(this.project[l]);
  }*/
  //this.addProject();
  //this.addProject();
  this.options = {
    multiple: true
  }
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  private failedCallback = (response) => console.log(response);
  projectLocation = (response) => {
    let data = JSON.parse(response);
    for(let key =0; key<data.length;key++){
      this.project_loc.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
    }
  }
  interestedFormats = (response) =>{
    let data = JSON.parse(response);
    for(let key =0; key<data.length;key++){
      this.interested.push({'id':data[key]['Id'],'text':data[key]['List_Description__c']});
    }
    if(this.pdata != null && this.pdata.Interested_formats_of_cooperation__c !== undefined){
      this.def_interested = this.pdata.Interested_formats_of_cooperation__c.split(";");
    }
  }
  
  initAddress(data) {
    console.log("Data");
    console.log(data);
    if(data == '' || data === undefined){
    return this._fb.group({
      Project_Name__c: [''],
      Project_Name_2__c: [''],
      Capital_Required__c:[''],
      Financing_Structure__c:[''],
      Interested_formats_of_cooperation__c:[''],
      Investment_Round__c:[''],
      Project_Custom_Currency__c:[''],
      Project_Custom_Date_time__c:[''],
      Project_Custom_Number_1__c:[''],
      Project_Custom_Number_2__c:[''],
      Project_Custom_Picklist__c:[''],
      Project_Custom_Text__c:[''],
      Project_Custom_Text_2__c:[''],
      Project_Location__c:[''],
      Sectors__c:[''],
      Sub_Sectors__c:[''],
      Project_Description__c:[''],
      Project_Description_2__c:[''],
      Project_Custom_Rich_Text_Area__c:[''],
    });
  }else{
    return this._fb.group({
      Id:[data.Id],
      Project_Name__c: [data.Project_Name__c],
      Project_Name_2__c: [data.Project_Name_2__c],
      Capital_Required__c:[data.Capital_Required__c],
      Financing_Structure__c:[data.Financing_Structure__c],
      Interested_formats_of_cooperation__c:[data.Interested_formats_of_cooperation__c],
      Investment_Round__c:[data.Investment_Round__c],
      Project_Custom_Currency__c:[data.Project_Custom_Currency__c],
      Project_Custom_Date_time__c:[data.Project_Custom_Date_time__c.split('T')[0]],
      Project_Custom_Number_1__c:[data.Project_Custom_Number_1__c],
      Project_Custom_Number_2__c:[data.Project_Custom_Number_2__c],
      Project_Custom_Picklist__c:[data.Project_Custom_Picklist__c],
      Project_Custom_Text__c:[data.Project_Custom_Text__c],
      Project_Custom_Text_2__c:[data.Project_Custom_Text_2__c],
      Project_Location__c:[data.Project_Location__c],
      Sectors__c:[data.Sectors__c],
      Sub_Sectors__c:[data.Sub_Sectors__c],
      Project_Description__c:[data.Project_Description__c],
      Project_Description_2__c:[data.Project_Description_2__c],
      Project_Custom_Rich_Text_Area__c:[data.Project_Custom_Rich_Text_Area__c],
    });
  }
}
addProject() {
  const control = <FormArray>this.myForm.controls['project'];
  control.push(this.initAddress(''));
}

removeProject(i: number) {
  const control = <FormArray>this.myForm.controls['project'];
  control.removeAt(i);
}
changed(data: {value: string[]}) {
  if( data.value == null){
    this.current = '';
  }else{
    this.current = data.value.join(';');
  }
}
changedSector(data: {value: string[]}){
  if(data.value == null){
    this.sector_val ='';
    this.select_sub_sec = [];
  }else{
    this.sector_val = data.value.join(";");
    let val = this.sector_val.split(";");
    this.select_sub_sec = [];
    for(let k=0;k<val.length;k++){
      let sub_id = this.sector.filter((item) => item.id == val[k]);
      let sub = this.sub_sector.filter((item) => item.list == sub_id[0].list);
      if(sub.length >= 1){
        this.select_sub_sec.push({'id':0,'text':val[k],'children':sub});
      }
    }
  }
}
changedSubSec(data: {value: string[]}){
  if( data.value == null){
    this.sub_sector_val = '';
  }else{
    this.sub_sector_val = data.value.join(';');
  }
}
onSubmit(){
  //console.log(this.myForm.value.project[0]);
  //console.log("Invest : "+this.current);
 // console.log("Sector: "+this.sector_val);
  //console.log("sub sector : "+this.sub_sector_val);
  this.myForm.value.project[0].Sectors__c = this.sector_val;
  this.myForm.value.project[0].Sub_Sectors__c = this.sub_sector_val;
  this.myForm.value.project[0].Interested_formats_of_cooperation__c = this.current;
  console.log("Data sending");
  console.log(JSON.stringify(this.myForm.value.project[0]));
  this.sfService.updateProject('BLN_MM_ViewAdminProfileCon.addProjectDetails',JSON.stringify(this.myForm.value.project[0])
    ,this.sucessCall, this.failedCallback);
  //console.log(this.myForm.value.project[0]);
}
sucessCall = (response) => {
  this.getdataService.project.next(JSON.parse(response))  ;
  console.log(response);
  this.dialogRef.close();
    this.snackBar.open(this.settings['Project Information'][0].biw.groupname+" updated successfully..",'', {
      duration: 2000,
    });
}
/*save(model: Customer) {
  // call API to save
  // ...
  console.log(model);
}*/
}

