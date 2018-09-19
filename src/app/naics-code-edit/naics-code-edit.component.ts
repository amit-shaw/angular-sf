import { Component, OnInit,Inject } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-naics-code-edit',
  templateUrl: './naics-code-edit.component.html',
  styleUrls: ['./naics-code-edit.component.css']
})
export class NaicsCodeEditComponent implements OnInit {

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private sfService: SalesforceService,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<NaicsCodeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

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
  ngOnInit() {
    this.getdataService.naics.subscribe(naics => this.naics = naics);
    this.getdataService.naics_set.subscribe(naics_set => this.naics_set = naics_set);
    let temp = this.naics;
    this.getdataService.naics_data.subscribe(naics_data => this.naics_data = naics_data);
    this.exampleData = this.val;
    for(let key in temp){
        if(temp[key].BLN_ListLookUp__r !== undefined){
         this.def.push(temp[key].BLN_ListLookUp__r.Id);
        }
        
    }
   // console.log(this.def);
    this.options = {
      multiple: true,
      placeholder: "Search...",
    }
    if(this.def != null){
    this.current = this.def.join('-');
    console.log(this.current);
    }
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
    this.getdataService.updateNaicsCode(this.current);
    this.dialogRef.close();
    this.snackBar.open(this.naics_set[0].biw.labelname+" updated successfully..",'', {
      duration: 2000,
    });
  }
  onCancel(){
    this.dialogRef.close();
  }
}
