import { Component, OnInit ,Inject} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-commodities',
  templateUrl: './commodities.component.html',
  styleUrls: ['./commodities.component.css']
})
export class CommoditiesComponent implements OnInit {

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private sfService: SalesforceService,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<CommoditiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private confirmationDialogService: ConfirmationDialogService) { 

  }
 // public exampleData: Array<Select2OptionData>;
 // public options: Select2Options;
 // public value: string[];
  public current: string;
  public selected_sub :string;
 // val:Array<Select2OptionData> = [];
 // diversity:Array<Select2OptionData>=[];
  //naics:any[];
  def:any[] = [];
  settings:any[];
  commodities:any[];
  sub_commodities:any[];
  comm_all:any[];
  sub_comm_all:any[];
  sub_def:any[]=[];
  sub_com_def:any[]=[];
  flag:boolean=false;
  setting = {};
  setting1 = {};
  sub_def1:any[] = [];
  subcom_sel:any[] = [];
  ngOnInit() {

    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.commodities.subscribe(commodities => this.commodities = commodities);
    this.getdataService.sub_commodities.subscribe(sub_commodities => this.sub_commodities = sub_commodities);
    this.getdataService.comm_all.subscribe(comm_all =>this.comm_all = comm_all);
    this.getdataService.sub_comm_all.subscribe(sub_comm_all => this.sub_comm_all = sub_comm_all);
    let temp = this.commodities; 
    let sub = this.sub_commodities;
    this.setting = {
      text: "Select Commodities ",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class",
      enableCheckAll:false,
      enableSearchFilter:true,
      enableFilterSelectAll:false,
     // showCheckbox:false,
      maxHeight:'200',
      disabled:this.settings['Commodities Information'][0].biw.updateaccess == 'false' ? true : false,
    };
    this.setting1 = {
      text: "Select Sub Commodities ",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class",
      enableCheckAll:false,
      enableSearchFilter:true,
      enableFilterSelectAll:false,
     // showCheckbox:false,
    //  maxHeight:'200',
      //disabled:this.settings['Commodities Information'][0].biw.updateaccess == 'false' ? true : false,
      groupBy: "category",
    };
    for(let key in temp){
        if(temp[key].BLN_ListLookUp__r !== undefined){
         //this.def.push(temp[key].BLN_ListLookUp__r.Id);
         this.def.push({"id":temp[key].BLN_ListLookUp__r.Id,"itemName":temp[key].BLN_ListLookUp__r.List_Description__c});
        }
        
    }
    for(let key in sub){
      if(sub[key].BLN_ListLookUp__r !== undefined){
       // this.sub_com_def.push(sub[key].BLN_ListLookUp__r.Id);
        this.subcom_sel.push({"id":sub[key].BLN_ListLookUp__r.Id,"itemName":sub[key].BLN_ListLookUp__r.List_Description__c});
       }
    }
    if(this.def != null){
    let val = this.def;
    for(let k=0;k<val.length;k++){
        let d = this.sub_comm_all.filter((item)=>item.pId == val[k].id);
        if(d.length >= 1){
          let n = this.comm_all.filter((item) => item.id == val[k].id);
          for(let j=0;j<d.length;j++){
            this.sub_def1.push({'id':d[j].id,'itemName':d[j].text,'category':n[0].itemName});
          }
        }
      }
      console.log(this.sub_def1);
    }
  }
 /* changed1(data: {value: string[]}) {
    if(data.value == null){
      this.selected_sub ='';
    }else{
      this.selected_sub = data.value.join('-');
    }
    console.log(this.selected_sub);
  } */
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.def);
    if(this.def == null){
      this.current = '';
      this.sub_def = [];
    }else{
      let sel = this.def;
      this.sub_def = [];
      this.sub_def1 = [];
      for(let i=0;i<this.def.length;i++){
        let d = this.sub_comm_all.filter((item)=>item.pId == sel[i].id);
        console.log(d);
        if(d.length >=1 ){
          let n = this.comm_all.filter((item) => item.id == sel[i].id);
            this.sub_def.push({'id':0,'text':n[0].itemName,'children':d});
            for(let k=0;k<d.length;k++){
              this.sub_def1.push({'id':d[k].id,'itemName':d[k].text,'category':n[0].itemName});
            }
         }
      }
      console.log(this.sub_def1);
    }
  }
 /* changed(data: {value: string[]}) {
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
  }*/
  onSubmit(){
    //console.log("Called saving");
    this.current = '';
    let subcom = '';
    if(this.def != null){
      for(let key in this.def){
        if(this.def[key].id !== undefined){
          if(this.current !=''){
            this.current = this.current+'-'+this.def[key].id;
          }else{
            this.current = this.def[key].id;
          }
        } 
      }
    }
    if(this.subcom_sel != null){
      for(let key in this.subcom_sel){
        if(this.subcom_sel[key].id !== undefined){
          if(subcom != ''){
            subcom = subcom +' '+this.subcom_sel[key].id;
          }else{
            subcom = this.subcom_sel[key].id;
          }
        }
      }
    }
    console.log("Comm : "+this.current+"   ! |Sub  : "+subcom);
    if(this.settings['Commodities Information'][0].biw.required == 'true'){
      if(this.current == '' || this.current == null){
        this.flag = true;
      }
    }
    if(this.settings['Commodities Information'][1].biw.required == 'true'){
      if(this.selected_sub == '' || this.selected_sub == null){
        this.flag = true;
      }
    }
    if(this.flag != true){
    this.getdataService.updateCommditiesData(this.current,subcom);
    this.dialogRef.close();
    this.snackBar.open(this.settings['Commodities Information'][0].biw.labelname+" updated successfully..",'', {
      duration: 2000,
    });
   }else{
    this.confirmationDialogService.confirm('Alert ..', 'Please fill the required fields ...', 'OK', '')
    .then((confirmed) => {
      if (confirmed) {
        this.flag = false;
      } else {
        this.flag = false;
      }
   })
   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
   }
  }
  onCancel(){
    this.dialogRef.close();
  }
 }
