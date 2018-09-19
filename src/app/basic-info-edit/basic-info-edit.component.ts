import { Component, OnInit, Pipe, Inject } from '@angular/core';
import { SalesforceService } from '../../service/salesforce.service';
import { GetdataService } from '../getdata.service';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSnackBar } from '@angular/material';
import { BasicData } from './basicData';

//import {NgForm,ReactiveFormsModule, FormGroup,FormControl} from '@angular/forms';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';
import { DisplayTicketsComponent } from '../display-tickets/display-tickets.component';
import { CustomBarcode } from './customBarCode';


@Component({
  selector: 'app-basic-info-edit',
  templateUrl: './basic-info-edit.component.html',
  styleUrls: ['./basic-info-edit.component.css']
})
export class BasicInfoEditComponent implements OnInit {
  basicEdit: FormGroup;
  constructor(public dialog: MatDialog, private sfService: SalesforceService, private getdataService: GetdataService,public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BasicInfoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private confirmationDialogService: ConfirmationDialogService) {

    // this.basicEdit.controls['Prefix__c'].setValue(this.basic['Prefix__c'], {onlySelf: true});

  }
  basic: BasicData;
  //basic:any[];
  basic_set: any[];
  suffix: string[] = ['Jr.', 'Sr.'];
  //def_suffix: string = 'UK';
  prefix: string[] = ['Mr.', 'Mrs.', 'Miss.'];
  gender: string[] = ['Male', 'Female', 'Other'];
  dataval: BasicData;
  work_set: any[];
  url: any;
  speaker: any[];
  logourl: any;
  change_email: string;
  displayticketpopup: boolean = false;
  res: any;
  custom_barcode:CustomBarcode;
  deletelogo:boolean=false;
  deletepic:boolean=false;
  createFormGroup() {
    return new FormGroup({
      First_Name__c: new FormControl(this.basic.First_Name__c,[this.noWhitespaceValidator]),
      Last_Name__c: new FormControl(this.basic.Last_Name__c,[this.noWhitespaceValidator]),
      Custom_Barcode__c: new FormControl(this.custom_barcode.Custom_Barcode__c),
      Email__c: new FormControl(this.basic.Email__c,[this.emailValidate]),
      DOB__c: new FormControl(this.basic.DOB__c),
      Gender__c: new FormControl(this.basic.Gender__c),
      Age__c: new FormControl(this.checkAge(this.basic.Age__c)),
      Home_Phone__c: new FormControl(this.basic.Home_Phone__c),
      Work_Phone__c: new FormControl(this.basic.Work_Phone__c),
      Mobile__c: new FormControl(this.basic.Mobile__c),
      TKT_Job_Title__c: new FormControl(this.basic.TKT_Job_Title__c),
      TKT_Company__c: new FormControl(this.basic.TKT_Company__c),
      Prefix__c: new FormControl(this.basic.Prefix__c),
      Suffix__c: new FormControl(this.basic.Suffix__c),
      verify_Email__c: new FormControl(this.basic.Email__c),
      DBA__c: new FormControl(this.basic.DBA__c),
      FaxNumber__c: new FormControl(this.basic.FaxNumber__c),
      Company_Website_URL__c: new FormControl(this.basic.Company_Website_URL__c),
      Biography__c: new FormControl(this.basic.Biography__c),
      Company_Logo__c: new FormControl(this.basic.Company_Logo__c),
      User_Pic__c:new FormControl(this.basic.User_Pic__c),
    });
  }
  checkAge(val){
    if(val == 0 || val == undefined){
      return '';
    }
    else{
      return val;
    }
  }
  ngOnInit() {
    // this.getdataService.getData();
    //this.getdataService.getPersonalInfo();
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.custom_barcode_cast.subscribe(custom_barcode => this.custom_barcode = custom_barcode);
    //console.log(this.basic.Gender__c);
    this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Prefix__c'
    ,this.prifixCode, this.failedCallback);
    this.sfService.getBusinessCategory('BLN_MM_ViewAdminProfileCon.getPickValues','Tkt_profile__c','Suffix__c'
    ,this.suffixCode, this.failedCallback);
    this.dataval = this.basic;
    this.basicEdit = this.createFormGroup();
    //console.log(this.basic);
   // console.log("Custom_Barcode__c: "+this.basic.Custom_Barcode__c);
    this.basicEdit.controls['Suffix__c'].setValue(this.basic.Suffix__c, { onlySelf: true });
    this.basicEdit.controls['Prefix__c'].setValue(this.basic.Prefix__c, { onlySelf: true });
    this.basicEdit.controls['Gender__c'].setValue(this.basic.Gender__c, { onlySelf: true });
    //this.getdataService.getSettingsData();
    this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.speaker.subscribe(speaker => this.speaker = speaker);
    this.url = '/servlet/servlet.FileDownload?file=' + this.basic.User_Pic__c;
    this.logourl = '/servlet/servlet.FileDownload?file=' + this.basic.Company_Logo__c;
    /* if(this.basic.User_Pic__c != null && this.basic.User_Pic__c != undefined){
       this.url = '/servlet/servlet.FileDownload?file='+this.basic.User_Pic__c;
     }else{
       this.url = './profile-placeholder.jpg';
     }
     if(this.basic.Company_Logo__c != '' && this.basic.Company_Logo__c != undefined){
       this.logourl ='/servlet/servlet.FileDownload?file='+this.basic.Company_Logo__c;
     }else{
       this.logourl = './company.png';
     }*/
    //console.log("basic Values");
    //console.log(this.basic);
  }
  prifixCode = (response) => {
    this.prefix = JSON.parse(response);
  }
  suffixCode = (response) => {
    this.suffix = JSON.parse(response);
    console.log(this.suffix);
  }
  onSubmit() {
    //console.log(this.basicEdit.value);
    //console.log("Value"+this.basic_set.find(basic_set => basic_set == 'First_Name__c'));
    //console.log(this.basic_set);
    if (this.basicEdit.valid) {
     // console.log("sending image");
     $(".Mask").show();
      if(this.basicEdit.value.Custom_Barcode__c != this.custom_barcode.Custom_Barcode__c){
        this.getdataService.updateBarcode(this.basicEdit.value.Custom_Barcode__c);
      }
      if (this.displayticketpopup && (this.res != null && this.res != undefined && this.res != '')) {
        this.dialogRef.close();
        console.log("calling popup");
        let logo='',img='';
        if(this.logourl != '/servlet/servlet.FileDownload?file=' + this.basic.Company_Logo__c){
          logo = this.logourl.split(',')[1];
        }
        if (this.url != '/servlet/servlet.FileDownload?file=' + this.basic.User_Pic__c) {
          img = this.url.split(',')[1];
        }
        const dialogRef = this.dialog.open(DisplayTicketsComponent, {
          height: '400px',
          data: {
            data: this.res,
            baisc_data:this.basicEdit.value,
            logo:logo,
            img:img,
          }
          //width:'500px'
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
      else {
        if (this.deletelogo == false && this.deletepic == false && this.url != '/servlet/servlet.FileDownload?file=' + this.basic.User_Pic__c && this.logourl != '/servlet/servlet.FileDownload?file=' + this.basic.Company_Logo__c) {
          let img = this.url.split(',')[1];
          let logo = this.logourl.split(',')[1];
          console.log("Caming 1st if");
          this.getdataService.updateSepcificData(this.basicEdit.value, img, '', '', logo, '');
        } else if (this.deletelogo == false && this.logourl != '/servlet/servlet.FileDownload?file=' + this.basic.Company_Logo__c) {
          let logo = this.logourl.split(',')[1];
          console.log("caming 2nd if");
          this.getdataService.updateSepcificData(this.basicEdit.value, '', '', '', logo, '');
        }
        else if (this.deletepic == false && this.url != '/servlet/servlet.FileDownload?file=' + this.basic.User_Pic__c) {
          let img = this.url.split(',')[1];
          console.log("coming 3rd if");
          this.getdataService.updateSepcificData(this.basicEdit.value, img, '', '', '', '');
        } else {
          console.log("came 2 else");
          this.getdataService.updateSepcificData(this.basicEdit.value, '', '', '', '', '');
         // console.log("Came here ---- Working fine");
        }
        this.dialogRef.close();
        this.snackBar.open("Personal Information updated successfully..",'', {
          duration: 3000,
        });
      }
    }
    else {
      this.confirmationDialogService.confirm('Alert ..', 'Please fill all the required fields ...', 'OK', '')
        .then((confirmed) => {
          if (confirmed) {

          } else {

          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    //console.log(data.value);
  }
  onCancel() {
    this.dialogRef.close();
  }

  onSelectFile(event) {
    if(event.target.files[0].size > 5*1024*1024){
     // this.status = true;
     // this.error_text = 'Please select the file less then 5MB';
     this.confirmationDialogService.confirm('Alert..', 'Please select the image less than 5MB.','Ok','')
        .then((confirmed) => {
          if (confirmed) {
          }
          else {
          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    else{
    if (event.target.files && event.target.files[0]) {
      var reader: any
      reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.deletepic = false;
        this.url = event.currentTarget.result;
        console.log(this.url);
      }
    }
   }
  }
  onSelectLogoFile(event) {
    if(event.target.files[0].size > 5*1024*1024){
      // this.status = true;
      // this.error_text = 'Please select the file less then 5MB';
      this.confirmationDialogService.confirm('Alert..', 'Please select the logo less than 5MB.','Ok','')
        .then((confirmed) => {
          if (confirmed) {
          }
          else {
          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
     }
    else{
    if (event.target.files && event.target.files[0]) {
      var reader: any
      reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.logourl = event.currentTarget.result;
        this.deletelogo = false;
        //console.log(this.logourl);
      }
    }
  }
  }
  emailChanged(changed_email) {
    if (this.basic.Email__c != changed_email) {
      console.log("Email changed ....");
      console.log("New email : .." + changed_email);
      this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to change the email address ... ?')
        .then((confirmed) => {
          if (confirmed) {
            this.change_email = changed_email;
            this.sfService.getCodesWithouId('BLN_MM_ViewAdminProfileCon.checkUser', changed_email
              , this.successData, this.failedCallback);
              $(".Mask").show();
            console.log('User confirmed:', confirmed);
          } else {
            this.basicEdit.controls['Email__c'].setValue(this.basic.Email__c, { onlySelf: true });
            // this.basicEdit.value.Email__c = this.basic.Email__c;
            console.log("Cancel button is clicked");
          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    console.log(changed_email);
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  private failedCallback = (response) => console.log(response);
  successData = (response) => {
    console.log(response);
    $(".Mask").hide();
    if (response == 'Exist') {
      this.confirmationDialogService.confirm('Please confirm..', 'There is an already existing user with this email Id.Do you want to copy information from his profile.')
        .then((confirmed) => {
          if (confirmed) {
            this.sfService.getCodesWithouId('BLN_MM_ViewAdminProfileCon.getGnuser', this.change_email
              , this.successEmailExist, this.failedCallback);
              $(".Mask").show();
          }
          else {
            
          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }
  successEmailExist = (response) => {
    console.log(response);
    this.basicEdit.controls['Suffix__c'].setValue(response.Suffix__c, { onlySelf: true });
    this.basicEdit.controls['Prefix__c'].setValue(response.Prefix__c, { onlySelf: true });
    this.basicEdit.controls['Gender__c'].setValue(response.Gender__c, { onlySelf: true });
    this.basicEdit.controls['First_Name__c'].setValue(response.First_Name__c, { onlySelf: true });
    this.basicEdit.controls['Home_Phone__c'].setValue(response.Home_Phone__c, { onlySelf: true });
    this.basicEdit.controls['Last_Name__c'].setValue(response.Last_Name__c, { onlySelf: true });
    this.basicEdit.controls['Mobile__c'].setValue(response.Mobile__c, { onlySelf: true });
    this.basicEdit.controls['Age__c'].setValue(response.Age__c, { onlySelf: true });
    //  this.basicEdit.controls['DOB__c'].setValue(response.DOB__c, {onlySelf: true});
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getEmailsTickets', this.basic.Email__c
      , this.successAll, this.failedCallback);
  }
  successAll = (response) => {
    console.log(response);
    this.displayticketpopup = true;
    this.res = response;
    $(".Mask").hide();
    // let res = JSON.parse(response);
  }
  successTicket = (response) => {
    console.log(response);
    this.getdataService.custom_barcode.next(JSON.parse(response));
  }
  checkBarcode(barcode){
    if(barcode != '' && barcode != this.custom_barcode.Custom_Barcode__c){
    this.sfService.getCodes('BLN_MM_ViewAdminProfileCon.getuniquecustomcode', barcode
    , this.barcodeData, this.failedCallback);
      $(".Mask").show();
    }
  }
  barcodeData = (response) => {
    console.log(response);
    $(".Mask").hide();
    if(response){
      this.confirmationDialogService.confirm('Alert ..', 'Please fill correct barcode ...', 'OK', '')
        .then((confirmed) => {
          if (confirmed) {

          } else {

          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }
  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }
  public emailValidate(control: FormControl){
    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }

        return null;
  }
  public dateValidation(control: FormControl): { [key: string]: any }{
    console.log("date value : "+control.value);
    if(control.value !=''){
      //let usDatePattern = /^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/;
     // let usDatePattern = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
     // if (!control.value.match(usDatePattern)){
        return { "usDate": true };
     // }
      //return null;
    }
      return null;
    //}
  }
  deleteLogo(){
    this.deletelogo = true;
    //this.basicEdit.value.
    this.basicEdit.value.Company_Logo__c = '';
    this.logourl = '/servlet/servlet.FileDownload?file=undefined';
  }
  deleteUserPic(){
    this.deletepic = true;
    this.basicEdit.value.User_Pic__c = '';
    this.url = '/servlet/servlet.FileDownload?file=undefined';
  }
}
