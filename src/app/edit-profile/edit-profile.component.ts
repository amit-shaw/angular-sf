import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';
import { SalesforceService } from '../../service/salesforce.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private getdataService:GetdataService,private confirmationDialogService: ConfirmationDialogService,private sfService: SalesforceService) { }
  basic_set:any;
  print:boolean=false;
  print_status:boolean=false;
  isvisible:boolean=false;
  DropdownVarsb:number=1;
  profileclonedata:any[];
  cloneselected:boolean=false;
  cloneid:string = '';
  ngOnInit() {
    this.getdataService.print_status.subscribe(print_status => this.print_status = print_status);
    this.getdataService.getSettingsData();
    console.log("Status printing  : =>"); 
    console.log(this.print_status);
    //this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
    this.sfService.getProfileFromoTherEvent('BLN_MM_ViewAdminProfileCon.getprofilefromotherevent'
    ,this.resultData, this.failedCallback);

  }
  resultData = (response) => {
    this.profileclonedata = response;
  }
  private failedCallback = (response) => console.log(response);
  printProfile(){
    this.confirmationDialogService.confirm('Print profile', 'Do you want to print the profile?','Yes','No')
        .then((confirmed) => {
          if (confirmed) {
            this.print = true;
            this.print_status = true;
          } else {  
            console.log("Cancel button is clicked");
          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
   /* let location = window.location.href;
    let printContents, popupWin;
   // printContents = document.getElementById('profile-print').innerHTML;
    popupWin = window.open(location, '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.print(); */
  }
  applycopy(){
    this.confirmationDialogService.confirm('Clone Profile', 'The empty fields in your profile will be updated with data from the selected event profile. Are you sure you want to update?','Yes','No')
      .then((confirmed) => {
        if (confirmed) {
          $(".Mask").show();
          this.sfService.profileCloneRemoteAction('BLN_MM_ViewAdminProfileCon.updateProfileDatafromotherevent',this.cloneid
          ,this.successClone, this.failedCallback);
        } else {  
          console.log("Cancel button is clicked");
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    //this.sfService.profileCloneRemoteAction('BLN_MM_ViewAdminProfileCon.updateProfileDatafromotherevent',this.cloneid
    //,this.successClone, this.failedCallback);
  }
  successClone = (response) =>{
    this.getdataService.getData();
    this.getdataService.getCountryData();
    this.getdataService.getStateData();
    this.getdataService.getSettingsData();
    this.isvisible =false;
    console.log("Status : "+this.isvisible);
    $(".Mask").hide();
    
  }
  cloneProfile(id){
    this.cloneselected = true;
    this.cloneid = id;
  }
  cancelClone(){
    this.cloneselected = false;
    this.cloneid = '';
  }
}
