import { Component, OnInit ,Inject} from '@angular/core';
import { BasicData } from '../basic-info-edit/basicData';
import { GetdataService } from '../getdata.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-other-info-edit',
  templateUrl: './other-info-edit.component.html',
  styleUrls: ['./other-info-edit.component.css']
})
export class OtherInfoEditComponent implements OnInit {

  constructor(private getdataService:GetdataService,public dialog: MatDialog,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OtherInfoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private confirmationDialogService: ConfirmationDialogService) { }
  basic: BasicData;
  settings:any[];
  otherInfoEdit:FormGroup;
  ngOnInit() {
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.settings.subscribe(settings => this.settings = settings);
    if(this.basic.Bln_Custom_Fields__r == undefined){
      this.otherInfoEdit = this.createFormGroupNull();
    }else{
      this.otherInfoEdit = this.createFormGroup();
    }
  }
  createFormGroup() {
    return new FormGroup({
      Non_WBENC_Awards__c:new FormControl(this.basic.Bln_Custom_Fields__r.Non_WBENC_Awards__c||''),
      RPO__c:new FormControl(this.basic.Bln_Custom_Fields__r.RPO__c||''),
    });
  }
  createFormGroupNull() {
    return new FormGroup({
      Non_WBENC_Awards__c:new FormControl(''),
      RPO__c:new FormControl(''),
    });
  }
  onSubmit(){
    // console.log("Saving the data");
     if (this.otherInfoEdit.valid) {
       console.log(this.otherInfoEdit.value);
       this.getdataService.updateOtherInfo(this.otherInfoEdit.value.Non_WBENC_Awards__c,this.otherInfoEdit.value.RPO__c);
      // this.getdataService.updateSepcificData(this.otherInfoEdit.value,'','','','','');
       this.dialogRef.close();
       this.snackBar.open("Other Information updated successfully..",'', {
         duration: 2000,
       });
     }
     else{
      this.confirmationDialogService.confirm('Alert', 'Please fill all the required fields', 'OK', '')
      .then((confirmed) => {
        if (confirmed) {

        } else {

        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
     }
   }
   onCancel(){
     this.dialogRef.close();
     //console.log("Cancel ----");
   }
}
