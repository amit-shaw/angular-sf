import { Component, OnInit ,Inject} from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { NgForm, Form } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { BasicData } from '../basic-info-edit/basicData';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-socail-media-edit',
  templateUrl: './socail-media-edit.component.html',
  styleUrls: ['./socail-media-edit.component.css']
})
export class SocailMediaEditComponent implements OnInit {

  constructor(public dialog: MatDialog,private sfService: SalesforceService,private getdataService:GetdataService,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SocailMediaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private confirmationDialogService: ConfirmationDialogService) { }
    basic:BasicData;
    //basic:any[];
    basic_set:any[];
    work_set:any[];
    speaker:any[];
    doc:any[]= [];
    socailEdit: FormGroup;
    error_text:string='';
    status:boolean=false;
    attchment:any[];
    url:any='';
    attname:any='';
    delid:string='';
    flag:boolean=false;
    attch_length:number=0;
  ngOnInit() {
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.socailEdit = this.createFormGroup();
    this.getdataService.speaker.subscribe(speaker => this.speaker = speaker);
    this.getdataService.attchment.subscribe(attchment =>this.attchment = attchment);
    this.attch_length = this.attchment.length;
  }
  createFormGroup() {
    return new FormGroup({         
      FaceBookId__c:new FormControl(this.defaultVal(this.basic.FaceBookId__c)),
      LinkedInId__c:new FormControl(this.basic.LinkedInId__c || ''),
      TwitterId__c:new FormControl(this.basic.TwitterId__c || ''),
      Instagram__c:new FormControl(this.basic.Instagram__c || ''),
      Video__c:new FormControl(this.basic.Video__c || ''),
      WhatsApp__c:new FormControl(this.basic.WhatsApp__c || ''),
      Wechat__c:new FormControl(this.basic.Wechat__c || ''),
      Snapchat__c:new FormControl(this.basic.Snapchat__c || ''),
      Skype__c:new FormControl(this.basic.Skype__c || ''),
      Blogger__c:new FormControl(this.basic.Blogger__c || '')
     });
  }
  defaultVal(val){
    console.log("Formvalue: "+val);
    if(this.basic.FaceBookId__c == '' || this.basic.FaceBookId__c == undefined){
      return '';
    }else{
      return val;
    }
  }
  onSubmit(){
    //console.log(this.attchment);
    console.log(this.attch_length);
    if(this.speaker[0].biw.required =='true'){
      if(this.attch_length == 0 && this.url == ''){
        this.flag = true;
      }
    }
    if (this.socailEdit.valid && this.flag != true) {
     /* console.log("calling for");
      for(let i =0;this.socailEdit.value.length;i++){
        console.log("came inside");
        if(this.socailEdit.value[i].substring(0,4) !=='http'){
          console.log(this.socailEdit.value[i]);
        }
      }*/
      $(".Mask").show();
      if(this.url !=''){
        let attc = this.url.split(',')[1];
        this.getdataService.updateSepcificData(this.socailEdit.value,'',attc,this.attname,'','');
      }else{
        this.getdataService.updateSepcificData(this.socailEdit.value,'','','','','');
      }
      this.dialogRef.close();
      this.snackBar.open("Socail media information updating ....",'', {
        duration: 3000,
      });
    }
    else{
      this.confirmationDialogService.confirm('Alert ..', 'Please fill all the required fields ...','OK','')
      .then((confirmed) =>  {
        if(confirmed){
          this.flag = false;
        }else{
         
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    //console.log(data.value);
  }
  onCancel(){
    console.log("Called ");
    this.dialogRef.close();
  }
  onChange(event, input: any) {

    console.log(event);
    if(event.target.files[0].type != 'application/pdf'){
      this.status = true;
      this.error_text ='Please select the PDF files only';
    }else if(event.target.files[0].size > 5*1024*1024){
      this.status = true;
      this.error_text = 'Please select the file less then 5MB';
    }
    else{
      this.status = false;
     if(event.target.files && event.target.files[0]) {
      var reader:any
      reader = new FileReader();
      let name = event.target.files[0].name;
      this.attname = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget.result;
        this.doc.push({'Name':name,'Id':event.currentTarget.result});
      }
    }
    }
  }
  deleteDoc(pos,id){
    this.confirmationDialogService.confirm('Warning ..', 'Are you really want to delete this attachment ...','OK','Cancel')
    .then((confirmed) =>  {
      if(confirmed){
        this.delid = id;
        this.attchment.splice(pos,1);
        this.attch_length = this.attch_length -1;
        this.sfService.getCodesWithouId('BLN_MM_ViewAdminProfileCon.deleteAttachment',id
        ,this.deletedAttchSucc, this.failedCallback);
        $(".Mask").show();
      }else{
       
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    /*if(confirm("Are you sure to delete ")) {
    this.doc.splice(pos, 1);
    } */
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  private failedCallback = (response) => console.log(response);
  deletedAttchSucc = (response) => {
   console.log(response);
   /*if(this.attch_length == 0){
     this.flag = true;
   } */
   $(".Mask").hide();
  }
}
