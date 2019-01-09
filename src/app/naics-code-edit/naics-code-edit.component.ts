import { Component, OnInit,Inject } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-naics-code-edit',
  templateUrl: './naics-code-edit.component.html',
  styleUrls: ['./naics-code-edit.component.css']
})
export class NaicsCodeEditComponent implements OnInit {

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private sfService: SalesforceService,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<NaicsCodeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private confirmationDialogService: ConfirmationDialogService) { 

  }
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  public current: string;
  val:Array<Select2OptionData> = [];
  naics_data:Array<Select2OptionData>=[];
  naics:any[];
  def:any[] = [];
  naics_set:any[];

  itemList = [];
  selectedItems = [];
  settings = {};
  ngOnInit() {
    this.getdataService.naics.subscribe(naics => this.naics = naics);
    this.getdataService.naics_set.subscribe(naics_set => this.naics_set = naics_set);
    let temp = this.naics;
    console.log(temp);
    this.getdataService.naics_data.subscribe(naics_data => this.naics_data = naics_data);
    this.exampleData = this.val;
    for(let key in temp){
        if(temp[key].BLN_ListLookUp__r !== undefined){
        // this.def.push(temp[key].BLN_ListLookUp__r.Id);
         this.def.push({"id":temp[key].BLN_ListLookUp__r.Id,"itemName":temp[key].BLN_ListLookUp__r.List_Code__c+' '+temp[key].BLN_ListLookUp__r.List_Description__c});
        }
        
    }
   // console.log(this.def);
   /* this.options = {
      multiple: true,
      placeholder: "Search...",
    }
    if(this.def != null){
   // this.current = this.def.join('-');
    console.log(this.current);
    }*/
    this.settings = {
      text: "Select Naics codes",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class",
      enableCheckAll:false,
      enableSearchFilter:true,
      enableFilterSelectAll:false,
     // showCheckbox:false,
      maxHeight:'200',
      disabled:this.naics_set[0].biw.updateaccess == 'false' ? true : false,
      noDataLabel:'No NAICS Code found',
  };
  }
  changed(data: {value: string[]}) {
    if( data.value == null){
      this.current = '';
    }else{
      this.current = data.value.join('-');
    }
    //console.log(this.current);
  }
  onSubmit(){
    //console.log("Called saving");
    console.log(this.def);
    this.current = '';
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
    console.log("Data value : "+this.current);
    if(this.naics_set[0].biw.required =='true'){
      if(this.current == '' || this.current == null){
        this.confirmationDialogService.confirm('Alert ..', 'Please fill the required fields ...', 'OK', '')
        .then((confirmed) => {
          if (confirmed) {
            
          } else {

          }
       })
       .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      }
      else{
        this.getdataService.updateNaicsCode(this.current);
        this.dialogRef.close();
        this.snackBar.open(this.naics_set[0].biw.labelname+" updated successfully..",'', {
          duration: 2000,
        });
      }
    }
    else{
      this.getdataService.updateNaicsCode(this.current);
      this.dialogRef.close();
      this.snackBar.open(this.naics_set[0].biw.labelname+" updated successfully..",'', {
        duration: 2000,
      });
    }
  }
  onCancel(){
    this.dialogRef.close();
  }


}
