import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { CompanyProfileEditComponent } from '../company-profile-edit/company-profile-edit.component';
import { GetdataService } from '../getdata.service';
import { RegQuestionData } from './registration-data';
import { RegistrationQuestionEditComponent } from '../registration-question-edit/registration-question-edit.component';
import { BasicData } from '../basic-info-edit/basicData';
import { OtherInfoEditComponent } from '../other-info-edit/other-info-edit.component';

@Component({
  selector: 'app-registration-question',
  templateUrl: './registration-question.component.html',
  styleUrls: ['./registration-question.component.css']
})
export class RegistrationQuestionComponent implements OnInit {

  constructor(public dialog: MatDialog,private getdataService:GetdataService) { }
  question:any[];
  reg_ques:RegQuestionData[];
  event_ques:RegQuestionData[];
  basic: BasicData;
  settings:any[];
  ngOnInit() {
    //this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.question_cast.subscribe(question => this.question = question);
    this.getdataService.reg_ques.subscribe(reg_ques => this.reg_ques = reg_ques);
    this.getdataService.event_ques.subscribe(event_ques =>this.event_ques = event_ques);
    this.getdataService.settings.subscribe(settings => this.settings = settings);
    console.log("response : =");
    console.log(this.reg_ques);
    //this.getdataService.getTicketLevelQuestion();
    this.getdataService.getEventLevelQuestion();
  }
  openDialog() {
    const dialogRef = this.dialog.open(RegistrationQuestionEditComponent, {
      disableClose: true,
      height: '450px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogOtherInfoEdit() {
    const dialogRef = this.dialog.open(OtherInfoEditComponent, {
      disableClose: true,
      height: '290px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
