import { Component, OnInit ,Inject} from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-diversity-edit',
  templateUrl: './diversity-edit.component.html',
  styleUrls: ['./diversity-edit.component.css']
})
export class DiversityEditComponent implements OnInit {

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private sfService: SalesforceService,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<DiversityEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

  }
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  public current: string;
  val:Array<Select2OptionData> = [];
  diversity:Array<Select2OptionData>=[];
  //naics:any[];
  def:any[] = [];
  settings:any[];
  diversity_val:any[];
  ngOnInit() {

    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.diversity_val.subscribe(diversity_val =>this.diversity_val = diversity_val);

    let temp = this.diversity_val;
    this.getdataService.diversity.subscribe(diversity => this.diversity = diversity);
    console.log(this.diversity);
    this.exampleData = this.diversity;
    console.log("Diversity data");
    
    for(let key in temp){
        if(temp[key].BLN_ListLookUp__r !== undefined){
         this.def.push(temp[key].BLN_ListLookUp__r.Id);
        }
        
    }
    console.log(this.def);
    this.options = {
      multiple: true
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
    console.log(this.current);
  }
  onSubmit(){
    console.log("Called saving");
    this.getdataService.updateDiverData(this.current);
    this.dialogRef.close();
    this.snackBar.open(this.settings['Diversity Type Information'][0].biw.labelname+" updated successfully..",'', {
      duration: 2000,
    });
  }
}
