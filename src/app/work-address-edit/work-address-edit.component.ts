import { Component, OnInit,Pipe,Inject} from '@angular/core';
import { GetdataService } from '../getdata.service';
import { Country } from '../country';
import { State } from '../state';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { BasicData } from '../basic-info-edit/basicData';
import { AddressData } from './address-data';
//import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';
import { ConfirmationDialogService } from './../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-work-address-edit',
  templateUrl: './work-address-edit.component.html',
  styleUrls: ['./work-address-edit.component.css']
})
export class WorkAddressEditComponent implements OnInit {

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<WorkAddressEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private confirmationDialogService: ConfirmationDialogService) { }
  country:Country[];
  state:State[];
  //country_work:Country[];
  state_work:State[];
  state_home:State[];
  state_billing:State[];
  address:any[];
  addressEdit: FormGroup;
  basic:BasicData;
  home:AddressData;
  ngOnInit() {
    //this.getdataService.getCountryData();
   // this.getdataService.getStateData();
    this.getdataService.address_cast.subscribe(address => this.address = address);
    this.getdataService.country_cast.subscribe(country => this.country = country);
    this.getdataService.state_cast.subscribe(state => this.state = state);
    
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
   // console.log(this.state);
    if(this.basic.Work_Address__r == undefined && this.basic.Home_Address__r == undefined && this.basic.Billing_Address__r == undefined){
      this.addressEdit = this.createFormGroupNull();
    }else{
    this.addressEdit = this.createFormGroup();
    this.addressEdit.controls['W$Country__c'].setValue(this.setNullVal(this.basic.Work_Address__r.Country__c), {onlySelf: true});
    this.addressEdit.controls['H$Country__c'].setValue(this.basic.Home_Address__r.Country__c, {onlySelf: true});
    this.addressEdit.controls['B$Country__c'].setValue(this.basic.Billing_Address__r.Country__c, {onlySelf: true});
    let st = this.country.filter((item)=>item.Id == this.basic.Work_Address__r.Country__c);
    this.state_work = this.state.filter((item)=>item.COUNTRY_CODE__c == st[0].Name);
    this.addressEdit.controls['W$State__c'].setValue(this.setNullVal(this.basic.Work_Address__r.State__c), {onlySelf: true});
    st = this.country.filter((item)=>item.Id == this.basic.Home_Address__r.Country__c);
    this.state_home = this.state.filter((item)=>item.COUNTRY_CODE__c == st[0].Name);
    this.addressEdit.controls['H$State__c'].setValue(this.basic.Home_Address__r.State__c, {onlySelf: true});
    st = this.country.filter((item)=>item.Id == this.basic.Billing_Address__r.Country__c);
    this.state_billing = this.state.filter((item)=>item.COUNTRY_CODE__c == st[0].Name);
    this.addressEdit.controls['B$State__c'].setValue(this.basic.Billing_Address__r.State__c, {onlySelf: true});
    }
  }
  setNullVal(def_val){
    console.log(def_val+" : came here");
    if(def_val !== undefined && def_val != null && def_val !=''){
      return def_val;
    }else{
      return '';
    }
  }
  onSelect(countryid,type){
    //this.getdataService.state_cast.subscribe(state => this.state = state);
    let temp = this.country.filter((item)=>item.Id == countryid.target.value);
    if(type =='work'){
      this.state_work = this.state.filter((item)=>item.COUNTRY_CODE__c == temp[0].Name);
    }else if(type=='home'){
      this.state_home = this.state.filter((item)=>item.COUNTRY_CODE__c == temp[0].Name);
    }else{
     this.state_billing = this.state.filter((item)=>item.COUNTRY_CODE__c == temp[0].Name);
    }
    //console.log(this.state.filter((item)=>item.COUNTRY_CODE__c == ));
    //let temp = this.country.filter((item)=>item.Name == '113');
    //console.log(temp[0].Name);
  }
  createFormGroupNull() {
    //  console.log(this.basic.Home_Address__r.Address1__c);
      //this.home = this.basic.Home_Address__r;
      return new FormGroup({       
        W$Address1__c: new FormControl( ''),  
        W$Address2__c :new FormControl(''),
        W$City__c:new FormControl(''),
        W$Country__c:new FormControl(),
        W$State__c:new FormControl(),
        W$ZipCode__c:new FormControl(''),
        H$Address1__c: new FormControl(''),  
        H$Address2__c :new FormControl(''),
        H$City__c:new FormControl(''),
        H$Country__c:new FormControl(),
        H$State__c:new FormControl(),
        H$ZipCode__c:new FormControl(''),
        B$Address1__c: new FormControl(''),  
        B$Address2__c :new FormControl(''),
        B$City__c:new FormControl(''),
        B$Country__c:new FormControl(),
        B$State__c:new FormControl(),
        B$ZipCode__c:new FormControl(''),
       });
       
    }
  createFormGroup() {
  //  console.log(this.basic.Home_Address__r.Address1__c);
    //this.home = this.basic.Home_Address__r;
    return new FormGroup({       
      W$Address1__c: new FormControl(this.basic.Work_Address__r.Address1__c || ''),  
      W$Address2__c :new FormControl(this.basic.Work_Address__r.Address2__c || ''),
      W$City__c:new FormControl(this.basic.Work_Address__r.City__c || ''),
      W$Country__c:new FormControl(),
      W$State__c:new FormControl(),
      W$ZipCode__c:new FormControl(this.setNullVal(this.basic.Work_Address__r.ZipCode__c)),
      H$Address1__c: new FormControl(this.setNullVal(this.basic.Home_Address__r.Address1__c)),  
      H$Address2__c :new FormControl(this.setNullVal(this.basic.Home_Address__r.Address2__c)),
      H$City__c:new FormControl(this.setNullVal(this.basic.Home_Address__r.City__c)),
      H$Country__c:new FormControl(),
      H$State__c:new FormControl(),
      H$ZipCode__c:new FormControl(this.setNullVal(this.basic.Home_Address__r.ZipCode__c)),
      B$Address1__c: new FormControl(this.setNullVal(this.basic.Billing_Address__r.Address1__c)),  
      B$Address2__c :new FormControl(this.setNullVal(this.basic.Billing_Address__r.Address2__c)),
      B$City__c:new FormControl(this.setNullVal(this.basic.Billing_Address__r.City__c)),
      B$Country__c:new FormControl(),
      B$State__c:new FormControl(),
      B$ZipCode__c:new FormControl(this.setNullVal(this.basic.Billing_Address__r.ZipCode__c)),
     });
     
  }

 // add:any[][];
  onSubmit(){
    //console.log(this.addressEdit.value);
    if(this.addressEdit.valid){
      let data = this.addressEdit.value;
      this.getdataService.updateAddressInfo(data);
      //console.log(data);
      //console.log("Submit here");
      this.dialogRef.close();
      this.snackBar.open(this.address[0].biw.groupname+" updated successfully..",'', {
        duration: 2000,
      });
    }
    else{
      this.confirmationDialogService.confirm('Alert ..', 'Please fill all the required fields ...','OK','')
      .then((confirmed) =>  {
        if(confirmed){
       
        }else{
         
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }
  onCancel(){
    this.dialogRef.close();
  }

}
