import { Component, OnInit ,Inject} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommoditiesComponent implements OnInit {

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private sfService: SalesforceService,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<CommoditiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

  }
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  public current: string;
  public selected_sub :string;
  val:Array<Select2OptionData> = [];
  diversity:Array<Select2OptionData>=[];
  //naics:any[];
  def:any[] = [];
  settings:any[];
  commodities:any[];
  sub_commodities:any[];
  comm_all:any[];
  sub_comm_all:any[];
  sub_def:any[]=[];
  sub_com_def:any[]=[];
  ngOnInit() {

    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.commodities.subscribe(commodities => this.commodities = commodities);
    this.getdataService.sub_commodities.subscribe(sub_commodities => this.sub_commodities = sub_commodities);
    this.getdataService.comm_all.subscribe(comm_all =>this.comm_all = comm_all);
    this.getdataService.sub_comm_all.subscribe(sub_comm_all => this.sub_comm_all = sub_comm_all);
    let temp = this.commodities; 
    let sub = this.sub_commodities;
    for(let key in temp){
        if(temp[key].BLN_ListLookUp__r !== undefined){
         this.def.push(temp[key].BLN_ListLookUp__r.Id);
        }
        
    }
    for(let key in sub){
      if(sub[key].BLN_ListLookUp__r !== undefined){
        this.sub_com_def.push(sub[key].BLN_ListLookUp__r.Id);
       }
    }
    if(this.sub_com_def != null){
      this.selected_sub = this.sub_com_def.join('-');
    }
    console.log(this.def);
    this.options = {
      multiple: true,
      placeholder: "Search...",
    }
    if(this.def != null){
    this.current = this.def.join('-');
    let val = this.def;
    //console.log(this.sub_comm_all);
    //console.log(val);
    for(let k=0;k<val.length;k++){
     // if(val != undefined && val != null){
        let d = this.sub_comm_all.filter((item)=>item.pId == val[k]);
        let n = this.comm_all.filter((item) => item.id == val[k]);
        if(d.length >= 1){
          this.sub_def.push({'id':0,'text':n[0].text,'children':d});
        }
      //}
    }
   // console.log(this.sub_def);
    //console.log(this.current);
    }
  }
  changed1(data: {value: string[]}) {
    if(data.value == null){
      this.selected_sub ='';
    }else{
      this.selected_sub = data.value.join('-');
    }
    //console.log(this.selected_sub);
  }
  changed(data: {value: string[]}) {
    if( data.value == null){
      this.current = '';
      this.sub_def = [];
    }else{
      let sel = data.value;
      this.sub_def = [];
      for(let k =0;k<sel.length;k++){
       // if(sel != undefined && sel != null){
          let d = this.sub_comm_all.filter((item)=>item.pId == sel[k]);
          console.log(d);
          if(d.length >=1 ){
          let n = this.comm_all.filter((item) => item.id == sel[k]);
         // if(d != undefined){
            this.sub_def.push({'id':0,'text':n[0].text,'children':d});
         // }
         }
        //}
      }
     // console.log(sel);
      this.current = data.value.join('-');
    }
    console.log(this.current);
  }
  onSubmit(){
    //console.log("Called saving");
    this.getdataService.updateCommditiesData(this.current,this.selected_sub);
    this.dialogRef.close();
    this.snackBar.open(this.settings['Commodities Information'][0].biw.labelname+" updated successfully..",'', {
      duration: 2000,
    });
  }
  onCancel(){
    this.dialogRef.close();
  }
 }
