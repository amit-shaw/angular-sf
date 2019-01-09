import { Component, OnInit,Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { NgForm, Form } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { BasicData } from '../basic-info-edit/basicData';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-youtube-edit',
  templateUrl: './youtube-edit.component.html',
  styleUrls: ['./youtube-edit.component.css']
})
export class YoutubeEditComponent implements OnInit {

  constructor(public dialog: MatDialog,private sfService: SalesforceService,private getdataService:GetdataService,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<YoutubeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private confirmationDialogService: ConfirmationDialogService) { }

    basic:BasicData;
    speaker:any[];
    videos:any[] = [];
    youtubelink:string ='';
  ngOnInit() {
    this.getdataService.basic_cast.subscribe(basic =>
      {
        this.basic = basic;
        if(this.basic.Video__c != '' && this.basic.Video__c != undefined){
          this.videos = this.basic.Video__c.split(",")
        }
      });
    this.getdataService.speaker.subscribe(speaker => this.speaker = speaker);
  }
  onCancel(){
    console.log("Called ");
    this.dialogRef.close();
  }
  onSubmit(){
    let video = this.videos.join(',');
    if(this.speaker[8].biw.required == 'true'){
      if(video == ''){
        this.confirmationDialogService.confirm('Alert ..', 'Youtube video is mandatory ...', 'OK', '')
        .then((confirmed) => {
          if (confirmed) {

          } else {
            
          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      }
      else{
        this.getdataService.updateYoutube(video);
        this.dialogRef.close();
        $(".Mask").show();
      }
    }else{
    this.getdataService.updateYoutube(video);
    this.dialogRef.close();
    $(".Mask").show();
    }
   // console.log(video);
  }
  onSave(){
    console.log(this.youtubelink);
    if(this.youtubelink !=''){
      console.log(this.youtubelink.substring(0,7));
      console.log(this.youtubelink.substring(this.youtubelink.length-9,this.youtubelink.length));
      if(this.youtubelink.substring(0,7) =='<iframe' && this.youtubelink.substring(this.youtubelink.length-9,this.youtubelink.length) =='</iframe>'){
        this.videos.push(this.youtubelink);
        this.youtubelink = '';
      }else{
        this.confirmationDialogService.confirm('Alert ..', 'Please enter the correct embed code ...', 'OK', '')
        .then((confirmed) => {
          if (confirmed) {

          } else {

          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      }
    }
  }
  deleteYoutube(num){
    this.videos.splice(num, 1);
  }
}
