import { Component, OnInit ,Inject} from '@angular/core';
import { GetdataService } from '../getdata.service';
import { ProjectData } from '../project-info/project-data';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar, MatSnackBarContainer} from '@angular/material';
import { SalesforceService } from '../../service/salesforce.service';
import { BasicInfoEditComponent } from '../basic-info-edit/basic-info-edit.component';

@Component({
  selector: 'app-display-tickets',
  templateUrl: './display-tickets.component.html',
  styleUrls: ['./display-tickets.component.css']
})
export class DisplayTicketsComponent implements OnInit {

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private getdataService:GetdataService,
    private sfService: SalesforceService,
    public dialogRef: MatDialogRef<DisplayTicketsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {data :any,baisc_data:any,logo:any,img:any}) {
     // console.log(data);
     }
  result:any;
  ticketselect:any[] = [];
  check:boolean=false;
  orderselect:any[] = [];
  ordercheck:boolean=false;
  ngOnInit() {
    this.result = this.data.data;
    console.log(this.data.baisc_data);
    console.log(this.data.logo);
    console.log("Img src => "+this.data.img);
    console.log(this.result);
  }
  checkAllTickets(event,check){
    if(event.target.checked){
      this.check = true;
      this.ticketselect = [];
      for(let i=0;i<this.result.length;i++){
        if(this.result[i].isbuyer == false){
          this.ticketselect.push(this.result[i].tktprofileid);
        }
      }
    }else{
      this.check = false;
      this.ticketselect = [];
    }
  }
  checkAllOrders(event,check){
    if(event.target.checked){
      this.ordercheck = true;
      this.orderselect = [];
      for(let i=0;i<this.result.length;i++){
        if(this.result[i].isbuyer == true){
          this.orderselect.push(this.result[i].tktprofileid);
        }
      }
    }else{
      this.ordercheck = false;
      this.orderselect = [];
    }
    console.log(this.orderselect);
  }
  selectedTickets(event,id){
    if(event.target.checked){
      this.ticketselect.push(id);
    }else{
      let i = this.ticketselect.indexOf(id);
      if (i !== -1) {
        this.ticketselect.splice(i, 1);
      }  
    }
    console.log(this.ticketselect);
  }
  selectedOrders(event,id){
    if(event.target.checked){
      this.orderselect.push(id);
    }else{
      let i = this.orderselect.indexOf(id);
      if (i !== -1) {
        this.orderselect.splice(i, 1);
      }  
    }
    console.log(this.orderselect);
  }
  onSubmit(){
    let val = this.ticketselect.concat(this.orderselect);
    console.log(val);
    let value = val.join(",");
    console.log(this.data.baisc_data);
    console.log("Img src => "+this.data.img);
    this.getdataService.updateSepcificData(this.data.baisc_data,this.data.img,'','',this.data.logo,value);
    this.dialogRef.close();
   // this.dialogRef1.close();
    console.log("complete value"+value);
    console.log(this.ticketselect);
  }

}
