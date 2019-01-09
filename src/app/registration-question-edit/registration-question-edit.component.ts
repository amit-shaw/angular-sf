import { Component, OnInit,Inject } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { FormControl, FormGroup } from '@angular/forms';
import { RegQuestionData } from '../registration-question/registration-data';
import {MatDialog,MatDialogRef,MAT_DIALOG_DATA,MatSnackBar} from '@angular/material';
import { SalesforceService } from '../../service/salesforce.service';


@Component({
  selector: 'app-registration-question-edit',
  templateUrl: './registration-question-edit.component.html',
  styleUrls: ['./registration-question-edit.component.css']
})
export class RegistrationQuestionEditComponent implements OnInit {

  constructor(private sfService: SalesforceService,public dialog: MatDialog,public snackBar: MatSnackBar,private getdataService:GetdataService,
    public dialogRef: MatDialogRef<RegistrationQuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  reg_ques:RegQuestionData[];
  event_ques:RegQuestionData[];
  registrationEdit:FormGroup;
  child_id:string;
  //test:string='1';
  ngOnInit() {
    this.getdataService.reg_ques.subscribe(reg_ques => this.reg_ques = reg_ques);
    this.getdataService.event_ques.subscribe(event_ques =>this.event_ques = event_ques);
    //console.log(this.reg_ques);
    this.registrationEdit = this.createFormGroup();
    
  }
  onSubmit(formData){
    //console.log(formData);
    //console.log(this.reg_ques);
   // console.log("-------------");
   // console.log(this.event_ques);
    this.dialogRef.close();
    //let d = [{'UserAnswer':this.reg_ques}];
   // console.log(JSON.stringify(d[0]));
    //console.log(formData.ge);
    this.sfService.updateRegistration('BLN_MM_ViewAdminProfileCon.saveTicketLevelSurveyQuestionAnswers',JSON.stringify(this.reg_ques),
    this.successTicketData, this.failedCallback);
    this.sfService.updateRegistration('BLN_MM_ViewAdminProfileCon.saveEventLevelSurveyQuestionAnswers',JSON.stringify(this.event_ques),
    this.successEventData, this.failedCallback);
    this.snackBar.open("Registration Questions updated successfully..",'', {
      duration: 2000,
    });
  }
  public getSFResourse = (path: string) => this.sfService.getSFResource;
  private failedCallback = (response) =>{ 
   // console.log("error came");  
    this.getdataService.getTicketLevelQuestion();
    this.getdataService.getEventLevelQuestion();
   // console.log(response);
  }
  successTicketData = (response) =>{
    
    let data = JSON.parse(response);
    console.log(data);
    let data1 = data.UserAnswer; 
    console.log(data1);
   // this.getdataService.reg_ques.next(data);
  //  console.log(JSON.parse(response));
  }
  successEventData = (response) =>{
    let data = JSON.parse(response);
    data = data['UserAnswer']; 
   // this.getdataService.event_ques.next(data);
   // console.log(JSON.parse(response));
  }
  onCancel(){
    this.dialogRef.close();
    this.getdataService.getTicketLevelQuestion();
    this.getdataService.getEventLevelQuestion();
  }
  createFormGroup() {
    return new FormGroup({       
      data: new FormControl(),
    });
  }
  onChange(type,index,id,status){
    console.log("Type : "+type+" |index : "+index+"  |Id : "+id+" | status : "+status);
    if(type=="event"){
      if(status == false){
        const ind:number = this.event_ques[index].SelectedAnswerCheck.indexOf('false');
      //  console.log(ind);
       // if(ind !== -1){
          this.event_ques[index].SelectedAnswerCheck.splice(ind,1);
       // }
     //   console.log(this.event_ques[index].SelectedAnswerCheck);
      }else{
        const ind:number = this.event_ques[index].SelectedAnswerCheck.indexOf('true');
        this.event_ques[index].SelectedAnswerCheck.splice(ind,1);
        this.event_ques[index].SelectedAnswerCheck.push(id);
       // console.log(this.event_ques[index].SelectedAnswerCheck);
      }
    }else{
      if(status == false){
        this.reg_ques[index].SelectedAnswerCheck.splice(this.reg_ques[index].SelectedAnswerCheck.indexOf(id),1);
      }else{
        const ind:number = this.reg_ques[index].SelectedAnswerCheck.indexOf('true');
        this.reg_ques[index].SelectedAnswerCheck.splice(ind,1);
        this.reg_ques[index].SelectedAnswerCheck.push(id);
        //this.reg_ques[index].SelectedAnswerCheck.push(id);
      }
    }
  }
  updateChild(id){
   /* let ele = document.getElementById(id);
    if(ele != null){
      this.child_id = id;
      ele.style.display = 'block';
    }else{
      //console.log("ele is null");
      let chk = (<HTMLInputElement>document.getElementById("chk-"+this.child_id)).checked;
     // console.log(chk);
      if(chk == true){
        document.getElementById(this.child_id).style.display = 'none';
      }
    }*/
  }
}
